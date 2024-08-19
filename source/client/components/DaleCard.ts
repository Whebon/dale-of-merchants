import { DaleIcons } from './DaleIcons';
import { Images } from './Images';
import { Animalfolk } from './types/Animalfolk';
import { CardType } from './types/CardType';
import { DbCard } from './types/DbCard';
import { DbEffect } from './types/DbEffect';

/**
 * A Dale of Merchants Card. All information of the card can be retrieved from this object.
 */
export class DaleCard {
    static cardTypes: CardType[]; //initialized during "setup(gamedatas: Gamedatas)"
    private static readonly cardIdtoTypeId: Map<number, number> = new Map<number, number>();
    private static readonly cardIdtoEffectiveTypeId: Map<number, number> = new Map<number, number>();
    private static readonly cardIdtoEffectiveTypeIdLocal: Map<number, number> = new Map<number, number>();
    private static readonly usedActiveAbilities: Set<number> = new Set<number>(); //encoded as <id>*MAX_TYPES + <type_id>
    static readonly tooltips: Map<number, dijit.Tooltip> = new Map<number, dijit.Tooltip>();
    static readonly divs: Map<number, HTMLElement> = new Map<number, HTMLElement>();
    static readonly MAX_TYPES: number = 1000;

    static readonly CT_CARDBACK: number = 0;
    static readonly CT_JUNK: number = 1;
    static readonly CT_JUNK2: number = 2;
    static readonly CT_JUNK3: number = 3;
    static readonly CT_JUNK4: number = 4;
    static readonly CT_JUNK5: number = 5;
    static readonly CT_SWIFTBROKER: number = 6;
    static readonly CT_COOKIES: number = 7;
    static readonly CT_SHATTEREDRELIC: number = 8;
    static readonly CT_SPYGLASS: number = 9;
    static readonly CT_FLASHYSHOW: number = 10;
    static readonly CT_FAVORITETOY: number = 11;
    static readonly CT_LOYALPARTNER: number = 12;
    static readonly CT_PREPAIDGOOD: number = 13;
    static readonly CT_ESSENTIALPURCHASE: number = 14;
    static readonly CT_MARKETDISCOVERY: number = 15;
    static readonly CT_SPECIALOFFER: number = 16;
    static readonly CT_STOCKCLEARANCE: number = 17;
    static readonly CT_WILYFELLOW: number = 18;
    static readonly CT_NUISANCE: number = 19;
    static readonly CT_ROTTENFOOD: number = 20;
    static readonly CT_DIRTYEXCHANGE: number = 21;
    static readonly CT_SABOTAGE: number = 22;
    static readonly CT_TREASUREHUNTER: number = 23;
    static readonly CT_STASHINGVENDOR: number = 24;
    static readonly CT_EMPTYCHEST: number = 25;
    static readonly CT_NOSTALGICITEM: number = 26;
    static readonly CT_ACORN: number = 27;
    static readonly CT_ACCORDION: number = 28;
    static readonly CT_WINTERISCOMING: number = 29;
    static readonly CT_BOLDHAGGLER: number = 30;
    static readonly CT_NEWSEASON: number = 31;
    static readonly CT_WHIRLIGIG: number = 32;
    static readonly CT_CHARM: number = 33;
    static readonly CT_GAMBLE: number = 34;
    static readonly CT_BLINDFOLD: number = 35;
    static readonly CT_FLEXIBLESHOPKEEPER: number = 36;
    static readonly CT_REFLECTION: number = 37;
    static readonly CT_GOODOLDTIMES: number = 38;
    static readonly CT_GIFTVOUCHER: number = 39;
    static readonly CT_TRENDSETTING: number = 40;
    static readonly CT_SEEINGDOUBLES: number = 41;

    public id: number

    /** 
     * Construct a dale card of a given card id. If this is the first time this card id is constructed, the type_id MUST be provided.
     * @param id unique database id for this card instance.
     * @param type_id id that uniquely defines this card's appearance.
     * */
    public constructor(id: number | string, type_id?: number | string) {
        id = +id;
        this.id = id;
        if (type_id != undefined) {
            let prev_type_id = DaleCard.cardIdtoTypeId.get(id);
            if (prev_type_id == undefined) {
                DaleCard.cardIdtoTypeId.set(id, +type_id);
            }
            else if (prev_type_id != type_id) {
                throw new Error(`Card id ${id} with type_id ${prev_type_id} cannot be set to a different type_id ${type_id}.`)
            }
        }
        else if (!DaleCard.cardIdtoTypeId.has(id)) {
            console.log("cardId2TypeId");
            console.log(DaleCard.cardIdtoTypeId);
            throw new Error(`The type_id of card_id ${id} is unknown. Therefore, a card with id ${id} cannot be instantiated.`)
        }
    }

    /** 
     * Statically initialize the card types.
     * */
    public static init(cardTypes: {[type_id: number]: CardType}) {
        if (DaleCard.cardTypes) {
            throw new Error("Card types are only be initialized once")
        }
        DaleCard.cardTypes = Object.values(cardTypes);
        // for (let i = 0; i < DaleCard.cardTypes.length; i++) {
        //     const card = cards[i];
        //     // Process the card object
        //     console.log(card);
        // }
    }

    /**
     * Parse effect information from the db
     * @param effect 
     */
    public static addEffect(effect: DbEffect) {
        //an active passive effect has been used
        if (DaleCard.hasActiveAbility(+effect.type_id)) {
            if (+effect.type_id != DaleCard.CT_GOODOLDTIMES || +effect.target != DaleCard.CT_GOODOLDTIMES) {
                const encoding = (+effect.card_id)*DaleCard.MAX_TYPES+(+effect.type_id)
                DaleCard.usedActiveAbilities.add(encoding);
            }
        }

        switch(+effect.type_id) {
            case DaleCard.CT_FLEXIBLESHOPKEEPER:
            case DaleCard.CT_REFLECTION:
            case DaleCard.CT_GOODOLDTIMES:
            case DaleCard.CT_TRENDSETTING:
            case DaleCard.CT_SEEINGDOUBLES:
                //a new chameleon bindings is added
                if (+effect.target != -1) {
                    console.log(`Bind Chameleon: ${+effect.card_id} -> ${+effect.target}`);
                    DaleCard.bindChameleonFromServer(+effect.card_id, +effect.target);
                }
                break;
            default:
                break;
        }
    }

    /**
     * Should be called when a turn ends. Removes all effects that last until end of turn.
     */
    public static removeEndOfTurnEffects() {
        console.log("removeEndOfTurnEffects");
        DaleCard.usedActiveAbilities.clear();
        DaleCard.unbindAllChameleons();
    }

    /** 
     * Uniquely defines the original appearance of a card (not to be confused with tehcnique/passive typing). 
     * Cards with the same type_id are indistinguishable up to their ids.
     * */
    public get original_type_id(): number {
        let _type_id = DaleCard.cardIdtoTypeId.get(this.id);
        if (_type_id == undefined) {
            console.warn(`id ${this.id} does not have a corresponding type_id`)
            return 0
        }
        return _type_id
    }

    /** 
     * Returns the effective type_id of this card (after applying chameleon targets)
     * */
    public get effective_type_id(): number {
        //local type id is more important than the commited type id. Example:
        //flexible shopkeeper -> good old times passive (committed binding)
        //flexible shopkeeper -> gift voucher (local binding)
        let _type_id = DaleCard.cardIdtoEffectiveTypeIdLocal.get(this.id);
        if (_type_id == undefined) {
            _type_id = DaleCard.cardIdtoEffectiveTypeId.get(this.id)
        }
        if (_type_id == undefined) {
            return this.original_type_id;
        }
        return _type_id
    }

    /**
     * @returns true if this is a chameleon card
     */
    public isChameleon(): boolean {
        const type_id = this.effective_type_id;
        return (
            type_id == DaleCard.CT_FLEXIBLESHOPKEEPER ||
            type_id == DaleCard.CT_REFLECTION ||
            type_id == DaleCard.CT_GOODOLDTIMES ||
            type_id == DaleCard.CT_TRENDSETTING ||
            type_id == DaleCard.CT_SEEINGDOUBLES
        );
    }

    /**
     * @returns true if this is a card that has already copied a card earlier this turn
     */
    public isBoundChameleon(): boolean {
        return DaleCard.cardIdtoEffectiveTypeIdLocal.has(this.id) || DaleCard.cardIdtoEffectiveTypeId.has(this.id);
    }

    /**
     * @returns true if this is an unbound chameleon card
     */
    public isUnboundChameleon(): boolean {
        return !this.isBoundChameleon() && this.isChameleon();
    }

    /**
     * Bind an effective type to this card. The bind still needs to be commited to the server later.
     * @param effective_type_id new type id this card should be bound to
     */
    public bindChameleonLocal(effective_type_id: number) {
        console.log("BIND!");
        DaleCard.cardIdtoEffectiveTypeIdLocal.set(this.id, effective_type_id);
    }

    
    /**
     * Unbinds the locally stored chameleon bindings for this card.
     */
    public unbindChameleonLocal() {
        DaleCard.cardIdtoEffectiveTypeIdLocal.delete(this.id);
    }

    /**
     * Unbinds all locally stored chameleon bindings.
     * @return `size` - number of bindings deleted this way
     */
    public static unbindAllChameleonsLocal(): number {
        const size = DaleCard.cardIdtoEffectiveTypeIdLocal.size;
        DaleCard.cardIdtoEffectiveTypeIdLocal.clear();
        return size;
    }

    /**
     * Binds `card_id` -> `effective_type_id`. Overwrites existing local bindings
     * @param card_id card id to bind
     * @param effective_type_id type id the card should assume
     */
    public static bindChameleonFromServer(card_id: number, effective_type_id: number) {
        DaleCard.cardIdtoEffectiveTypeId.set(card_id, effective_type_id);
    }

    /**
     * Unbinds a commited `card_id` -> `effective_type_id`
     * @param card_id card id to unbind
     */
    public static unbindChameleonFromServer(card_id: number) {
        DaleCard.cardIdtoEffectiveTypeId.delete(card_id);
    }

    /**
     * Returns the locally stored chameleon mapping in a format that can be send to the server.
     * @return ordered arrays that represents the local mapping: `card_ids` -> `type_ids`
     * @example example {card_ids: "1;3;4;8", type_ids: "28;9;15;17"}
     */
    public static getLocalChameleons(): {chameleon_card_ids: string, chameleon_type_ids: string} {
        const card_ids = [] as number[];
        const type_ids = [] as number[];
        DaleCard.cardIdtoEffectiveTypeIdLocal.forEach((type_id: number, card_id: number) => {
            card_ids.push(card_id);
            type_ids.push(type_id);
        });
        return {
            chameleon_card_ids: card_ids.join(";"),
            chameleon_type_ids: type_ids.join(";")
        };
    }

    /**
     * Unbinds all chameleon cards.
     */
    public static unbindAllChameleons() {
        DaleCard.cardIdtoEffectiveTypeId.clear();
        DaleCard.cardIdtoEffectiveTypeIdLocal.clear();
    }

    /**
     * Returns a badge that can be attached to a card div to indicate it is a chameleon card
     */
    public static createChameleonIcon() {
        const div = DaleIcons.getChameleonIcon();
        div.classList.add("dale-chameleon-icon");
        return div;
    }

    /**
     * cost of this card when purchased from the market
     * @param pos
     */
    public getCost(pos: number) {
        return this.value + pos;
    }

    public get value(): number {
        return DaleCard.cardTypes[this.effective_type_id]!.value
    }

    public get animalfolk(): Animalfolk {
        return DaleCard.cardTypes[this.effective_type_id]!.animalfolk
    }

    public get name(): string {
        return DaleCard.cardTypes[this.effective_type_id]!.name
    }

    public get div(): HTMLElement {
        const div = DaleCard.divs.get(this.id);
        if (!div) {
            throw new Error(`No div exists for card_id=${this.id}`)
        }
        return div;
    }

    public isJunk(): boolean {
        return (this.effective_type_id >= 1 && this.effective_type_id <= 5);
    }

    public isTechnique(): boolean {
        return DaleCard.cardTypes[this.effective_type_id]!.is_technique
    }

    public isPlayable(): boolean {
        return DaleCard.cardTypes[this.effective_type_id]!.playable
    }

    public static isPlayable(type_id: number): boolean {
        return DaleCard.cardTypes[type_id]!.playable
    }
    
    /**
     * @returns `true` if this card has an unused active ability
     */
    public hasActiveAbility(): boolean {
        const type_id = this.effective_type_id;
        if (!DaleCard.hasActiveAbility(type_id)) {
            return false;
        }
        const encoding = this.id * DaleCard.MAX_TYPES + type_id;
        return !DaleCard.usedActiveAbilities.has(encoding);
    }

    /**
     * @returns `true` if this card type can have an active ability
     */
    public static hasActiveAbility(type_id: number): boolean {
        return DaleCard.cardTypes[type_id]!.has_active
    }

    private getTooltipContent(): string {
        const cardType = DaleCard.cardTypes[this.effective_type_id]!;
        const animalfolkWithBull = cardType.animalfolk_displayed ? " • "+cardType.animalfolk_displayed : ""
        const chameleonName = this.isBoundChameleon() ? `<span class=chameleon-name>${DaleCard.cardTypes[this.original_type_id]!.name}</span> ` : ""
        return `<div class="card-tooltip">
            <h3>${chameleonName}${cardType.name}</h3>
            <hr>
            ${cardType.value}${animalfolkWithBull} • ${cardType.type_displayed} ${cardType.has_plus ? "(+)" :""}
            <br><br>
            <div class="text">${cardType.text}</div>
            <br style="line-height: 10px" />
        </div>`
	}

    /**
     * Destroy the tooltip for this card (where-ever it is attached to)
     */
    public destroyTooltip() {
        DaleCard.tooltips.get(this.id)?.destroy();
    }

    /**
     * Add a tooltip to the specified tooltip_parent_id. WARNING: each DaleCard card_id can have at most 1 tooltip.
     * @param tooltip_parent_id parent id to attach the tooltip to.
     */
    public addTooltip(tooltip_parent_id: string | HTMLElement) {
        if (this.id == 0) return; //card back doesn't have a tooltip
        const parent = $(tooltip_parent_id)
        if (!parent) {
            throw new Error(`DomElement with id '${tooltip_parent_id}' does not exist. Cannot add a tooltip to non-existing parent.`)
        }
        const tooltip = new dijit.Tooltip({
            connectId: [tooltip_parent_id],
            label: this.getTooltipContent(),
            showDelay: 400,
        });
        dojo.connect(parent, "mouseleave", () => {
            tooltip.close();
        });
        this.destroyTooltip();
        DaleCard.tooltips.set(this.id, tooltip);
    }

    /**
     * @returns a new div element representing this card. Overwrites the previous known div for this card.
     * @param parent_id (optional) - if specified, the div will be added to the parent, and it will have a tooltip
     */
    public toDiv(parent_id?: string | HTMLElement): HTMLElement {
        const div = document.createElement("div")
        div.id = "dale-card-"+this.id
        div.classList.add("dale-card")
        div.setAttribute('style', Images.getCardStyle(this.effective_type_id))
        if (parent_id) {
            $(parent_id)?.appendChild(div)
            this.addTooltip(div.id);
            //this.addTooltip(tooltip_parent_id); //don't add the tooltip to the container, but to the card div itself
        }
        if (this.isBoundChameleon()) {
            div.appendChild(DaleCard.createChameleonIcon());
        }
        DaleCard.divs.set(this.id, div);
        return div;
    }

    /**
     * converts a DbCard (from the database table) to a DaleCard (typescript representation of a card)
     * @returns DaleCard
     */
    public static of(card: DbCard) {
        return new DaleCard(card.id, card.type_arg)
    }

    /**
     * @return `true` iff at least 1 of the card_ids is of type type_id
     */
    public static containsTypeId(card_ids: number[], type_id: number) {
        for (let card_id of card_ids) {
            if ((new DaleCard(card_id)).effective_type_id == type_id) {
                return true;
            }
        }
        return false;
    }

    //TODO: safely delete this
    // /**
    //  * @param card_id
    //  * @param type_id
    //  * @return `true` if a card with id `card_id` is of type `type_id`
    //  */
    // public static hasType(card_id: number, type_id: number){
    //     return DaleCard.cardIdtoTypeId.get(card_id) == type_id;
    // }
}
