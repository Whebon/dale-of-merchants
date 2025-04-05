import Gamegui = require('ebg/core/gamegui');
import { DaleIcons } from './DaleIcons';
import { Images } from './Images';
import { CardType } from './types/CardType';
import { DbCard } from './types/DbCard';
import { DbEffect } from './types/DbEffect';
import { DaleTrigger } from './types/DaleTrigger';
import { ChameleonChain } from './types/ChameleonChain'
import { DaleDie } from './DaleDie';
import { AbstractOrderedSelection } from './AbstractOrderedSelection';

/**
 * HTML data attribute representing a card div's location
 */
type DataLocation = 'moving' | 'stock' | 'market' | 'stall' | 'pile';

/**
 * An OrderedSelection that uses DaleCards
 */
export class OrderedSelection extends AbstractOrderedSelection {
    override getDiv(card_id: number): HTMLElement | undefined {
        //return $("daleofmerchants-card-"+card_id);
        return DaleCard.divs.get(card_id);
    }
}

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
    static readonly CT_GIFTVOUCHER: number = 15;
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
    static readonly CT_SOUNDDETECTORS: number = 39;
    static readonly CT_TRENDSETTING: number = 40;
    static readonly CT_SEEINGDOUBLES: number = 41;
    static readonly CT_TIRELESSTINKERER: number = 42;
    static readonly CT_CALCULATIONS: number = 43;
    static readonly CT_SAFETYPRECAUTION: number = 44;
    static readonly CT_MAGNET: number = 45;
    static readonly CT_DANGEROUSTEST: number = 46;
    static readonly CT_GLUE: number = 47;
    static readonly CT_STEADYACHIEVER: number = 48;
    static readonly CT_SHOPPINGJOURNEY: number = 49;
    static readonly CT_HOUSECLEANING: number = 50;
    static readonly CT_SIESTA: number = 51;
    static readonly CT_LUNCHBREAK: number = 52;
    static readonly CT_IRONING: number = 53;
    static readonly CT_LITTLEVILLAIN: number = 54;
    static readonly CT_SCARYGUNFIGHT: number = 55;
    static readonly CT_NIGHTSHIFT: number = 56;
    static readonly CT_RUTHLESSCOMPETITION: number = 57;
    static readonly CT_NASTYTHREAT: number = 58;
    static readonly CT_LOSTSHIPMENTS: number = 59;
    static readonly CT_CUNNINGNEIGHBOUR: number = 60;
    static readonly CT_CHEER: number = 61;
    static readonly CT_RAFFLE: number = 62;
    static readonly CT_CHARITY: number = 63;
    static readonly CT_TASTERS: number = 64;
    static readonly CT_RUMOURS: number = 65;
    static readonly CT_DARINGADVENTURER: number = 66;
    static readonly CT_RAREARTEFACT: number = 67;
    static readonly CT_SWANK: number = 68;
    static readonly CT_RISKYBUSINESS: number = 69;
    static readonly CT_NATURALSURVIVOR: number = 70;
    static readonly CT_SOFA: number = 71;
    static readonly CT_WISESPY: number = 72;
    static readonly CT_ANCIENTKNOWLEDGE: number = 73;
    static readonly CT_QUALITYINSPECTION: number = 74;
    static readonly CT_BINOCULARS: number = 75;
    static readonly CT_BALANCING: number = 76;
    static readonly CT_EXTRAREMARKS: number = 77;
    static readonly CT_MASTERBUILDER: number = 78;
    static readonly CT_SNACK: number = 79;
    static readonly CT_WINDOFCHANGE: number = 80;
    static readonly CT_OVERTIME: number = 81;
    static readonly CT_ORDERINCHAOS: number = 82;
    static readonly CT_PRACTICE: number = 83;
    static readonly CT_RIGOROUSCHRONICLER: number = 84;
    static readonly CT_REFRESHINGDRINK: number = 85;
    static readonly CT_DUPLICATEENTRY: number = 86;
    static readonly CT_HISTORYLESSON: number = 87;
    static readonly CT_CULTURALPRESERVATION: number = 88;
    static readonly CT_SLICEOFLIFE: number = 89;
    static readonly CT_VORACIOUSCONSUMER: number = 90;
    static readonly CT_DELIGHTFULSURPRISE: number = 91;
    static readonly CT_FORTUNATEUPGRADE: number = 92;
    static readonly CT_REPLACEMENT: number = 93;
    static readonly CT_FASHIONHINT: number = 94;
    static readonly CT_ROYALPRIVILEGE: number = 95;
    static readonly CT_POMPOUSPROFESSIONAL: number = 96;
    static readonly CT_BRIBE: number = 97;
    static readonly CT_BURGLARY: number = 98;
    static readonly CT_GRASP: number = 99;
    static readonly CT_PERISCOPE: number = 100;
    static readonly CT_SUDDENNAP: number = 101;
    static readonly CT_CAREFREESWAPPER: number = 102;
    static readonly CT_BARGAINSEEKER: number = 103;
    static readonly CT_DELICACY: number = 104;
    static readonly CT_UMBRELLA: number = 105;
    static readonly CT_VELOCIPEDE: number = 106;
    static readonly CT_MATCHINGCOLOURS: number = 107;
    static readonly CT_ARCANESCHOLAR: number = 108;
    static readonly CT_BAROMETER: number = 109;
    static readonly CT_BADOMEN: number = 110;
    static readonly CT_FESTIVAL: number = 111;
    static readonly CT_CELESTIALGUIDANCE: number = 112;
    static readonly CT_CALENDAR: number = 113;
    static readonly CT_CLEVERGUARDIAN: number = 114;
    static readonly CT_BARRICADE: number = 115;
    static readonly CT_WHEELBARROW: number = 116;
    static readonly CT_VIGILANCE: number = 117;
    static readonly CT_SUPPLYDEPOT: number = 118;
    static readonly CT_TACTICALMEASUREMENT: number = 119;
    static readonly CT_RESOURCEFULALLY: number = 120;
    static readonly CT_ICETRADE: number = 121;
    static readonly CT_TRAVELINGEQUIPMENT: number = 122;
    static readonly CT_STOVE: number = 123;
    static readonly CT_FISHING: number = 124;
    static readonly CT_PRACTICALVALUES: number = 125;
    static readonly CT_AVIDFINANCIER: number = 126;
    static readonly CT_GREED: number = 127;
    static readonly CT_GOLDENOPPORTUNITY: number = 128;
    static readonly CT_CACHE: number = 129;
    static readonly CT_DISPLAYOFPOWER: number = 130;
    static readonly CT_SAFEPROFITS: number = 131;
    static readonly CT_IMPULSIVEVISIONARY: number = 132;
    static readonly CT_COLLECTORSDESIRE: number = 133;
    static readonly CT_GROUNDBREAKINGIDEA: number = 134;
    static readonly CT_INSPIRATION: number = 135;
    static readonly CT_INSIGHT: number = 136;
    static readonly CT_PERFECTMOVE: number = 137;
    static readonly CT_SHREWDTRICKSTER: number = 138;
    static readonly CT_DISRUPTIVESPEECH: number = 139;
    static readonly CT_TITFORTAT: number = 140;
    static readonly CT_SHAMELESSRUMMAGE: number = 141;
    static readonly CT_PUBLICHUMILIATION: number = 142;
    static readonly CT_EQUALITY: number = 143;
    static readonly CT_FUMBLINGDREAMER: number = 144;
    static readonly CT_COFFEEGRINDER: number = 145;
    static readonly CT_ACCIDENT: number = 146;
    static readonly CT_LOOSEMARBLES: number = 147;
    static readonly CT_ANOTHERFINEMESS: number = 148;
    static readonly CT_FRESHSTART: number = 149;
    static readonly CT_MEDDLINGMARKETEER: number = 150;
    static readonly CT_GOODWILLPRESENTS: number = 151;
    static readonly CT_ALTERNATIVEPLAN: number = 152;
    static readonly CT_ANCHOR: number = 153;
    static readonly CT_MANUFACTUREDJOY: number = 154;
    static readonly CT_SHAKYENTERPRISE: number = 155;
    static readonly CT_DRAMATICROMANTIC: number = 156;
    static readonly CT_BOUQUETS: number = 157;
    static readonly CT_SELECTINGCONTRACTS: number = 158;
    static readonly CT_SERENADE: number = 159;
    static readonly CT_SPINNINGWHEEL: number = 160;
    static readonly CT_INHERITANCE: number = 161;
    static readonly CT_SNEAKYSCOUT: number = 162;
    static readonly CT_FALSEALARM: number = 163;
    static readonly CT_HEROICDEED: number = 164;
    static readonly CT_SECRETMISSION: number = 165;
    static readonly CT_CAPTURE: number = 166;
    static readonly CT_PROVOCATION: number = 167;
    static readonly CT_DEPRECATED_MARKETDISCOVERY: number = 168;
    static readonly CT_DEPRECATED_WHIRLIGIG: number = 169;
    static readonly CT_DEPRECATED_CUNNINGNEIGHBOUR: number = 170;
    static readonly CT_DEPRECATED_TASTERS: number = 171;
    static readonly CT_DEPRECATED_DARINGADVENTURER: number = 172;
    

    public id: number

    /** 
     * Construct a dale card of a given card id. If this is the first time this card id is constructed, the type_id MUST be provided.
     * @param id unique database id for this card instance.
     * @param type_id id that uniquely defines this card's appearance.
     * */
    public constructor(id: number | string, type_id?: number | string) {
        id = +id;
        this.id = id;
        if (+id <= 0) {
            return;
        }
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
        //     console.warn(card);
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
        console.warn("addEffect");
        console.warn(effect);
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
                try {
                    DaleCard.updateHTML(card_id);
                }
                catch (error) {
                    console.warn(`WARNING: skipped a global effect of type ${effect.type_id} applying to an unknown card ${effect.card_id}`)
                }
            }
        }
        else {
            try {
                DaleCard.updateHTML(effect.card_id);
            }
            catch (error) {
                console.warn(`WARNING: skipped a modification effect of type ${effect.type_id} applying to an unknown card ${effect.card_id}`)
            }
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
                console.warn("Known effects:");
                console.warn(DaleCard.effects);
                console.warn("Expired effect:");
                console.warn(effect);
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

    //TODO: safely remove this
    // /**
    //  * Based on the known effects, return all possible effective values.
    //  * If no effects are effective, this will be `[1, 2, 3, 4, 5]`
    //  */
    // public static getAllPossibleEffectiveValues(): number[] {
    //     const effective_values = [];
    //     for (let i = 0; i < 5; i++) {
    //         effective_values.push(new DaleCard(0, DaleCard.CT_SWIFTBROKER+i).effective_value);
    //     }
    //     for (let effect of DaleCard.effects) {
    //         if (effect.effect_class == DaleCard.EC_MODIFICATION) {
    //             const value = new DaleCard(effect.card_id, effect.type_id)
    //             modified_card_ids.add(effect.card_id);
    //         }
    //     }
        
    //     return effective_values;
    // }


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
     * @param argNonNull (optional) default false. If true, only count passives with non-null args (e.g. bold haggler)
     */
    public isPassiveUsed(argNonNull = false) {
        console.warn("isPassiveUsed");
        const type_id = this.effective_type_id;
        
        if (!DaleCard.cardTypes[type_id]!.has_ability) {
            //N/A, this card doesn't have a usable passive, therefore it is considered "used"
            return true;
        }
        //check if the passive is used by the target (recursively)
        let chameleonEffect = this.getChameleonDbEffect();
        if (chameleonEffect?.chameleon_target_id) {
            if (new DaleCard(chameleonEffect.chameleon_target_id!).isPassiveUsed(true)) {
                return true;
            }
        }
        //check if the passive is used
        for (let effect of DaleCard.effects) {
            if (effect.card_id == this.id && effect.type_id == type_id && effect.chameleon_target_id == null) {
                if (argNonNull && effect.arg == null) {
                    continue;
                }
                return true;
            }
        }
        return false;
    }

    /**
     * @returns `true` if this chameleon has a local binding, and a seeingdoubles is involved
     */
    public hasLocalBindingWithSeeingDoubles() {
        const chain = DaleCard.cardIdToChameleonChainLocal.get(this.id)
        if (!chain) {
            return false;
        }
        if (this.original_type_id == DaleCard.CT_SEEINGDOUBLES) {
            return true;
        }
        for (let type_id of chain.type_ids) {
            if (type_id == DaleCard.CT_SEEINGDOUBLES) {
                return true;
            }
        }
        return false;
    }

    
    /** 
     * Returns the effective type_id of this card, skipping local chameleon effects
     * */
    public get effective_server_type_id(): number {
        return DaleCard.cardIdToChameleonChain.get(this.id)?.type_id ?? this.original_type_id;
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
        let chameleonEffects = [];
        let chameleonEffect = this.getChameleonDbEffect();
        while (chameleonEffect) {
            chameleonEffects.push(chameleonEffect);
            chameleonEffect = new DaleCard(chameleonEffect.chameleon_target_id!).getChameleonDbEffect();
            //chameleonEffect = new DaleCard(chameleonEffect.chameleon_target_id!, chameleonEffect.arg!).getChameleonDbEffect();
        }
        for (let effect of DaleCard.effects) {
            let isCopiedEffect = false;
            for (let chameleonEffect of chameleonEffects) {
                if ((effect.card_id == chameleonEffect.chameleon_target_id) && (effect.effect_id < chameleonEffect.effect_id)) {
                    isCopiedEffect = true;
                    break;
                }
            }
            if (effect.card_id == this.id || effect.effect_class == DaleCard.EC_GLOBAL || isCopiedEffect) {
                switch(effect.type_id) {
                    case DaleCard.CT_FLASHYSHOW:
                        value += 1;
                        break;
                    case DaleCard.CT_BOLDHAGGLER:
                        value += effect.arg!;
                        break;
                    case DaleCard.CT_BLINDFOLD:
                        value = effect.arg!;
                        break;
                    case DaleCard.CT_RAREARTEFACT:
                        value *= effect.arg!;
                        break;
                }
            }
        }
        return value;
    }

    /** 
     * Returns the effective cost of this (market) card (after applying effects)
     * */
    public get effective_cost(): number {
        let cost = this.original_value;
        for (let effect of DaleCard.effects) {
            if (effect.effect_class == DaleCard.EC_GLOBAL) {
                switch(effect.type_id) {
                    case DaleCard.CT_SCARYGUNFIGHT:
                        if (DaleCard.page?.player_id != effect.arg) {
                            cost += 2;
                        }
                        break;
                }
            }
        }
        return cost;
    }

    ///////////////////////////////////////////////////////
    //////////        Chameleon functions        //////////
    ///////////////////////////////////////////////////////

    /**
     * Return the last chameleon copy effect that affects this card.
     */
    private getChameleonDbEffect(): DbEffect | null {
        if (!this.isBoundChameleon()) {
            return null;
        }
        if (DaleCard.cardIdToChameleonChainLocal.has(this.id)) {
            //the binding is local, create a dummy effect infinitely far away from all other effects
            const chain = DaleCard.cardIdToChameleonChainLocal.get(this.id)!;
            return new DbEffect({
                effect_id: Infinity,
                effect_class: DaleCard.EC_MODIFICATION,
                card_id: this.id,
                type_id: this.original_type_id,
                arg: chain.type_id,
                chameleon_target_id: chain.card_id
            });
        }
        let chameleon_effect = null;
        for (let effect of DaleCard.effects) {
            if (this.id == 74) {
                console.warn(effect);
            }
            if (effect.card_id == this.id && effect.chameleon_target_id != null) {
                chameleon_effect = effect;
            }
        }
        return chameleon_effect;
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
        console.warn("countChameleonsLocal");
        console.warn(DaleCard.cardIdToChameleonChainLocal);
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
    //     div.classList.add("daleofmerchants-chameleon-icon");
    //     return div;
    // }

    ///////////////////////////////////////////////////////////
    //////////        Public Card Information        //////////
    ///////////////////////////////////////////////////////////

    /** 
     * Uniquely defines the original appearance of a card. 
     * Cards with the same type_id are indistinguishable up to their ids.
     */
    public get original_type_id(): number {
        let _type_id = DaleCard.cardIdtoTypeId.get(this.id);
        if (_type_id == undefined) {
            if (this.id > 0) {
                console.warn(`id ${this.id} does not have a corresponding type_id`);
            }
            return 0;
        }
        return _type_id;
    }

    /** 
     * Returns the original value of this card (uses the effective type, but ignores value modifications)
     */
    public get original_value(): number {
        return DaleCard.cardTypes[this.effective_type_id]!.value
    }

    /**
     * cost of this card when purchased from the market
     * @param pos
     */
    public getCost(pos: number) {
        return this.effective_cost + pos;
    }

    public get trigger(): DaleTrigger {
        return DaleCard.cardTypes[this.effective_type_id]!.trigger;
    }

    public get effective_animalfolk_id() {
        return DaleCard.cardTypes[this.effective_type_id]!.animalfolk_id;
    }

    public get original_animalfolk_id() {
        return DaleCard.cardTypes[this.original_type_id]!.animalfolk_id;
    }

    public get animalfolk_displayed(): string {
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

    public isAnimalfolk(): boolean {
        return (this.original_animalfolk_id != 0);
    }

    public isTechnique(): boolean {
        return DaleCard.cardTypes[this.effective_type_id]!.is_technique
    }

    public isPlayable(): boolean {
        return this.isTechnique() || (DaleCard.cardTypes[this.effective_type_id]!.playable && DaleCard.cardTypes[this.effective_type_id]!.trigger == null);
    }

    public isPlayablePostCleanUp(): boolean {
        return DaleCard.cardTypes[this.effective_type_id]!.playable && DaleCard.cardTypes[this.effective_type_id]!.trigger == 'onCleanUp';
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
                chameleonName += `<span class=daleofmerchants-chameleon-name>${DaleCard.cardTypes[type_id]!.name}</span><br>`;
            }
        }
        if (this.isChameleon()) {
            reminderText += _("<br><br>A passive chameleon card <strong>you use</strong> is an identical copy of one valid card for all purposes of play. If there is a valid card, you <strong>must</strong> copy it before using the chameleon card.")
        }
        let effective_value: string | number = this.effective_value;
        if (effective_value != cardType.value) {
            effective_value =  `(<span class=daleofmerchants-original-value>${cardType.value}</span>) ${effective_value}`;
        }
        return `<div class="daleofmerchants-card-tooltip">
            <h3>${chameleonName}${cardType.name}</h3>
            <hr>
            ${effective_value}${animalfolkWithBull} • ${cardType.type_displayed} ${cardType.has_plus ? "(+)" :""}
            <br><br>
            <div class="daleofmerchants-card-tooltip-text">${this.format_string(cardType.text)}${reminderText}</div>
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
     * Formats keywords in tooltip texts
     */
    private format_string(text: string): string {
        if (text.includes('DIE_OCELOT')) {
            text = text.replaceAll('DIE_OCELOT', `<span class="daleofmerchants-log-span">
                ${DaleDie.getIconTpl(DaleDie.DIE_OCELOT_0)}
                ${DaleDie.getIconTpl(DaleDie.DIE_OCELOT_1)}
                ${DaleDie.getIconTpl(DaleDie.DIE_OCELOT_2)}
                ${DaleDie.getIconTpl(DaleDie.DIE_OCELOT_2)}
                ${DaleDie.getIconTpl(DaleDie.DIE_OCELOT_3)}
                ${DaleDie.getIconTpl(DaleDie.DIE_OCELOT_3)}
            </span>`);
        }
        if (text.includes('DIE_POLECAT')) {
            text = text.replaceAll('DIE_POLECAT', `<span class="daleofmerchants-log-span">
                ${DaleDie.getIconTpl(DaleDie.DIE_POLECAT_1)}
                ${DaleDie.getIconTpl(DaleDie.DIE_POLECAT_1)}
                ${DaleDie.getIconTpl(DaleDie.DIE_POLECAT_2)}
                ${DaleDie.getIconTpl(DaleDie.DIE_POLECAT_2)}
                ${DaleDie.getIconTpl(DaleDie.DIE_POLECAT_3)}
                ${DaleDie.getIconTpl(DaleDie.DIE_POLECAT_3)}
            </span>`);
        }
        if (text.includes('DIE_HARE')) {
            text = text.replaceAll('DIE_HARE', `<span class="daleofmerchants-log-span">
                ${DaleDie.getIconTpl(DaleDie.DIE_STARS)}
                ${DaleDie.getIconTpl(DaleDie.DIE_STARS)}
                ${DaleDie.getIconTpl(DaleDie.DIE_PLANET)}
                ${DaleDie.getIconTpl(DaleDie.DIE_PLANET)}
                ${DaleDie.getIconTpl(DaleDie.DIE_PLANET_REROLL)}
                ${DaleDie.getIconTpl(DaleDie.DIE_COMET)}
            </span>`);
        }
        if (text.includes('DIE_PANGOLIN1')) {
            text = text.replaceAll('DIE_PANGOLIN1', `<span class="daleofmerchants-log-span">
                ${DaleDie.getIconTpl(DaleDie.DIE_DISCARD)}
                ${DaleDie.getIconTpl(DaleDie.DIE_DISCARD)}
                ${DaleDie.getIconTpl(DaleDie.DIE_DECK)}
                ${DaleDie.getIconTpl(DaleDie.DIE_DECK)}
                ${DaleDie.getIconTpl(DaleDie.DIE_DECK)}
                ${DaleDie.getIconTpl(DaleDie.DIE_HAND)}
            </span>`);
        }
        if (text.includes('DIE_PANGOLIN2')) {
            text = text.replaceAll('DIE_PANGOLIN2', `<span class="daleofmerchants-log-span">
                ${DaleDie.getIconTpl(DaleDie.DIE_DISCARD2)}
                ${DaleDie.getIconTpl(DaleDie.DIE_DISCARD2)}
                ${DaleDie.getIconTpl(DaleDie.DIE_DECK2)}
                ${DaleDie.getIconTpl(DaleDie.DIE_DECK2)}
                ${DaleDie.getIconTpl(DaleDie.DIE_DECK2)}
                ${DaleDie.getIconTpl(DaleDie.DIE_HAND2)}
            </span>`);
        }
        if (text.includes('SOURCE')) {
            text = text.replaceAll('SOURCE', `<span style="color: var(--pangolin1); font-weight: bold;">${_("source")}</span>`);
        }
        if (text.includes('DESTINATION')) {
            text = text.replaceAll('DESTINATION', `<span style="color: var(--pangolin2); font-weight: bold;">${_("destination")}</span>`);
        }
        if (text.includes('CARDS')) {
            text = text.replaceAll('CARDS', `<span class="daleofmerchants-log-span">${DaleIcons.getCardsIcon().outerHTML}</span>`);
        }
        if (text.includes('CARD')) {
            text = text.replaceAll('CARD', `<span class="daleofmerchants-log-span">${DaleIcons.getCardIcon().outerHTML}</span>`);
        }
        return text;
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
        const old_overlay = div.querySelector(".daleofmerchants-chameleon-overlay:not(.daleofmerchants-fading)");
		if (old_overlay) {
            // if ((old_overlay as HTMLElement).dataset['typeid'] == String(this.effective_type_id)) {
            //     return;
            // }
            if (fade) {
                old_overlay.classList.add("daleofmerchants-fading");
                dojo.fadeOut({node: old_overlay as HTMLElement, onEnd: function (node: HTMLElement){dojo.destroy(node);}}).play();
            }
            else {
                old_overlay.remove();
            }
		}
        if (this.isBoundChameleon()) {
            const chameleon_icon = DaleIcons.getChameleonIcon();
            chameleon_icon.classList.add("daleofmerchants-chameleon-icon");
            const new_overlay = document.createElement("div");
            new_overlay.classList.add("daleofmerchants-card");
            new_overlay.classList.add("daleofmerchants-chameleon-overlay");
            Images.setCardStyle(new_overlay, this.effective_type_id);
            //new_overlay.setAttribute('style', Images.getCardStyle(this.effective_type_id));
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
        if (card_div.dataset['location'] == 'market') {
            value = this.effective_cost;
        }
        else if (card_div.dataset['location'] == 'moving' || (card_div.dataset['location'] == 'stock' && DaleCard.page?.isCurrentPlayerActive())) {
            value = this.effective_value;
        }
        if (value == this.original_value) {
            card_div.querySelector(".daleofmerchants-effective-value")?.remove();
        }
        else {
            const value_div = card_div.querySelector(".daleofmerchants-effective-value") ?? document.createElement('div');
            value_div.classList.add("daleofmerchants-effective-value");
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
        if (this.id <= 0) {
            return;
        }
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
     * Update the data-location attribute of the attached div
     */
    public updateLocation(dataLocation?: DataLocation) {
        const div = DaleCard.divs.get(this.id);
        if (div) {
            div.dataset['location'] = dataLocation;
            this.updateHTML(div, true);
        }
    }

    /**
     * @returns a new div element representing this card.
     * @param parent_id (optional) - if specified, the div will be immediately be "detached" to the parent
     * @param dataLocation (optional) - if specified, set the data-location attribute of the div to display modified values
     */
    public toDiv(parent_id?: string | HTMLElement, dataLocation?: DataLocation): HTMLElement {
        const div = document.createElement("div")
        div.classList.add("daleofmerchants-card");
        div.id = "daleofmerchants-card-"+this.id;
        Images.setCardStyle(div, this.original_type_id);
        if (dataLocation) {
            div.dataset['location'] = dataLocation;
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
     * @param specific_div (optional) if provided, only remove the div association if it matches this specific_div
     */
    public detachDiv(specific_div?: HTMLElement) {
        if (specific_div === undefined || specific_div == DaleCard.divs.get(this.id)) {
            this.removeTooltip();
            DaleCard.divs.delete(this.id);
        }
    }

    /**
     * Uniquely associate this card with the specified div
     */
    public attachDiv(div: HTMLElement) {
        div.classList.add("daleofmerchants-card");
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
