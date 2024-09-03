import Gamegui = require('ebg/core/gamegui');
import { DaleIcons } from './DaleIcons';
import { Images } from './Images';
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

    static page: Gamegui | undefined;
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
    public static init(page: Gamegui, cardTypes: {[type_id: number]: CardType}) {
        if (DaleCard.cardTypes) {
            throw new Error("Card types are only be initialized once")
        }
        DaleCard.cardTypes = Object.values(cardTypes);
        DaleCard.page = page;
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
        console.log("addEffect");
        console.log(effect);
        DaleCard.effects.push(effect);

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
                if (DaleCard.cardIdToChameleonChainLocal.delete(effect.card_id)) {
                    //a chain was commited, no need to update the html
                    return;
                }
            }
        }

        //update card affected divs
        if (effect.effect_class == DaleCard.EC_GLOBAL) {
            for (let card_id of Array.from(DaleCard.divs.keys())) {
                DaleCard.updateHTML(card_id);
            }
        }
        else {
            DaleCard.updateHTML(effect.card_id);
        }
    }

    /**
     * Expire (non-local) effects from the db
     * @param effect 
     */
    public static expireEffects(effects: DbEffect[]) {
        let includes_global_effect = false;
        let affected_card_ids: Set<number> | number[] = new Set<number>();
        for (let effect of effects) {
            const index = DaleCard.effects.findIndex(e => e.effect_id == effect.effect_id);
            if (index == -1) {
                console.log("Known effects:");
                console.log(DaleCard.effects);
                console.log("Expired effect:");
                console.log(effect);
                throw new Error("Attempted to remove a non-existing effect");
            }
            if (effect.effect_class == DaleCard.EC_GLOBAL) {
                includes_global_effect = true;
            }
            affected_card_ids.add(DaleCard.effects[index]!.card_id);
            DaleCard.effects.splice(index, 1);
            
            //a chameleon effect was expired
            if (effect.chameleon_target_id != null) {
                const chain = DaleCard.cardIdToChameleonChain.get(effect.card_id);
                if (chain) {
                    chain.expireTargetId(effect.chameleon_target_id);
                    if (chain.length == 0) {
                        DaleCard.cardIdToChameleonChain.delete(effect.card_id);
                    }
                }
            }
        }
        
        affected_card_ids = includes_global_effect ? Array.from(DaleCard.divs.keys()) : affected_card_ids;
        affected_card_ids.forEach(card_id => {
            DaleCard.updateHTML(card_id);
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
        const type_id = this.effective_type_id;
        if (!DaleCard.cardTypes[type_id]!.has_ability) {
            //N/A, this card doesn't have a usable passive, therefore it is considered "used"
            return true;
        }
        for (let effect of DaleCard.effects) {
            if (effect.card_id == this.id && effect.type_id == type_id && effect.chameleon_target_id == null) {
                return true;
            }
        }
        return false;
    }

    /** 
     * Returns the effective type_id of this card (after applying chameleon targets)
     * */
    public get effective_type_id(): number {
        return DaleCard.cardIdToChameleonChainLocal.get(this.id)?.type_id ?? 
            DaleCard.cardIdToChameleonChain.get(this.id)?.type_id ?? 
            this.original_type_id;
    }

    /** 
     * Returns the effective value of this card (after applying effects)
     * */
    public get effective_value(): number {
        let value = this.original_value;
        for (let effect of DaleCard.effects) {
            if (effect.card_id == this.id || effect.effect_class == DaleCard.EC_GLOBAL) {
                switch(effect.type_id) {
                    case DaleCard.CT_FLASHYSHOW:
                        value += 1;
                        break;
                    case DaleCard.CT_BOLDHAGGLER:
                        value += effect.arg!;
                        break;
                }
            }
        }
        return value;
    }

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
        return DaleCard.cardIdToChameleonChainLocal.has(this.id) || DaleCard.cardIdToChameleonChain.has(this.id);
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
    public bindChameleonLocal(chain: ChameleonChain) {
        DaleCard.cardIdToChameleonChainLocal.delete(this.id);
        DaleCard.cardIdToChameleonChainLocal.set(this.id, chain);
        DaleCard.updateHTML(this.id);
    }

    
    /**
     * Unbinds the locally stored chameleon bindings for this card.
     */
    public unbindChameleonLocal() {
        DaleCard.cardIdToChameleonChainLocal.delete(this.id);
        DaleCard.updateHTML(this.id);
    }

    /**
     * Unbinds all locally stored chameleon bindings.
     * @return `size` - number of bindings deleted this way
     */
    public static unbindAllChameleonsLocal(): number {
        const card_ids = Array.from(DaleCard.cardIdToChameleonChainLocal.keys())
        DaleCard.cardIdToChameleonChainLocal.clear();
        for (let card_id of card_ids) {
            DaleCard.updateHTML(card_id);
        }
        return card_ids.length;
    }

    /**
     * @return `size` - number of local chameleon bindings
     */
    public static countChameleonsLocal(): number {
        console.log("countChameleonsLocal");
        console.log(DaleCard.cardIdToChameleonChainLocal);
        return DaleCard.cardIdToChameleonChainLocal.size;
    }

    /**
     * Returns the locally stored chameleon mapping as an entry array
     */
    public static getLocalChameleonsEntries(): [number, ChameleonChain][] {
        return Array.from(this.cardIdToChameleonChainLocal.entries());
    }

    /**
     * Returns the locally stored chameleon mapping in a format that can be send to the server (stringified json).
     */
    public static getLocalChameleonsJSON(): string {
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
            DaleCard.updateHTML(card_id);
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
     * Uniquely defines the original appearance of a card. 
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
        //TODO: scary gunfight
        return this.original_value + pos;
    }

    public get animalfolk(): string {
        return DaleCard.cardTypes[this.effective_type_id]!.animalfolk_displayed
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

    public isCardBack() {
        return this.original_type_id == 0;
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

    /////////////////////////////////////////////////////////
    //////////        Div related functions        //////////
    /////////////////////////////////////////////////////////

    private getTooltipContent(): string {
        const cardType = DaleCard.cardTypes[this.effective_type_id]!;
        const animalfolkWithBull = cardType.animalfolk_displayed ? " • "+cardType.animalfolk_displayed : ""
        let chameleonName = "";
        let reminderText = "";
        if (this.isBoundChameleon()) {
            let type_ids = [this.original_type_id];
            let chain = ChameleonChain.concat(DaleCard.cardIdToChameleonChain.get(this.id), DaleCard.cardIdToChameleonChainLocal.get(this.id));
            for (let i = 0; i < chain.length-1; i++) {
                type_ids.push(chain.type_ids[i]!);
            }
            for(let type_id of type_ids) {
                chameleonName += `<span class=chameleon-name>${DaleCard.cardTypes[type_id]!.name}</span><br>`;
            }
        }
        if (this.isChameleon()) {
            reminderText += _("<br><br>A passive chameleon card <strong>you use</strong> is an identical copy of one valid card for all purposes of play. If there is a valid card, you <strong>must</strong> copy it before using the chameleon card.")
        }
        let effective_value: string | number = this.effective_value;
        if (effective_value != cardType.value) {
            effective_value =  `<span class=dale-original-value>${cardType.value}</span> ${effective_value}`;
        }
        return `<div class="dale-card-tooltip">
            <h3>${chameleonName}${cardType.name}</h3>
            <hr>
            ${effective_value}${animalfolkWithBull} • ${cardType.type_displayed} ${cardType.has_plus ? "(+)" :""}
            <br><br>
            <div class="text">${cardType.text}${reminderText}</div>
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
                old_overlay.remove();
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
            //TODO: safely remove this
            // if (!temp_div) {
            //     this.addTooltip(div); //does this do anything?
            // }
        }
    }

    private updateEffectiveValue(card_div: HTMLElement) {
        let value = this.original_value;
        if (DaleCard.page?.isCurrentPlayerActive() && card_div.dataset['value'] == 'effective') {
            value = this.effective_value;
        }
        if (value == this.original_value) {
            card_div.querySelector(".dale-effective-value")?.remove();
        }
        else {
            const value_div = card_div.querySelector(".dale-effective-value") ?? document.createElement('div');
            value_div.classList.add("dale-effective-value");
            value_div.innerHTML = String(value);
            card_div.append(value_div);
        }
    }

    /**
    * Update the HTML of a card_id, if it is attached to a div.
    * It is assumed the div already exists, so `fade == true`
    */
    private static updateHTML(card_id: number) {
        if (DaleCard.divs.has(card_id)) {
            new DaleCard(card_id).updateHTML(undefined, true);
        }
    }

    /**
	 * Update all of this card's modifications according to latest card information. Without any animations.
     * This function should be private. When card information updates, this should immediately be called.
     * @param temp_div (optional) should be a div representing this card's original type
     * @param fade (optional) should the chameleon overlay be faded in?
	 */
	private updateHTML(temp_div?: HTMLElement, fade: boolean = false) {
        const div = temp_div ?? DaleCard.divs.get(this.id);
        this.updateChameleonOverlay(div, fade);
        if (!temp_div && div) {
            this.addTooltip(div);
        }
        if (div) {
            this.updateEffectiveValue(div);
        }
	}

    /**
     * @returns a new div element representing this card.
     * @param parent_id (optional) - if specified, the div will be immediately be "detached" to the parent
     * @param dataValue (optional) - if specified, set the data-value attribute of the div to display modified values
     */
    public toDiv(parent_id?: string | HTMLElement, dataValue?: 'effective' | 'market' | 'original'): HTMLElement {
        const div = document.createElement("div")
        div.classList.add("dale-card");
        div.id = "dale-card-"+this.id;
        Images.setCardStyle(div, this.original_type_id);
        if (dataValue) {
            div.dataset['value'] = dataValue;
        }
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
