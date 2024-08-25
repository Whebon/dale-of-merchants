import { DaleIcons } from './DaleIcons';
import { Images } from './Images';
import { Animalfolk } from './types/Animalfolk';
import { CardType } from './types/CardType';
import { DbCard } from './types/DbCard';
import { DbEffect } from './types/DbEffect';
import { ChameleonChain } from './types/ChameleonChain'

/**
 * A Dale of Merchants Card. All information of the card can be retrieved from this object.
 */
export class DaleCard {
    static cardTypes: CardType[]; //initialized during "setup(gamedatas: Gamedatas)"
    private static readonly cardIdtoTypeId: Map<number, number> = new Map<number, number>();

    private static readonly cardIdToChameleonChain: Map<number, ChameleonChain> = new Map<number, ChameleonChain>();
    private static readonly cardIdToChameleonChainLocal: Map<number, ChameleonChain> = new Map<number, ChameleonChain>();

    //TODO: safely delete this
    // private static readonly cardIdtoEffectiveTypeId: Map<number, number> = new Map<number, number>();
    // private static readonly cardIdtoEffectiveTypeIdLocal: Map<number, number> = new Map<number, number>();

    static readonly tooltips: Map<number, dijit.Tooltip> = new Map<number, dijit.Tooltip>();
    static readonly divs: Map<number, HTMLElement> = new Map<number, HTMLElement>();

    private static readonly effects: DbEffect[] = [];

    static readonly EC_GLOBAL: number = 0;
    static readonly EC_MODIFICATION: number = 1;

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

    ///////////////////////////////////////
    ///////////     Effects     ///////////
    ///////////////////////////////////////

    /**
     * Add a new effect
     * @param effect 
     * @param local (optional) default false. If true, mark the effect as local.
     */
    public static addEffect(effect: DbEffect) {
        DaleCard.effects.push(effect);
        
        //TODO: safely delete this
        //an active passive effect has been used
        // if (DaleCard.hasActiveAbility(+effect.type_id)) {
        //     if (+effect.type_id != DaleCard.CT_GOODOLDTIMES || +effect.chameleon_target_id != DaleCard.CT_GOODOLDTIMES) {
        //         const encoding = (+effect.card_id)*DaleCard.MAX_TYPES+(+effect.type_id)
        //         DaleCard.usedActiveAbilities.add(encoding);
        //     }
        // }

        //a chameleon effect was added
        if (effect.chameleon_target_id != null) {
            const target_card_id = effect.chameleon_target_id!;
            const target_type_id = effect.arg!;
            let chain = DaleCard.cardIdToChameleonChain.get(effect.card_id);
            if (chain) {
                chain.push(target_card_id, target_type_id);
            }
            else {
                chain = new ChameleonChain(target_card_id, target_type_id);
                DaleCard.cardIdToChameleonChain.set(effect.card_id, chain);
                DaleCard.cardIdToChameleonChainLocal.delete(effect.card_id);
            }
            console.log(`Commited Chameleon Chain for card_id=${effect.card_id}`);
            console.log(chain);
        }

        //update card affected divs
        if (effect.effect_class == DaleCard.EC_GLOBAL) {
            for (let card_id in DaleCard.divs.keys()) {
                new DaleCard(card_id).updateHTML();
            }
        }
        else {
            new DaleCard(effect.card_id).updateHTML();
        }
    }

    /**
     * Expire (non-local) effects from the db
     * @param effect 
     */
    public static expireEffects(effects: DbEffect[]) {
        let affected_card_ids: Set<number> | number[] = new Set<number>();
        for (let effect of effects) {
            const index = DaleCard.effects.findIndex(e => e.effect_id == effect.effect_id);
            if (index == -1) {
                console.log(effect);
                throw new Error("Attempted to remove a non-existing effect");
            }
            DaleCard.effects.splice(index, 1);
            if (effect.effect_class == DaleCard.EC_GLOBAL) {
                affected_card_ids = Array.from(DaleCard.divs.keys());
                break;
            }
            affected_card_ids.add(DaleCard.effects[index]!.card_id);
        }
        affected_card_ids.forEach(card_id => {
            new DaleCard(card_id).updateHTML();
        });
    }


    //TODO: safely delete this
    // **
    //  * Expire all local effects
    //  */
    // public static expireAllLocalEffects() {
    //     this.localEffects.length = 0;
    //     for (let card_id in DaleCard.divs.keys()) {
    //         new DaleCard(card_id).updateHTML();
    //     }
    // }
    // /**
    //  * @return first non-null effect arg with the given type type_id. If none was found, return null.
    //  */
    // private getArg(type_id: number) {
    //     for (const effects of [DaleCard.effects, DaleCard.localEffects]) {
    //         for (let effect of effects) {
    //             if (effect.card_id == this.id && effect.type_id == type_id && effect.arg != null) {
    //                 return effect.arg;
    //             }
    //         }
    //     }
    //     return null;
    // }

    /**
     * Returns true if this cards passive is already used
     */
    public isPassiveUsed() {
        console.log("isPassiveUsed");
        if (!DaleCard.cardTypes[this.effective_type_id]!.has_active) {
            //N/A, this card doesn't have a usable passive, therefore it is considered "used"
            return true;
        }
        const type_id = this.effective_type_id;
        for (let effect of DaleCard.effects) {
            if (effect.card_id == this.id && effect.type_id == type_id) {
                return true;
            }
        }
        return false;
    }

    /** 
     * Returns the effective type_id of this card (after applying chameleon targets)
     * */
    public get effective_type_id(): number {
        return DaleCard.cardIdToChameleonChain.get(this.id)?.type_id ?? 
            DaleCard.cardIdToChameleonChainLocal.get(this.id)?.type_id ?? 
            this.original_type_id;
    }

    /** 
     * Returns the effective value of this card (after applying effects)
     * */
    public get effective_value(): number {
        let value = this.original_value;
        for (let effect of DaleCard.effects) {
            if (effect.card_id == this.id || effect.effect_class == DaleCard.EC_GLOBAL) {
                switch(effect.card_id) {
                    case DaleCard.CT_FLASHYSHOW:
                        value += 1;
                }
            }
        }
        return value;
    }

    //TODO: safely remove this
    // /**
    //  * Should be called when a turn ends. Removes all effects that last until end of turn.
    //  */
    // public static removeEndOfTurnEffects() {
    //     console.log("removeEndOfTurnEffects");
    //     DaleCard.usedActiveAbilities.clear();
    //     DaleCard.unbindAllChameleons();
    // }

    ///////////////////////////////////////////////////////
    //////////        Chameleon functions        //////////
    ///////////////////////////////////////////////////////

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
        return DaleCard.cardIdToChameleonChain.has(this.id) || DaleCard.cardIdToChameleonChainLocal.has(this.id);
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
    public bindChameleonLocal(card: DaleCard) {
        DaleCard.cardIdToChameleonChainLocal.set(this.id, new ChameleonChain(card.id, card.effective_type_id));
        this.updateHTML();
    }

    
    /**
     * Unbinds the locally stored chameleon bindings for this card.
     */
    public unbindChameleonLocal() {
        DaleCard.cardIdToChameleonChainLocal.delete(this.id);
        this.updateHTML();
    }

    /**
     * Unbinds all locally stored chameleon bindings.
     * @return `size` - number of bindings deleted this way
     */
    public static unbindAllChameleonsLocal(): number {
        const card_ids = Array.from(DaleCard.cardIdToChameleonChainLocal.keys())
        DaleCard.cardIdToChameleonChainLocal.clear();
        for (let card_id of card_ids) {
            new DaleCard(card_id).updateHTML();
        }
        return card_ids.length;
    }

    //TODO: safely delete this
    // /**
    //  * Binds `card_id` -> `effective_type_id`. Overwrites existing local bindings
    //  * @param card_id card id to bind
    //  * @param effective_type_id type id the card should assume
    //  */
    // public static bindChameleonFromServer(card_id: number, effective_type_id: number) {
    //     DaleCard.cardIdtoEffectiveTypeId.set(card_id, effective_type_id);
    //     new DaleCard(card_id).updateChameleonOverlay(); //undefined, false
    // }

    //TODO: safely delete this
    // /**
    //  * Unbinds a commited `card_id` -> `effective_type_id`
    //  * @param card_id card id to unbind
    //  */
    // public static unbindChameleonFromServer(card_id: number) {
    //     DaleCard.cardIdtoEffectiveTypeId.delete(card_id);
    //     new DaleCard(card_id).updateChameleonOverlay(); //undefined, false
    // }
    // /**
    //  * Returns the locally stored chameleon mapping in a format that can be send to the server.
    //  * @return ordered arrays that represents the local mapping: `card_ids` -> `type_ids`
    //  * @example example {card_ids: "1;3;4;8", type_ids: "28;9;15;17"}
    //  */
    // public static getLocalChameleons(): {chameleon_card_ids: string, chameleon_type_ids: string} {
    //     const card_ids = [] as number[];
    //     const type_ids = [] as number[];
    //     DaleCard.cardIdtoEffectiveTypeIdLocal.forEach((type_id: number, card_id: number) => {
    //         card_ids.push(card_id);
    //         type_ids.push(type_id);
    //     });
    //     return {
    //         chameleon_card_ids: card_ids.join(";"),
    //         chameleon_type_ids: type_ids.join(";")
    //     };
    // }

    /**
     * Returns the locally stored chameleon mapping in a format that can be send to the server.
     * @return ordered arrays that represents the local mapping: `card_ids` -> `chameleon_target_ids`
     * @example example {card_ids: "1;3;4;8", type_ids: "28;9;15;17"}
     */
    public static getLocalChameleonsJSON(): string {
        console.log(this.cardIdToChameleonChain);
        console.log(this.cardIdToChameleonChainLocal);
        const array = Array.from(this.cardIdToChameleonChainLocal.entries()).map(([card_id, target]) => ({
            card_id: card_id,
            chameleon_target_ids: target.card_ids,
            target_type_ids: target.type_ids
        }));
        return JSON.stringify(array);
    }

    /**
     * Unbinds all chameleon cards.
     */
    public static unbindAllChameleons() {
        this.unbindAllChameleonsLocal();
        const card_ids = Array.from(DaleCard.cardIdToChameleonChain.keys())
        DaleCard.cardIdToChameleonChain.clear();
        for (let card_id of card_ids) {
            new DaleCard(card_id).updateHTML();
        }
    }

    //TODO: safely delete this
    // /**
    //  * Returns a badge that can be attached to a card div to indicate it is a chameleon card
    //  */
    // private static createChameleonIcon() {
    //     const div = DaleIcons.getChameleonIcon();
    //     div.classList.add("dale-chameleon-icon");
    //     return div;
    // }

    ///////////////////////////////////////////////////////////
    //////////        Public Card Information        //////////
    ///////////////////////////////////////////////////////////

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
     * Returns the original value of this card (after applying effects)
     * */
    public get original_value(): number {
        return DaleCard.cardTypes[this.effective_type_id]!.value
    }

    /**
     * cost of this card when purchased from the market
     * @param pos
     */
    public getCost(pos: number) {
        return this.effective_value + pos;
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
        return (this.original_type_id >= 1 && this.original_type_id <= 5);
    }

    public isEffectiveJunk(): boolean {
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
    
    //TODO: safely delete this
    // /**
    //  * @returns `true` if this card has an unused active ability
    //  */
    // public hasActiveAbility(): boolean {
    //     const type_id = this.effective_type_id;
    //     if (!DaleCard.hasActiveAbility(type_id)) {
    //         return false;
    //     }
    //     const encoding = this.id * DaleCard.MAX_TYPES + type_id;
    //     return !DaleCard.usedActiveAbilities.has(encoding);
    // }

    //TODO: safely delete this
    // /**
    //  * @returns `true` if this card type can have an active ability
    //  */
    // public static hasActiveAbility(type_id: number): boolean {
    //     return DaleCard.cardTypes[type_id]!.has_active
    // }

    /////////////////////////////////////////////////////////
    //////////        Div related functions        //////////
    /////////////////////////////////////////////////////////

    private getTooltipContent(): string {
        const cardType = DaleCard.cardTypes[this.effective_type_id]!;
        const animalfolkWithBull = cardType.animalfolk_displayed ? " • "+cardType.animalfolk_displayed : ""
        const chameleonName = this.isBoundChameleon() ? `<span class=chameleon-name>${DaleCard.cardTypes[this.original_type_id]!.name}</span> ` : ""
        return `<div class="dale-card-tooltip">
            <h3>${chameleonName}${cardType.name}</h3>
            <hr>
            ${cardType.value}${animalfolkWithBull} • ${cardType.type_displayed} ${cardType.has_plus ? "(+)" :""}
            <br><br>
            <div class="text">${cardType.text}</div>
            <br style="line-height: 10px" />
        </div>`
	}

    /**
     * Remove the tooltip for this card (where-ever it is attached to)
     */
    private removeTooltip() {
        DaleCard.tooltips.get(this.id)?.destroy();
    }

    /**
     * Add a tooltip to the specified tooltip_parent_id. WARNING: each DaleCard card_id can have at most 1 tooltip.
     * @param tooltip_parent_id parent id to attach the tooltip to.
     */
    private addTooltip(tooltip_parent_id: string | HTMLElement) {
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
        this.removeTooltip();
        DaleCard.tooltips.set(this.id, tooltip);
    }

    /**
     * Updates the chameleon card overlay according to latest card information.
     * @param temp_div (optional) should be a div representing this cards original type
     * @param fade (optional) default true. whether or not to animate the transition with a fade.
     */
    private updateChameleonOverlay(temp_div?: HTMLElement, fade: boolean = true) {
        //TODO: remove this, rework the overlay
        console.log("updateChameleonOverlay for card_id="+this.id);
        const div = temp_div ?? DaleCard.divs.get(this.id);
        if (!div) {
            return;
        }
        const old_overlay = div.querySelector(".dale-chameleon-overlay:not(.dale-fading)");
		if (old_overlay) {
            // if ((old_overlay as HTMLElement).dataset['typeid'] == String(this.effective_type_id)) {
            //     return;
            // }
            if (fade) {
                old_overlay.classList.add("dale-fading");
                dojo.fadeOut({node: old_overlay as HTMLElement, onEnd: function (node: HTMLElement){dojo.destroy(node);}}).play();
            }
            else {
                div.remove();
            }
		}
        if (this.isBoundChameleon()) {
            const chameleon_icon = DaleIcons.getChameleonIcon();
            chameleon_icon.classList.add("dale-chameleon-icon");
            const new_overlay = document.createElement("div");
            new_overlay.classList.add("dale-card");
            new_overlay.classList.add("dale-chameleon-overlay");
            new_overlay.setAttribute('style', Images.getCardStyle(this.effective_type_id));
            new_overlay.appendChild(chameleon_icon);
            //new_overlay.dataset['typeid'] = String(this.effective_type_id);
            div.appendChild(new_overlay);
            if (fade) {
                dojo.setStyle(new_overlay, 'opacity', '0');
                dojo.fadeIn({node: new_overlay}).play();
            }
            if (!temp_div) {
                this.addTooltip(div);
            }
        }
    }

    /**
	 * Update all of this card's modifications according to latest card information. Without any animations.
     * This function should be private. When card information updates, this should immediately be called.
     * @param temp_div (optional) should be a div representing this card's original type
	 */
	private updateHTML(temp_div?: HTMLElement) {
        const div = temp_div ?? DaleCard.divs.get(this.id);
        this.updateChameleonOverlay(div, false);
        if (!temp_div && div) {
            this.addTooltip(div);
        }
	}

    /**
     * @returns a new div element representing this card.
     * @param parent_id (optional) - if specified, the div will be immediately be "detached" to the parent
     */
    public toDiv(parent_id?: string | HTMLElement): HTMLElement {
        const div = document.createElement("div")
        div.classList.add("dale-card");
        div.id = "dale-card-"+this.id
        Images.setCardStyle(div, this.original_type_id)
        if (parent_id) {
            $(parent_id)?.appendChild(div);
            this.attachDiv(div);
        }
        else {
            this.updateHTML(div);
        }
        return div;
    }

    /**
     * Remove the known div association of this card. Should be called of the div no longer exists.
     */
    public detachDiv() {
        this.removeTooltip();
        DaleCard.divs.delete(this.id);
    }

    /**
     * Uniquely associate this card with the specified div
     */
    public attachDiv(div: HTMLElement) {
        div.classList.add("dale-card");
        Images.setCardStyle(div, this.original_type_id); //div.setAttribute('style', Images.getCardStyle(this.original_type_id))
        DaleCard.divs.set(this.id, div);
        this.updateHTML();
    }

    /////////////////////////////////////////////////////////
    //////////        Static util functions        //////////
    /////////////////////////////////////////////////////////

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
}
