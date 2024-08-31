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

    private get _descriptionmyturn() {
        switch(this._name) {
            //Main Client States
            case 'client_technique':
                return _("${you} must play a technique, purchase, build, or");
            case 'client_purchase':
                return _("${you} must pay ${cost} for ${card_name}");
            case 'client_build':
                return _("${you} must select cards to build in stack ${stack_index_plus_1}");
            case 'client_inventory':
                return _("${you} must select any number of cards to discard");
            case 'client_essentialPurchase':
                return _("${you} may <stronger>ditch</stronger> up to 3 selected junk cards");
            
            //Chameleon States
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
                }
                break;
            case 'chameleon_trendsetting':
                return _("Trendsetting: ${you} must copy a card in the market");
            case 'chameleon_seeingdoubles':
                return _("Seeing Doubles: ${you} must copy another card in your hand");
            
            //Generic Passive States
            case 'client_choicelessPassiveCard':
                return _("${card_name}: ${you} may use this card's ability");
            
            //Specific Passive States
            case 'client_marketDiscovery':
                return _("${card_name}: ${you} may <strong>ditch</strong> the supply's top card or purchase the bin's top card");
            
            //Generic Technique States
            case 'client_fizzle':
                return _("${card_name}: Are you sure you want to play this technique without any effects?");
            case 'client_choicelessTechniqueCard':
                return _("${card_name}: ${you} may play this card as a technique");

            //Specific Technique States
            case 'client_swiftBroker':
                return _("${card_name}: ${you} may choose the order to discard your hand");
            case 'client_shatteredRelic':
                return _("${card_name}: ${you} must <stronger>ditch</stronger> a card from your hand");
            case 'client_acorn':
                return _("${card_name}: ${you} must select a card from an opponent's stall to swap with");
            case 'client_giftVoucher':
                return _("${card_name}: ${you} must select a card from the market to swap with");
            case 'client_loyalPartner':
                return _("${card_name}: ${you} may choose the order to <stronger>ditch</stronger> all cards from the market");
            case 'client_prepaidGood':
                return _("${card_name}: ${you} must choose a card from the market");
        }
        return "MISSING DESCRIPTION";
    }

    /**
     * Leave the client state and return to the previous client state
     */
    public leave() {
        const previous = this._stack.pop();
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
     * Cancel all client states and return to the default client state
     */
    public cancelAll() {
        this._stack = [];
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
        this.setPassiveSelected(false);
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
     */
    public enterOnStack<K extends keyof ClientGameStates>(name: K, args?: ClientGameStates[K]) {
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

    /**
     * (de)select the current passive card
     */
    public setPassiveSelected(enable: boolean) {
        if ('passive_card_id' in this._args) {
            const div = new DaleCard(this._args.passive_card_id).div;
            if (div) {
                if (enable) {
                    div.classList.add("dale-passive-selected");
                    div.addEventListener('click', this.leaveThis);
                }
                else {
                    div.classList.remove("dale-passive-selected");
                    div.removeEventListener('click', this.leaveThis);
                }
            }
        }
    }
}

