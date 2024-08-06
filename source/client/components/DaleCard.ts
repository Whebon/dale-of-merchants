import { Images } from './Images';
import { Animalfolk } from './types/Animalfolk';
import { CardType } from './types/CardType';
import { DbCard } from './types/DbCard';

/**
 * A Dale of Merchants Card. All information of the card can be retrieved from this object.
 */
export class DaleCard {
    static cardTypes: CardType[]; //initialized during "setup(gamedatas: Gamedatas)"
    private static readonly cardIdtoTypeId: Map<number, number> = new Map<number, number>();
    private static readonly cardIdtoEffectiveTypeId: Map<number, number> = new Map<number, number>();
    private static readonly cardIdtoEffectiveTypeIdLocal: Map<number, number> = new Map<number, number>();
    static readonly tooltips: Map<number, dijit.Tooltip> = new Map<number, dijit.Tooltip>();

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
    static readonly CT_PREPAIDFOOD: number = 13;
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
        let _type_id = DaleCard.cardIdtoEffectiveTypeId.get(this.id);
        if (_type_id == undefined) {
            _type_id = DaleCard.cardIdtoEffectiveTypeIdLocal.get(this.id)
        }
        if (_type_id == undefined) {
            return this.original_type_id;
        }
        return _type_id
    }

    /**
     * Bind an effective type to this card. The bind still needs to be commited to the server later.
     * @param effective_type_id new type id this card should be bound to
     */
    public bindChameleonLocal(effective_type_id: number) {
        DaleCard.cardIdtoEffectiveTypeIdLocal.set(this.id, effective_type_id);
        console.log(DaleCard.cardIdtoEffectiveTypeIdLocal);
    }

    /**
     * Bind an effective type to a card id. Maps `card_id` -> `effective_type_id`.
     * @param card_id card id to bind
     * @param effective_type_id type id the card should assume
     */
    public static bindChameleonFromServer(card_id: number, effective_type_id: number) {
        DaleCard.cardIdtoEffectiveTypeId.set(card_id, effective_type_id);
    }

    /**
     * Unbinds all locally stored chameleon bindings.
     */
    public static unbindAllChameleonsLocal() {
        DaleCard.cardIdtoEffectiveTypeIdLocal.clear();
    }

    /**
     * Returns the locally stored chameleon mapping in a format that can be send to the server. Then, unbinds the local changes.
     * @return ordered arrays that represents the local mapping: `card_ids` -> `type_ids`
     * @example example {card_ids: "1;3;4;8", type_ids: "28;9;15;17"}
     */
    public static commitLocalChameleons(): {chameleon_card_ids: string, chameleon_type_ids: string} {
        const card_ids = [] as number[];
        const type_ids = [] as number[];
        DaleCard.cardIdtoEffectiveTypeIdLocal.forEach((type_id: number, card_id: number) => {
            card_ids.push(card_id);
            type_ids.push(type_id);
        });
        DaleCard.cardIdtoEffectiveTypeIdLocal.clear();
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

    public get value(): number {
        return DaleCard.cardTypes[this.effective_type_id]!.value
    }

    public get animalfolk(): Animalfolk {
        return DaleCard.cardTypes[this.effective_type_id]!.animalfolk
    }

    public isJunk(): boolean {
        return (this.effective_type_id >= 1 && this.effective_type_id <= 5);
    }

    public isPlayable(): boolean {
        return DaleCard.cardTypes[this.effective_type_id]!.playable
    }

    private getTooltipContent(): string {
        const cardType = DaleCard.cardTypes[this.effective_type_id]!;
        const animalfolkWithBull = cardType.animalfolk_displayed ? " • "+cardType.animalfolk_displayed : ""
        return `<div class="card-tooltip">
            <h3>${cardType.name}</h3>
            <hr>
            ${cardType.value}${animalfolkWithBull} • ${cardType.type_displayed} ${cardType.has_plus ? "(+)" :""}
            <br><br>
            <div class="text">${cardType.text}</div>
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
    public addTooltip(tooltip_parent_id: string) {
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
     * @returns a new div element representing this card
     * @param tooltip_parent_id (optional) - if specified, the div will be added to the parent, and it will have a tooltip
     */
    public toDiv(tooltip_parent_id?: string): HTMLElement {
        let div = document.createElement("div")
        div.id = "dale-card-"+this.id
        div.classList.add("card")
        div.setAttribute('style', Images.getCardStyle(this.effective_type_id))
        if (tooltip_parent_id) {
            $(tooltip_parent_id)?.appendChild(div)
            this.addTooltip(div.id);
            //this.addTooltip(tooltip_parent_id); //don't add the tooltip to the container, but to the card div itself
        }
        return div;
    }

    /**
     * converts a DbCard (from the database table) to a DaleCard (typescript representation of a card)
     * @returns DaleCard
     */
    public static of(card: DbCard) {
        return new DaleCard(card.id, card.type_arg)
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
