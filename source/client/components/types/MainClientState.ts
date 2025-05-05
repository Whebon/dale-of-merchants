import Gamegui = require('ebg/core/gamegui');
import { DaleCard } from '../DaleCard';

class ServerState {}
class PreviousState {
    constructor(
        public name: keyof ClientGameStates,
        public args?: ClientGameStates[keyof ClientGameStates]
    ) {}
}


/**
 * Main client state with arguments
 */
export class MainClientState {
    private _page: Gamegui;
	private _name: keyof ClientGameStates;
    private _args: ClientGameStates[keyof ClientGameStates];
    private _stack: (PreviousState | ServerState)[];
    private leaveThis: ()=>void;

    constructor(page: Gamegui) {
        this._page = page;
        this._name = 'client_technique';
        this._args = {};
        this._stack = [];
        this.leaveThis = this.leave.bind(this);
    }

    public get name(): keyof ClientGameStates {
        return this._name;
    }

    public get args(): ClientGameStates[keyof ClientGameStates] {
        // if (Object.keys(this._args).length == 0) {
        //     throw new Error(`Client state ${this._name} has no args`);
        // }
        return this._args;
    }

    public getArgs<K extends keyof ClientGameStates>(): ClientGameStates[K] {
        return this._args as ClientGameStates[K];
    }

    /**
     * Returns only the `spend_coins` and `spend_card_ids` args from the current client state.
     */
    public getSpendArgs<K extends keyof ClientGameStates>(): ClientTechniqueChoice['client_spend'] {
        if (!('spend_coins' in this._args && 'spend_card_ids' in this._args)) {
            console.warn(this._stack);
            console.warn(this._args);
            throw new Error(`getSpendArgs requires state '${this._name}' to have keys 'spend_coins' and 'spend_card_ids'`)
        }
        return {
            spend_coins: this._args.spend_coins as number,
            spend_card_ids: this._args.spend_card_ids as number[]
        }
    }

    private get _descriptionmyturn() {
        switch(this._name) {
            //Main client states
            case 'client_technique':
                return _("${you} must play a technique, purchase, build, or");
            case 'client_purchase':
                return _("${you} must pay ${cost} for ${card_name}");
            case 'client_build':
                return _("${you} must select cards to build in stack ${stack_index_plus_1}");
            case 'client_inventory':
                return _("${you} must select any number of cards to discard");
            
            //Optional purchase states
            case 'client_essentialPurchase':
                return _("Essential Purchase: ${you} may <stronger>ditch</stronger> up to 3 selected junk cards");
            case 'client_glue':
                return _("Glue: ${you} may keep Glue in your hand");
            
            //Chameleon states
            case 'chameleon_flexibleShopkeeper':
                return _("Flexible Shopkeeper: ${you} must copy a card from your rightmost stack");
            case 'chameleon_reflection':
                return _("Reflection: ${you} must copy a card from the top of another player's discard pile")
            case 'chameleon_goodoldtimes':
                switch ((this._args as ClientGameStates['chameleon_goodoldtimes']).mode) {
                    case 'copy':
                        return _("Good Old Times: ${you} must copy the bin's top card");
                    case 'ditchOrCopy':
                        return _("Good Old Times: ${you} must copy the bin's top card or ditch the supply's top card");
                    case 'ditchOptional':
                        return _("Good Old Times: ${you} may ditch the supply's top card");
                    case 'ditchMandatory':
                        return _("Good Old Times: ${you} must ditch the supply's top card");
                    default:
                        throw new Error("Unexpected CT_GOODOLDTIMES mode");
                }
            case 'chameleon_trendsetting':
                return _("Trendsetting: ${you} must copy a card in the market");
            case 'chameleon_seeingdoubles':
                return _("Seeing Doubles: ${you} must copy another card in your hand");
            
            //Generic passive states
            case 'client_choicelessPassiveCard':
                return _("${card_name}: ${you} may use this card's ability");
            case 'client_selectOpponentPassive':
                return _("${card_name}: ${you} must choose an opponent"); //e.g. cunning neighbour
            
            //Specific passive states
            case 'client_marketDiscovery':
                return _("${card_name}: ${you} may <strong>ditch</strong> the supply's top card or purchase the bin's top card");
            case 'client_calculations':
                return _("${card_name}: ${you} may rearrange any cards in the market");
            case 'client_sliceoflife':
                return _("${card_name}: ${you} must choose 2 cards to discard");
            case 'client_barricade':
                if((this._args as ClientGameStates['client_barricade']).nbr_junk == 0) {
                    return _("${card_name}: Are you sure you want to use this passive ability without any effects?");
                } else {
                    return _("${card_name}: ${you} may search your discard pile for up to ${nbr_junk} junk cards");
                }
            
            //Generic technique states
            case 'client_fizzle':
                return _("${card_name}: Are you sure you want to play this technique without any effects?");
            case 'client_triggerFizzle':
                return _("${card_name}: Are you sure you want to resolve this technique without any effects?");
            case 'client_selectOpponentTechnique':
                return _("${card_name}: ${you} must choose an opponent"); //e.g. sabotage
            case 'client_choicelessTechniqueCard':
                return _("${card_name}: ${you} may play this card as a technique");
            case 'client_choicelessTriggerTechniqueCard':
                return _("${card_name}: ${you} must resolve this technique");
            case 'client_spend':
                return _("${card_name}: ${you} must <stronger>spend</stronger> ${cost}");
            case 'client_spendx':
                return _("${card_name}: ${you} must <stronger>spend</stronger> ${cost_displayed}");
            case 'client_stove':
                return _("${card_name}: ${you} may <stronger>spend</stronger> x to change this card's value");

            //Specific technique states
            case 'client_swiftBroker':
                return _("${card_name}: ${you} may choose the order to discard your hand");
            case 'client_shatteredRelic':
                return _("${card_name}: ${you} must choose a card to <stronger>ditch</stronger>");
            case 'client_acorn':
                return _("${card_name}: ${you} must choose a card from an opponent's stall to swap with");
            case 'client_giftVoucher':
                return _("${card_name}: ${you} must choose a card from the market to swap with");
            case 'client_loyalPartner':
                return _("${card_name}: ${you} may choose to <stronger>ditch</stronger> any number of cards from the market");
            case 'client_prepaidGood':
                return _("${card_name}: ${you} must choose a card from the market");
            case 'client_nuisance':
                return _("${card_name}: ${you} must choose 1-2 opponent(s)");
            case 'client_rottenFood':
                return _("${card_name}: ${you} must choose a card to place on another player\'s deck");
            case 'client_dirtyExchange':
                return _("${card_name}: ${you} must choose an opponent to take a card from");
            case 'client_treasureHunter':
                return _("${card_name}: ${you} must take a card from an opponent's discard pile");
            case 'client_newSeason':
                return _("${card_name}: ${you} must <stronger>ditch</stronger> an animalfolk card from your discard pile");
            case 'client_deprecated_whirligig':
                if ((this._page as any).unique_opponent_id) {
                    return _("${card_name}: ${you} may choose the order to discard your hand");
                } else {
                    return _("${card_name}: ${you} must choose an opponent"); //omitted, but true: you may also choose the order to discard your hand
                }
            case 'client_whirligig':
                return _("${card_name}: ${you} must choose another player to swap cards with");
            case 'client_gamble':
                return _("${card_name}: ${you} must choose an opponent");
            case 'client_blindfold':
                if ((this._page as any).unique_opponent_id) {
                    return _("${card_name}: ${you} must choose a card");
                } else {
                    return _("${card_name}: ${you} must choose a card and an opponent");
                }
            case 'client_safetyPrecaution':
                return _("${card_name}: ${you} must choose a card from your stall to swap with");
            case 'client_shoppingJourney':
                return _("${card_name}: ${you} must choose a card from the market");
            case 'client_houseCleaning':
                if((this._args as ClientGameStates['client_houseCleaning']).nbr_junk == 0) {
                    return _("${card_name}: ${you} may schedule this technique without immediate effects");
                } else {
                    return _("${card_name}: ${you} may search your discard pile for up to ${nbr_junk} junk cards");
                }
            case 'client_houseCleaningDitch':
                return _("${card_name}: ${you} may <stronger>ditch</stronger> a card from your hand");
            case 'client_siesta':
                return _("${card_name}: ${you} must take a card from your discard pile");
            case 'client_ruthlessCompetition':
                return _("${card_name}: ${you} must draw a card from an opponent\'s deck");
            case 'client_raffle':
                return _("${card_name}: ${you} take a card from");
            case 'client_deprecated_tasters':
                return _("${card_name}: ${you} must choose who takes a card from the market directly after you");
            case 'client_rareArtefact':
                return _("${card_name}: ${you} must choose a card to multiply its value");
            case 'client_swank':
                return _("${card_name}: ${you} must choose a card to <stronger>ditch</stronger>");
            case 'client_riskyBusiness':
                return _("${card_name}: ${you} must guess the top card's value from the supply");
            case 'client_historyLesson':
                return _("${card_name}: ${you} may select up to 3 cards from the top of your discard pile");
            case 'client_replacement':
                return _("${card_name}: ${you} must choose an animalfolk card to <stronger>ditch</stronger>");
            case 'client_replacementFizzle':
                return _("${card_name}: Are you sure you want to ditch '${ditch_card_name}'? The market has no valid replacement for this card");
            case 'client_fashionHint':
                return _("${card_name}: ${you} may <stronger>ditch</stronger> a card from the supply");
            case 'client_pompousProfessional':
                return _("${card_name}: ${you} must choose an animalfolk set");
            case 'client_burglaryOpponentId':
                return _("${card_name}: ${you} must choose an opponent");
            case 'client_burglaryValue':
                return _("${card_name}: ${you} must guess the value of the top card of ${opponent_name}\'s deck");
            case 'client_graspOpponentId':
                return _("${card_name}: ${you} must choose an opponent");
            case 'client_graspValue':
                return _("${card_name}: ${you} must guess the value of a card from ${opponent_name}\'s hand");
            case 'client_periscopeOpponentId':
                return _("${card_name}: ${you} must choose an opponent");
            case 'client_periscopeAnimalfolkId':
                return _("${card_name}: ${you} must choose an animalfolk set");
            case 'client_periscopeValue':
                return _("${card_name}: ${you} must choose a value");
            case 'client_suddenNap':
                return _("${card_name}: ${you} must choose an opponent");
            case 'client_carefreeSwapper':
                return _("${card_name}: ${you} must swap this card with a card from another player's discard pile");
            case 'client_velocipede':
                return _("${card_name}: ${you} must choose a card from any stall to swap with");
            case 'client_matchingColours':
                return _("${card_name}: ${you} must swap an animalfolk from your hand with a card of equal value from an opponent's stall");
            case 'client_cleverGuardian':
                return _("${card_name}: ${you} must choose a card to <stronger>store</stronger>");
            case 'client_meddlingMarketeer':
                return _("${card_name}: ${you} may choose the order to place cards on top of your deck");
            case 'client_goodwillpresents':
                return _("${card_name}: ${you} must choose 1-2 players");
            case 'client_alternativePlan':
                return _("${card_name}: ${you} must ditch a card from your discard pile");
            case 'client_anchor':
                return _("${card_name}: ${you} may choose the order to place cards on top of your deck");
            case 'client_manufacturedJoy':
                return _("${card_name}: ${you} must place a card on any player\'s discard pile");
            case 'client_shakyEnterprise':
                return _("${card_name}: ${you} must take any of the top 3 cards of your discard pile");
            case 'client_cache':
                return _("${card_name}: ${you} must take 1 card from your discard pile");
            case 'client_groundbreakingIdea':
                return _("${card_name}: ${you} must choose a card to <stronger>ditch</stronger>");
            case 'client_badOmen':
                return _("${card_name}: ${you} may choose the order to place cards on top of your deck");
        }
        return "MISSING DESCRIPTION";
    }

    /**
     * Leave the client state
     */
    public leaveAndDontReturn() {
        const previous = this._stack.pop();
        this._name = 'client_technique';
        this._args = {};
        if (previous instanceof PreviousState) {
            this._name = previous.name;
            if (previous.args) {
                this._args = previous.args;
            }
        }
    }

    /**
     * Leave the client state and return to the previous client state
     */
    public leave() {
        const previous = this._stack.pop();
        this.setPassiveSelected(false);
        this._name = 'client_technique';
        this._args = {};
        if (previous instanceof ServerState) {
            this._page.restoreServerGameState();
        }
        else if (previous instanceof PreviousState) {
            this.enter(previous.name, previous.args);
        }
        else {
            this.enter('client_technique');
        }
    }

    /**
     * Leave all client states and return to the default client state
     */
    public leaveAll() {
        while (this._stack.length > 0) {
            this.leave(); //see issue #97.2 and #97.3
        }
        this.enter('client_technique');
    }

    /**
     * Replace the current client state
     * @param name (optional) if provided, switch to the given client state. Otherwise, use the previously set client state
     * @param args (optional) if provided, pass arguments to the client state
     */
    public enter<K extends keyof ClientGameStates>(name?: K, args?: ClientGameStates[K]) {
        if (name) {
            this._name = name;
        }
        if (args) {
            if ('technique_card_id' in args) {
                args = {
                    card_name: new DaleCard(args.technique_card_id).name,
                    ...args, 
                }
            }
            if ('passive_card_id' in args) {
                args = {
                    card_name: new DaleCard(args.passive_card_id).name,
                    ...args, 
                }
            }
            this._args = args ?? {} as ClientGameStates[K];
        }
        this.setPassiveSelected(true);
        this._page.setClientState(this._name, {
            descriptionmyturn: this._descriptionmyturn,
            args: this._args
        })
    }

    /**
     * Push a copy of the current client state on the stack, then replace the current client state
     * @param name name of the client state
     * @param args (optional) if provided, pass arguments to the client state
     * `disable_cancel_on_click` only affects passive cards and disables the feature that clicking that passive card cancels the passive client state
     */
    public enterOnStack<K extends keyof ClientGameStates>(name: K, args?: ClientGameStates[K] & { disable_cancel_on_click?: true }) {
        if (this._page.checkLock()) {
            if (this._page.gamedatas.gamestate.name == this._name) {
                this._stack.push(new PreviousState(this._name, this._args));
            }
            else {
                this._stack.push(new ServerState());
            }
            this.enter(name, args);
        }
    }

    /**
     * @return true if the client state stack is empty
     */
    public isStackEmpty() {
        return this._stack.length == 0;
    }

    public stackIncludes<K extends keyof ClientGameStates>(name: K): boolean {
        if (this.name == name || this._page.gamedatas.gamestate.name == name) {
            return true;
        }
        for (let state of this._stack) {
            if (state instanceof PreviousState) {
                if (state.name == name) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * (de)select the current passive card
     */
    public setPassiveSelected(enable: boolean) {
        console.warn("setPassiveSelected", enable, this._args);
        if ('passive_card_id' in this._args) {
            const div = DaleCard.divs.get(this._args.passive_card_id);
            const cancelOnCardClick = (this._name != 'client_spend' && this._name != 'client_spendx' && this._name != 'client_stove' && !('disable_cancel_on_click' in this._args));
            if (div) {
                if (enable) {
                    div.classList.add("daleofmerchants-passive-selected");
                    if (cancelOnCardClick) {
                        div.addEventListener('click', this.leaveThis);
                    }
                }
                else {
                    div.classList.remove("daleofmerchants-passive-selected");
                    if (cancelOnCardClick) {
                        div.removeEventListener('click', this.leaveThis);
                    }
                }
            }
        }
    }
}

