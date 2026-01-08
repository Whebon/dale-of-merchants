import Gamegui = require('ebg/core/gamegui');
import { DaleIcons } from './DaleIcons';
import { Images } from './Images';
import { CardType } from './types/CardType';
import { DbCard } from './types/DbCard';
import { DbEffect } from './types/DbEffect';
import { DaleTrigger } from './types/DaleTrigger';
import { DaleDie } from './DaleDie';
import { AbstractOrderedSelection } from './AbstractOrderedSelection';
import { DaleDeckSelection } from './DaleDeckSelection';
import { PlayerClock } from './PlayerClock';

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

    /**
     * Maps a card_id to the type_id it copied
     */
    private static readonly cardIdtoCopiedTypeId: Map<number, number> = new Map<number, number>();

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
    static readonly CT_EXCLUSIVECONTACTS: number = 17;
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
    static readonly CT_RIGOROUSCHRONICLER: number = 78;
    static readonly CT_REFRESHINGDRINK: number = 79;
    static readonly CT_DUPLICATEENTRY: number = 80;
    static readonly CT_HISTORYLESSON: number = 81;
    static readonly CT_CULTURALPRESERVATION: number = 82;
    static readonly CT_SLICEOFLIFE: number = 83;
    static readonly CT_VORACIOUSCONSUMER: number = 84;
    static readonly CT_DELIGHTFULSURPRISE: number = 85;
    static readonly CT_FORTUNATEUPGRADE: number = 86;
    static readonly CT_REPLACEMENT: number = 87;
    static readonly CT_FASHIONHINT: number = 88;
    static readonly CT_ROYALPRIVILEGE: number = 89;
    static readonly CT_POMPOUSPROFESSIONAL: number = 90;
    static readonly CT_BRIBE: number = 91;
    static readonly CT_BURGLARY: number = 92;
    static readonly CT_GRASP: number = 93;
    static readonly CT_PERISCOPE: number = 94;
    static readonly CT_SUDDENNAP: number = 95;
    static readonly CT_CAREFREESWAPPER: number = 96;
    static readonly CT_BARGAINSEEKER: number = 97;
    static readonly CT_DELICACY: number = 98;
    static readonly CT_UMBRELLA: number = 99;
    static readonly CT_VELOCIPEDE: number = 100;
    static readonly CT_COLOURSWAP: number = 101;
    static readonly CT_ARCANESCHOLAR: number = 102;
    static readonly CT_BAROMETER: number = 103;
    static readonly CT_BADOMEN: number = 104;
    static readonly CT_FESTIVAL: number = 105;
    static readonly CT_CELESTIALGUIDANCE: number = 106;
    static readonly CT_CALENDAR: number = 107;
    static readonly CT_CLEVERGUARDIAN: number = 108;
    static readonly CT_BARRICADE: number = 109;
    static readonly CT_WHEELBARROW: number = 110;
    static readonly CT_VIGILANCE: number = 111;
    static readonly CT_SUPPLYDEPOT: number = 112;
    static readonly CT_TACTICALMEASUREMENT: number = 113;
    static readonly CT_AVIDFINANCIER: number = 114;
    static readonly CT_GREED: number = 115;
    static readonly CT_GOLDENOPPORTUNITY: number = 116;
    static readonly CT_CACHE: number = 117;
    static readonly CT_DISPLAYOFPOWER: number = 118;
    static readonly CT_SAFEPROFITS: number = 119;
    static readonly CT_DODOS1: number = 120;
    static readonly CT_DODOS2: number = 121;
    static readonly CT_DODOS3: number = 122;
    static readonly CT_DODOS4: number = 123;
    static readonly CT_DODOS5A: number = 124;
    static readonly CT_DODOS5B: number = 125;
    static readonly CT_CAPUCHINS1: number = 126;
    static readonly CT_CAPUCHINS2: number = 127;
    static readonly CT_CAPUCHINS3: number = 128;
    static readonly CT_CAPUCHINS4: number = 129;
    static readonly CT_CAPUCHINS5A: number = 130;
    static readonly CT_CAPUCHINS5B: number = 131;
    static readonly CT_OLMS1: number = 132;
    static readonly CT_OLMS2: number = 133;
    static readonly CT_OLMS3: number = 134;
    static readonly CT_OLMS4: number = 135;
    static readonly CT_OLMS5A: number = 136;
    static readonly CT_OLMS5B: number = 137;
    static readonly CT_RESOURCEFULALLY: number = 138;
    static readonly CT_ICETRADE: number = 139;
    static readonly CT_TRAVELINGEQUIPMENT: number = 140;
    static readonly CT_STOVE: number = 141;
    static readonly CT_FISHING: number = 142;
    static readonly CT_PRACTICALVALUES: number = 143;
    static readonly CT_IMPULSIVEVISIONARY: number = 144;
    static readonly CT_COLLECTORSDESIRE: number = 145;
    static readonly CT_GROUNDBREAKINGIDEA: number = 146;
    static readonly CT_INSPIRATION: number = 147;
    static readonly CT_INSIGHT: number = 148;
    static readonly CT_PERFECTMOVE: number = 149;
    static readonly CT_SKINKS1: number = 150;
    static readonly CT_SKINKS2: number = 151;
    static readonly CT_SKINKS3: number = 152;
    static readonly CT_SKINKS4: number = 153;
    static readonly CT_SKINKS5A: number = 154;
    static readonly CT_SKINKS5B: number = 155;
    static readonly CT_MASTERBUILDER: number = 156;
    static readonly CT_SNACK: number = 157;
    static readonly CT_WINDOFCHANGE: number = 158;
    static readonly CT_OVERTIME: number = 159;
    static readonly CT_ORDERINCHAOS: number = 160;
    static readonly CT_PRACTICE: number = 161;
    static readonly CT_PRISTINEOWNER: number = 162;
    static readonly CT_BONSAI: number = 163;
    static readonly CT_RAKE: number = 164;
    static readonly CT_SLOTMACHINE: number = 165;
    static readonly CT_GENERATIONCHANGE: number = 166;
    static readonly CT_WARMEMBRACE: number = 167;
    static readonly CT_MEDDLINGMARKETEER: number = 168;
    static readonly CT_GOODWILLPRESENTS: number = 169;
    static readonly CT_ALTERNATIVEPLAN: number = 170;
    static readonly CT_ANCHOR: number = 171;
    static readonly CT_MANUFACTUREDJOY: number = 172;
    static readonly CT_SHAKYENTERPRISE: number = 173;
    static readonly CT_FUMBLINGDREAMER: number = 174;
    static readonly CT_COFFEEGRINDER: number = 175;
    static readonly CT_ACCIDENT: number = 176;
    static readonly CT_LOOSEMARBLES: number = 177;
    static readonly CT_ANOTHERFINEMESS: number = 178;
    static readonly CT_SOUVENIRS: number = 179;
    static readonly CT_GLASSFROGS1: number = 180;
    static readonly CT_GLASSFROGS2: number = 181;
    static readonly CT_GLASSFROGS3: number = 182;
    static readonly CT_GLASSFROGS4: number = 183;
    static readonly CT_GLASSFROGS5A: number = 184;
    static readonly CT_GLASSFROGS5B: number = 185;
    static readonly CT_GORILLAS1: number = 186;
    static readonly CT_GORILLAS2: number = 187;
    static readonly CT_GORILLAS3: number = 188;
    static readonly CT_GORILLAS4: number = 189;
    static readonly CT_GORILLAS5A: number = 190;
    static readonly CT_GORILLAS5B: number = 191;
    static readonly CT_WALRUSES1: number = 192;
    static readonly CT_WALRUSES2: number = 193;
    static readonly CT_WALRUSES3: number = 194;
    static readonly CT_WALRUSES4: number = 195;
    static readonly CT_WALRUSES5A: number = 196;
    static readonly CT_WALRUSES5B: number = 197;
    static readonly CT_TASMANIANDEVILS1: number = 198;
    static readonly CT_TASMANIANDEVILS2: number = 199;
    static readonly CT_TASMANIANDEVILS3: number = 200;
    static readonly CT_TASMANIANDEVILS4: number = 201;
    static readonly CT_TASMANIANDEVILS5A: number = 202;
    static readonly CT_TASMANIANDEVILS5B: number = 203;
    static readonly CT_JUNGLEFOWLS1: number = 204;
    static readonly CT_JUNGLEFOWLS2: number = 205;
    static readonly CT_JUNGLEFOWLS3: number = 206;
    static readonly CT_JUNGLEFOWLS4: number = 207;
    static readonly CT_JUNGLEFOWLS5A: number = 208;
    static readonly CT_JUNGLEFOWLS5B: number = 209;
    static readonly CT_DRAMATICROMANTIC: number = 210;
    static readonly CT_SERENADE: number = 211;
    static readonly CT_SELECTINGCONTRACTS: number = 212;
    static readonly CT_BOUQUETS: number = 213;
    static readonly CT_SPINNINGWHEEL: number = 214;
    static readonly CT_INHERITANCE: number = 215;
    static readonly CT_SNEAKYSCOUT: number = 216;
    static readonly CT_FALSEALARM: number = 217;
    static readonly CT_HEROICDEED: number = 218;
    static readonly CT_SECRETMISSION: number = 219;
    static readonly CT_CAPTURE: number = 220;
    static readonly CT_PROVOCATION: number = 221;
    static readonly CT_SWIFTMEMBER: number = 222;
    static readonly CT_LOYALMEMBER: number = 223;
    static readonly CT_WILYMEMBER: number = 224;
    static readonly CT_STASHINGMEMBER: number = 225;
    static readonly CT_BOLDMEMBER: number = 226;
    static readonly CT_FLEXIBLEMEMBER: number = 227;
    static readonly CT_TIRELESSMEMBER: number = 228;
    static readonly CT_STEADYMEMBER: number = 229;
    static readonly CT_LITTLEMEMBER: number = 230;
    static readonly CT_CUNNINGMEMBER: number = 231;
    static readonly CT_DARINGMEMBER: number = 232;
    static readonly CT_WISEMEMBER: number = 233;
    static readonly CT_RIGOROUSMEMBER: number = 234;
    static readonly CT_VORACIOUSMEMBER: number = 235;
    static readonly CT_POMPOUSMEMBER: number = 236;
    static readonly CT_CAREFREEMEMBER: number = 237;
    static readonly CT_ARCANEMEMBER: number = 238;
    static readonly CT_CLEVERMEMBER: number = 239;
    static readonly CT_AVIDMEMBER: number = 240;
    static readonly CT_DODOSMONO: number = 241;
    static readonly CT_CAPUCHINSMONO: number = 242;
    static readonly CT_OLMSMONO: number = 243;
    static readonly CT_RESOURCEFULMEMBER: number = 244;
    static readonly CT_IMPULSIVEMEMBER: number = 245;
    static readonly CT_SKINKSMONO: number = 246;
    static readonly CT_MASTERMEMBER: number = 247;
    static readonly CT_PRISTINEMEMBER: number = 248;
    static readonly CT_MEDDLINGMEMBER: number = 249;
    static readonly CT_FUMBLINGMEMBER: number = 250;
    static readonly CT_GLASSFROGSMONO: number = 251;
    static readonly CT_GORILLASMONO: number = 252;
    static readonly CT_WALRUSESMONO: number = 253;
    static readonly CT_TASMANIANDEVILSMONO: number = 254;
    static readonly CT_JUNGLEFOWLSMONO: number = 255;
    static readonly CT_DRAMATICMEMBER: number = 256;
    static readonly CT_STEALTHYMEMBER: number = 257;
    static readonly CT_DEPRECATED_MARKETDISCOVERY: number = 258;
    static readonly CT_DEPRECATED_CHEER: number = 259;
    static readonly CT_DEPRECATED_TASTERS: number = 260;
    static readonly CT_DEPRECATED_ESSENTIALPURCHASE: number = 261;
    static readonly CT_DEPRECATED_STOCKCLEARANCE: number = 262;
    static readonly CT_DEPRECATED_BLINDFOLD: number = 263;
    static readonly CT_DEPRECATED_RIGOROUSCHRONICLER: number = 264;
    static readonly CT_DEPRECATED_HISTORYLESSON: number = 265;
    static readonly CT_DEPRECATED_CULTURALPRESERVATION: number = 266;
    static readonly CT_DEPRECATED_SLICEOFLIFE: number = 267;
    static readonly CT_DEPRECATED_VORACIOUSCONSUMER: number = 268;
    static readonly CT_DEPRECATED_FASHIONHINT: number = 269;
    static readonly CT_DEPRECATED_ROYALPRIVILEGE: number = 270;
    static readonly CT_DEPRECATED_VELOCIPEDE: number = 271;
    static readonly CT_DEPRECATED_INSIGHT: number = 272;
    static readonly CT_DEPRECATED_WHIRLIGIG: number = 273;
    static readonly CT_DEPRECATED_FRESHSTART: number = 274;

    public id: number

    static readonly EFFECT_CHAMELEON_TYPE: number = 1000;
    static readonly EFFECT_CHAMELEON_VALUE: number = 1001;
    static readonly EFFECT_INCREASE_HAND_SIZE: number = 1002;
    

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
        Images.first_mono_type_id = DaleCard.CT_SWIFTMEMBER;
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
        if (effect.type_id == this.EFFECT_CHAMELEON_TYPE) {
            DaleCard.cardIdtoCopiedTypeId.set(effect.card_id, effect.arg!)
        }

        switch(effect.type_id) {
            case DaleCard.CT_AVIDFINANCIER:
                const avid_financier_card = DaleCard.divs.get(effect.card_id)!;
                const avid_financier_coin_container = document.createElement("div");
                avid_financier_coin_container.classList.add("daleofmerchants-avid-financier-coin-container");
                avid_financier_card.append(avid_financier_coin_container);
                for (let i = 0; i < effect.arg!; i++) {
                    const avid_financier_coin = DaleIcons.getCoinIcon();
                    avid_financier_coin.classList.add("daleofmerchants-avid-financier-coin-icon");
                    avid_financier_coin_container.append(avid_financier_coin);
                    //animate
                    const player_id = this.page!.isSpectator ? this.page!.gamedatas.playerorder[0] : this.page!.player_id;
                    const source = 'overall_player_board_' + player_id;
                    this.page!.placeOnObject(avid_financier_coin, source);
                    const duration = 500;
                    const delay = 250*i;
                    const animSlide = this.page!.slideToObject(avid_financier_coin, avid_financier_card, duration, delay);
                    const onEnd = (node: HTMLElement) => {
                        dojo.setStyle(node, 'left', '');
                        dojo.setStyle(node, 'top', '');
                    }
                    const animCallback = dojo.animateProperty({ node: avid_financier_coin, duration: 0, onEnd: onEnd });
                    const anim = dojo.fx.chain([animSlide as unknown as dojo._base.Animation, animCallback]);
                    anim.play();
                }
                break;
            case DaleCard.CT_NASTYTHREAT:
                for (const player_id of this.page!.gamedatas.playerorder) {
                    if (effect.arg != player_id) {
                        (this.page as any).playerStalls[+player_id].increaseStackValue(1)
                    }
                }
                break;
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
            if (effect.type_id == DaleCard.EFFECT_CHAMELEON_TYPE) {
                DaleCard.cardIdtoCopiedTypeId.delete(effect.card_id);
            }

            switch(effect.type_id) {
                case DaleCard.CT_AVIDFINANCIER:
                    for (let i = 0; i < effect.arg!; i++) {
                        const avid_financier_card = DaleCard.divs.get(effect.card_id)!;
                        avid_financier_card.querySelectorAll(".daleofmerchants-avid-financier-coin-icon").forEach( icon => {
                            icon.remove();
                        })
                    }
                    break;
                case DaleCard.CT_NASTYTHREAT:
                    for (const player_id of this.page!.gamedatas.playerorder) {
                        if (effect.arg != player_id) {
                            (this.page as any).playerStalls[+player_id].increaseStackValue(-1)
                        }
                    }
                    break;
            }
        }
        
        affected_card_ids = includes_global_effect ? Array.from(DaleCard.divs.keys()) : affected_card_ids;
        affected_card_ids.forEach(card_id => {
            DaleCard.updateHTML(card_id);
        });
    }

    /**
     * Update an existing effect
     * @param effect 
     */
    public static updateEffect(effect: DbEffect) {
        switch (effect.type_id) {
            case DaleCard.CT_AVIDFINANCIER:
                console.warn("updateEffect ignored, this is already handled by 'avidFinancierTakeCoin'")
                break;
            default:
                DaleCard.expireEffects([effect]);
                DaleCard.addEffect(effect);
                break;
        }
    }


    // TODO: safely remove this
    // /**
    //  * Based on the known effects, return all possible effective values.
    //  * If no effects are active, this will be `[1, 2, 3, 4, 5]`
    //  * If a CT_FLASHYSHOW is active, this will be `[2, 3, 4, 5, 6]`
    //  */
    // public static getBaseEffectiveValues(): number[] {
    //     const effective_values = [];
    //     for (let i = 0; i < 5; i++) {
    //         effective_values.push(new DaleCard(0, DaleCard.CT_SWIFTBROKER+i).effective_value);
    //     }
    //     return effective_values;
    // }
    // /**
    //  * @return true if any global effect is modifying values.
    //  */
    // public static isGlobalValueEffectActive(): boolean {
    //     for (let i = 0; i < 5; i++) {
    //         const base_value = i+1
    //         const effective_value = new DaleCard(0, DaleCard.CT_SWIFTBROKER+i).effective_value
    //         if (base_value != effective_value) {
    //             console.log("base_value = ", base_value);
    //             console.log("effective_value = ", effective_value);
    //             return true;
    //         }
    //     }
    //     return false;
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
     */
    public isPassiveUsed() {
        console.warn("isPassiveUsed");
        const type_id = this.effective_type_id;
        
        if (!DaleCard.cardTypes[type_id]!.has_ability) {
            //N/A, this card doesn't have a usable passive, therefore it is considered "used"
            return true;
        }

        for (let effect of DaleCard.effects) {
            if (effect.card_id == this.id && effect.type_id == type_id) {
                return true;
            }
        }
        return false;
    }

    //TODO: safely remove this
    // /**
    //  * @returns `true` if this chameleon has a local binding, and a seeingdoubles is involved
    //  */
    // public hasLocalBindingWithSeeingDoubles() {
    //     const chain = DaleCard.cardIdToChameleonChainLocal.get(this.id)
    //     if (!chain) {
    //         return false;
    //     }
    //     if (this.original_type_id == DaleCard.CT_SEEINGDOUBLES) {
    //         return true;
    //     }
    //     for (let type_id of chain.type_ids) {
    //         if (type_id == DaleCard.CT_SEEINGDOUBLES) {
    //             return true;
    //         }
    //     }
    //     return false;
    // }

    /** 
     * Returns the effective type_id of this card (after applying chameleon targets)
     * */
    public get effective_type_id(): number {
        return DaleCard.cardIdtoCopiedTypeId.get(this.id) ?? this.original_type_id;
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
                    case DaleCard.CT_BLINDFOLD:
                    case DaleCard.CT_DEPRECATED_BLINDFOLD:
                        value = effect.arg!;
                        break;
                    case DaleCard.CT_RAREARTEFACT:
                    case DaleCard.CT_DARINGMEMBER:
                        value *= effect.arg!;
                        break;
                    case DaleCard.CT_STOVE:
                        value = effect.arg!;
                        break;
                    case DaleCard.CT_PRACTICALVALUES:
                        if (value >= 1 && value <= 5) {
                            value = 6 - value;
                        }
                        break;
                    case DaleCard.CT_BAROMETER:
                        value = effect.arg!;
                        break;
                    case DaleCard.EFFECT_CHAMELEON_VALUE:
                        value = effect.arg!;
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
                    case DaleCard.CT_ESSENTIALPURCHASE:
                        if (DaleCard.page?.player_id == effect.arg) {
                            cost -= 2;
                        }
                        break;
                    case DaleCard.CT_EXCLUSIVECONTACTS:
                        if (DaleCard.page?.player_id == effect.arg) {
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
     * @returns true if this is a chameleon card
     */
    public isChameleon(): boolean {
        const type_id = this.effective_type_id;
        return (
            type_id == DaleCard.CT_FLEXIBLESHOPKEEPER ||
            type_id == DaleCard.CT_REFLECTION ||
            type_id == DaleCard.CT_GOODOLDTIMES ||
            type_id == DaleCard.CT_SOUNDDETECTORS ||
            type_id == DaleCard.CT_TRENDSETTING ||
            type_id == DaleCard.CT_SEEINGDOUBLES
        );
    }

    /**
     * @returns true if this is a card that has already copied a card earlier this turn
     */
    public isBoundChameleon(): boolean {
        return DaleCard.cardIdtoCopiedTypeId.has(this.id);
    }

    // TODO: safely remove this (deprecated chameleons)
    //  /**
    //  * Return the last chameleon copy effect that affects this card.
    //  */
    // private getChameleonDbEffect(): DbEffect | null {
    //     if (!this.isBoundChameleon()) {
    //         return null;
    //     }
    //     if (DaleCard.cardIdToChameleonChainLocal.has(this.id)) {
    //         //the binding is local, create a dummy effect infinitely far away from all other effects
    //         const chain = DaleCard.cardIdToChameleonChainLocal.get(this.id)!;
    //         return new DbEffect({
    //             effect_id: Infinity,
    //             effect_class: DaleCard.EC_MODIFICATION,
    //             card_id: this.id,
    //             type_id: this.original_type_id,
    //             arg: chain.type_id,
    //             chameleon_target_id: chain.card_id
    //         });
    //     }
    //     let chameleon_effect = null;
    //     for (let effect of DaleCard.effects) {
    //         if (this.id == 74) {
    //             console.warn(effect);
    //         }
    //         if (effect.card_id == this.id && effect.chameleon_target_id != null) {
    //             chameleon_effect = effect;
    //         }
    //     }
    //     return chameleon_effect;
    // }
    // /**
    //  * Bind an effective type to this card. The bind still needs to be commited to the server later.
    //  * @param effective_type_id new type id this card should be bound to
    //  */
    // public bindChameleonLocal(chain: ChameleonChain) {
    //     DaleCard.cardIdToChameleonChainLocal.delete(this.id);
    //     DaleCard.cardIdToChameleonChainLocal.set(this.id, chain);
    //     DaleCard.updateHTML(this.id);
    // }
    // /**
    //  * Unbinds the locally stored chameleon bindings for this card.
    //  */
    // public unbindChameleonLocal() {
    //     DaleCard.cardIdToChameleonChainLocal.delete(this.id);
    //     DaleCard.updateHTML(this.id);
    // }
    // /**
    //  * Unbinds all locally stored chameleon bindings.
    //  * @return `size` - number of bindings deleted this way
    //  */
    // public static unbindAllChameleonsLocal(): number {
    //     const card_ids = Array.from(DaleCard.cardIdToChameleonChainLocal.keys())
    //     DaleCard.cardIdToChameleonChainLocal.clear();
    //     for (let card_id of card_ids) {
    //         DaleCard.updateHTML(card_id);
    //     }
    //     return card_ids.length;
    // }
    // /**
    //  * @return `size` - number of local chameleon bindings
    //  */
    // public static countChameleonsLocal(): number {
    //     console.warn("countChameleonsLocal");
    //     console.warn(DaleCard.cardIdToChameleonChainLocal);
    //     return DaleCard.cardIdToChameleonChainLocal.size;
    // }
    // /**
    //  * Returns the locally stored chameleon mapping as an entry array
    //  */
    // public static getLocalChameleonsEntries(): [number, ChameleonChain][] {
    //     return Array.from(this.cardIdToChameleonChainLocal.entries());
    // }
    // /**
    //  * Returns the locally stored chameleon mapping in a format that can be send to the server (stringified json).
    //  */
    // public static getLocalChameleonsJSON(): string {
    //     const array = Array.from(this.cardIdToChameleonChainLocal.entries()).map(([card_id, target]) => ({
    //         card_id: card_id,
    //         chameleon_target_ids: target.card_ids,
    //         target_type_ids: target.type_ids
    //     }));
    //     return JSON.stringify(array);
    // }
    // /**
    //  * Unbinds all chameleon cards.
    //  */
    // public static unbindAllChameleons() {
    //     const card_ids = Array.from(DaleCard.cardIdtoCopiedTypeId.keys())
    //     DaleCard.cardIdtoCopiedTypeId.clear();
    //     for (let card_id of card_ids) {
    //         DaleCard.updateHTML(card_id);
    //     }
    // }

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
        return Math.max(0, this.effective_cost + pos);
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
        return (this.original_animalfolk_id != 0) && !this.isMonoCard();
    }

    public isMonoCard(): boolean {
        return DaleCard.cardTypes[this.effective_type_id]!.is_mono;
    }

    public isTechnique(): boolean {
        return DaleCard.cardTypes[this.effective_type_id]!.is_technique
    }

    public isPlayable(): boolean {
        return this.isTechnique() || (DaleCard.cardTypes[this.effective_type_id]!.playable && DaleCard.cardTypes[this.effective_type_id]!.trigger == null);
    }

    public isPlayableFromHandPostCleanUp(): boolean {
        const type_id = this.effective_type_id
        return DaleCard.cardTypes[type_id]!.playable && DaleCard.cardTypes[type_id]!.trigger == 'onCleanUp' && type_id != DaleCard.CT_SLICEOFLIFE;
    }

    public static isPlayable(type_id: number): boolean {
        return DaleCard.cardTypes[type_id]!.playable
    }

    /////////////////////////////////////////////////////
    //////////        Schedule Cooldown        //////////
    /////////////////////////////////////////////////////

    /**
     * A list of all cards that are on schedule cooldown. They are unable to re-trigger during the current trigger event
     */
    public static readonly scheduleCooldownCardIds: Set<number> = new Set();
    
    /**
     * @returns `true` if this card is on "cooldown", meaning that it cannot trigger again during the current trigger event
     */
    public inScheduleCooldown(): boolean {
        return DaleCard.scheduleCooldownCardIds.has(this.id);
    }

    /////////////////////////////////////////////////////////
    //////////        Div related functions        //////////
    /////////////////////////////////////////////////////////

    private getTooltipContent(): string {
        const cardType = DaleCard.cardTypes[this.effective_type_id]!;
        const animalfolkWithBull = cardType.animalfolk_displayed ? " • "+cardType.animalfolk_displayed : ""
        let chameleonName = "";
        if (this.isBoundChameleon()) {
            chameleonName += `<span class=daleofmerchants-chameleon-name>${DaleCard.cardTypes[this.original_type_id]!.name}</span><br>`;
        }
        let effective_value: string | number = this.effective_value;
        if (effective_value != cardType.value) {
            effective_value =  `(<span class=daleofmerchants-original-value>${cardType.value}</span>) ${effective_value}`;
        }
        const legend = this.getLegend(cardType.text);
        return `<div class="daleofmerchants-card-tooltip">
            <h3>${chameleonName}${cardType.name}</h3>
            <hr>
            ${effective_value}${animalfolkWithBull} • ${cardType.type_displayed} ${cardType.has_plus ? "(+)" :""}
            <br><br>
            <div class="daleofmerchants-card-tooltip-text">${DaleCard.format_string(cardType.text)}</div>
            <div style="color:gray" class="daleofmerchants-card-tooltip-text">${legend ? '<hr>'+legend : '<br style="line-height: 10px" />'}</div>
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
    public static format_string(text: string): string {
        if (text.includes('CARDS3')) {
            text = text.replaceAll('CARDS3', `<span class="daleofmerchants-log-span">${DaleIcons.getCards3Icon().outerHTML}</span>`);
        }
        if (text.includes('CARDS2')) {
            text = text.replaceAll('CARDS2', `<span class="daleofmerchants-log-span">${DaleIcons.getCards2Icon().outerHTML}</span>`);
        }
        if (text.includes('CARD')) {
            text = text.replaceAll('CARD', `<span class="daleofmerchants-log-span">${DaleIcons.getCardIcon().outerHTML}</span>`);
        }
        if (text.includes('DIE_OCELOT')) {
            text = text.replaceAll('DIE_OCELOT', `<span class="daleofmerchants-log-span">${DaleIcons.get3DDieOcelotIcon().outerHTML}</span>`);
        }
        if (text.includes('DIE_POLECAT')) {
            text = text.replaceAll('DIE_POLECAT', `<span class="daleofmerchants-log-span">${DaleIcons.get3DDiePolecatIcon().outerHTML}</span>`);
        }
        if (text.includes('DIE_HARE')) {
            text = text.replaceAll('DIE_HARE', `<span class="daleofmerchants-log-span">${DaleIcons.get3DDieHareIcon().outerHTML}</span>`);
        }
        if (text.includes('DIE_PANGOLINS')) {
            //TODO: text = text.replaceAll('DIE_PANGOLINS', `<span class="daleofmerchants-log-span">${DaleIcons.get3DDiePangolinsIcon().outerHTML}</span>`);
            text = text.replaceAll('DIE_PANGOLINS', `<span class="daleofmerchants-log-span">${DaleIcons.get3DDiePangolin1Icon().outerHTML}${DaleIcons.get3DDiePangolin2Icon().outerHTML}</span>`);
        }
        if (text.includes('DIE_PANGOLIN1')) {
            text = text.replaceAll('DIE_PANGOLIN1', `<span class="daleofmerchants-log-span">${DaleIcons.get3DDiePangolin1Icon().outerHTML}</span>`);
        }
        if (text.includes('DIE_PANGOLIN2')) {
            text = text.replaceAll('DIE_PANGOLIN2', `<span class="daleofmerchants-log-span">${DaleIcons.get3DDiePangolin2Icon().outerHTML}</span>`);
        }
        if (text.includes('SOURCE')) {
            text = text.replaceAll('SOURCE', `<span style="color: var(--pangolin1); font-weight: bold;">${_("source")}</span>`);
        }
        if (text.includes('DESTINATION')) {
            text = text.replaceAll('DESTINATION', `<span style="color: var(--pangolin2); font-weight: bold;">${_("destination")}</span>`);
        }
        if (text.includes('COMET')) {
            text = text.replaceAll('COMET', `<span class="daleofmerchants-log-span">${DaleIcons.getCometIcon().outerHTML}</span>`);
        }
        if (text.includes('PLANET')) {
            text = text.replaceAll('PLANET', `<span class="daleofmerchants-log-span">${DaleIcons.getPlanetIcon().outerHTML}</span>`);
        }
        if (text.includes('STARS')) {
            text = text.replaceAll('STARS', `<span class="daleofmerchants-log-span">${DaleIcons.getStarsIcon().outerHTML}</span>`);
        }
        if (text.includes('COIN')) {
            text = text.replaceAll('COIN', `<span class="daleofmerchants-log-span">${DaleIcons.getCoinIcon().outerHTML}</span>`);
        }
        if (text.includes('DAWN')) {
            text = text.replace(/\[DAWN(.|\n)*?\]/g, match => {
                return `<div class="daleofmerchants-tooltip-clock" data-clock="0">${match.replace(/\[|\]/g,'')}</div>`;
            });
            text = text.replaceAll('DAWN', `<span class="daleofmerchants-log-span">${DaleIcons.getDawnIcon().outerHTML}</span>`);
        }
        if (text.includes('DAY')) {
            text = text.replace(/\[DAY(.|\n)*?\]/g, match => {
                return `<div class="daleofmerchants-tooltip-clock" data-clock="1">${match.replace(/\[|\]/g,'')}</div>`;
            });
            text = text.replaceAll('DAY', `<span class="daleofmerchants-log-span">${DaleIcons.getDayIcon().outerHTML}</span>`);
        }
        if (text.includes('NIGHT')) {
            text = text.replace(/\[NIGHT(.|\n)*?\]/g, match => {
                return `<div class="daleofmerchants-tooltip-clock" data-clock="2">${match.replace(/\[|\]/g,'')}</div>`;
            });
            text = text.replaceAll('NIGHT', `<span class="daleofmerchants-log-span">${DaleIcons.getNightIcon().outerHTML}</span>`);
        }
        if (text.includes('CLOCK')) {
            text = text.replaceAll('CLOCK', `<span class="daleofmerchants-log-span">${DaleIcons.getClockIcon().outerHTML}</span>`);
        }
        return text;
    }

    /**
     * @param text text with keywords
     * @returns legend explaining the keywords from the `text`
     */
    private getLegend(text: string) {
        let legend = '';
        if (text.includes('DIE_OCELOT')) {
            legend += `${DaleDie.get3DDieTpl('ocelot')} <strong>:</strong> ${DaleDie.getAllFacesTpl('ocelot')}<br style="line-height: 10px" />`
        }
        if (text.includes('DIE_POLECAT')) {
            legend += `${DaleDie.get3DDieTpl('polecat')} <strong>:</strong> ${DaleDie.getAllFacesTpl('polecat')}<br style="line-height: 10px" />`
        }
        if (text.includes('DIE_HARE')) {
            legend += `${DaleDie.get3DDieTpl('hare')} <strong>:</strong> ${DaleDie.getAllFacesTpl('hare')}<br style="line-height: 10px" />`
        }
        if (text.includes('DIE_PANGOLIN1') || text.includes('DIE_PANGOLINS')) {
            legend += `${DaleDie.get3DDieTpl('pangolin1')} <strong>:</strong> ${DaleDie.getAllFacesTpl('pangolin1')}<br style="line-height: 10px" />`
        }
        if (text.includes('DIE_PANGOLIN2') || text.includes('DIE_PANGOLINS')) {
            legend += `${DaleDie.get3DDieTpl('pangolin2')} <strong>:</strong> ${DaleDie.getAllFacesTpl('pangolin2')}<br style="line-height: 10px" />`
        }
        if (text.includes(_('Acquire')) || text.includes(_('acquire'))) {
            legend += '<strong> ' + _('Acquire') + ' : </strong> ' + 
            _('If Mono played a Mono card with the acquire keyword and Mono has more stacks than you, it prioritises the market action.')
            +'<br><br style="line-height: 10px" />';
        }
        if (text.includes(_('Store')) || text.includes(_('store'))) {
            legend += '<strong> ' + _('Store') + ' : </strong> ' + 
            _('At the start of your next turn, place stored cards into your hand.')
            +'<br><br style="line-height: 10px" />';
        }
        if (text.includes(_('Toss')) || text.includes(_('toss'))) {
            legend += '<strong> ' + _('Toss') + ' : </strong> ' + 
            _('Tossed animalfolk cards are placed in the bin. Tossed junk cards are removed from the game.')
            + (DaleCard.page!.is_solo ? ' '+_('Tossed Mono cards are placed on Mono\'s discard.') : '')
            +'<br><br style="line-height: 10px" />';
        }
        if (text.includes(_('Finish')) || text.includes(_('finish'))) {
            legend += '<strong> ' + _('Finish') + ' : </strong> ' + 
            _('Resolve any effects in the card text that precede finish. During your action phase, you may spend the amount listed after finish to continue resolving the card.')
            +'<br><br style="line-height: 10px" />';
        }
        if (text.includes(_('Spend')) || text.includes(_('spend')) || text.includes(_('Finish')) || text.includes(_('finish'))) {
            legend += '<strong> ' + _('Spend') + ' : </strong> ' + 
            DaleCard.format_string(_('You must first pay the amount listed after spend in any combination of cards from your hand and acquired gold COIN.'))
            +'<br><br style="line-height: 10px" />';
        }
        if (text.includes('CLOCK')) {
            legend += `<span class="daleofmerchants-log-span">${DaleIcons.getClockIcon().outerHTML}</span> <strong>:</strong> `
            legend += _("a clock that tracks the");
            legend += ` ${PlayerClock.getClockLabelAndIconTpl(0)}, ${PlayerClock.getClockLabelAndIconTpl(1)} `+_("and")+` ${PlayerClock.getClockLabelAndIconTpl(2)}`;
            legend += '<br><br style="line-height: 10px" />';
        }
        if (text.includes(_('Copy')) || text.includes(_('copy'))) {
            legend += '<strong> ' + _('Copy') + ' : </strong> ' + 
            _('During your action phase, this card may become an identical copy of one valid card for all purposes of play.')
            //_('A passive chameleon card <strong>you use</strong> is an identical copy of one valid card for all purposes of play. If there is a valid card, you <strong>must</strong> copy it before using the chameleon card.')
            +'<br><br style="line-height: 10px" />';
        }
        return legend;
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
        else if (
            (DaleCard.page!.isCurrentPlayerActive() && card_div.dataset['location'] == 'stock') ||
            (card_div.dataset['location'] == 'moving') ||
            (((DaleCard.page as any)!.mono_hand_is_visible && card_div.id.includes("limbo")))
        ) {
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
            if (value > this.original_value) {
                value_div.classList.add("daleofmerchants-effective-value-high");
                value_div.classList.remove("daleofmerchants-effective-value-low");
            }
            else {
                value_div.classList.remove("daleofmerchants-effective-value-high");
                value_div.classList.add("daleofmerchants-effective-value-low");
            }
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
     * @param parent_id (optional) - if specified, the div will be immediately be "attached" to the parent
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
    public static of(card: DbCard | DaleCard) {
        if (card instanceof DaleCard) {
            return card
        }
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
