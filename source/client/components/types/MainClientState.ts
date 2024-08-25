import Gamegui = require('ebg/core/gamegui');

class PreviousState {
    constructor(
        public name: keyof ClientGameState,
        public args?: ClientGameState[keyof ClientGameState]
    ) {}
}

/**
 * Main client state with arguments
 */
export class MainClientState {
    private _page: Gamegui;
	private _name: keyof ClientGameState;
    private _args: ClientGameState[keyof ClientGameState];
    private _stack: PreviousState[];

    constructor(page: Gamegui) {
        this._page = page;
        this._name = 'client_technique';
        this._args = {};
        this._stack = [];
    }

    public get name(): keyof ClientGameState {
        return this._name;
    }

    public get args(): ClientGameState[keyof ClientGameState] {
        if (Object.keys(this._args).length == 0) {
            throw new Error(`Client state ${this._name} has no args`);
        }
        return this._args;
    }

    private get _descriptionmyturn() {
        switch(this._name) {
            //Main Client States
            case 'client_technique':
                return _("${you} must (a) purchase a card, (b) play a technique, (c) build a stack, or (d) take an inventory action");
            case 'client_purchase':
                return _("${you} must pay ${cost} for ${card_name}");
            case 'client_build':
                return _("${you} must select cards to build in stack ${stack_index_plus_1}");
            case 'client_inventory':
                return _("${you} must discard any number of cards");
            case 'client_essentialPurchase':
                return _("${you} may <stronger>ditch</stronger> up to 3 selected junk cards");
            //Chameleon States
            case 'chameleon_flexibleShopkeeper':
                return _("Flexible Shopkeeper: ${you} must copy a card from your rightmost stack");
            case 'chameleon_reflection':
                return _("Reflection: ${you} must copy a card from the top of another player's discard pile")
            case 'chameleon_goodoldtimes':
                if ((this._args as ClientGameState['chameleon_goodoldtimes']).passiveUsed) {
                    return _("Good Old Times: ${you} must copy the bin's top card");
                }
                else {
                    return _("Good Old Times: ${you} must copy the bin's top card or ditch the supply's top card");
                }
            case 'chameleon_trendsetting':
                return _("Trendsetting: ${you} must copy a card in the market");
            case 'chameleon_seeingdoubles':
                return _("Seeing Doubles: ${you} must copy another card in your hand");
            //Technique States
        }
        return "MISSING DESCRIPTION";
    }

    /**
     * Leave the client state and return to the previous client state
     */
    public leave() {
        const previous = this._stack.pop();
        if (previous) {
            this.enter(previous.name, previous.args);
        }
        else {
            //default client state
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
    public enter<K extends keyof ClientGameState>(name?: K, args?: ClientGameState[K]) {
        if (name) {
            this._name = name;
        }
        if (args) {
            this._args = args ?? {} as ClientGameState[K];
        }
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
    public enterOnStack<K extends keyof ClientGameState>(name: K, args?: ClientGameState[K]) {
        this._stack.push(new PreviousState(this._name, this._args));
        this.enter(name, args);
    }
}

