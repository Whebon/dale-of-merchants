import Gamegui = require('ebg/core/gamegui');

/**
 * Main non-chameleon client state with arguments
 */
export class MainClientState {
    private page: Gamegui;
	public name: keyof ClientGameState;
    public descriptionmyturn: string;
    private _args: ClientGameState[keyof ClientGameState];
    constructor(page: Gamegui) {
        this.page = page;
        this.name = 'client_technique';
        this.descriptionmyturn = "";
        this._args = {};
    }

    public get args(): ClientGameState[keyof ClientGameState] {
        if (Object.keys(this._args).length == 0) {
            throw new Error(`Client state ${this.name} has no args`);
        }
        return this._args;
    }

    public getDescription(state: keyof ClientGameState) {
        switch(state) {
            case 'client_technique':
                return _("${you} must (a) purchase a card, (b) play a technique, (c) build a stack, or (d) take an inventory action");
            case 'client_purchase':
                return _("${you} must pay ${cost} for ${card_name}");
            case 'client_build':
                return _("${you} must select cards to build in stack ${stack_index_plus_1}");
            case 'client_inventory':
                return _("${you} must discard any number of cards");
        }
        return "MISSING DESCRIPTION"
    }

    /**
     * Exit the client state and return to the default client state
     */
    public exit() {
        this.enterClientState('client_technique');
    }

    /**
     * Enter the current client state
     * @param name (optional) if provided, switch to the given client state. Otherwise, use the previously set client state
     * @param args (optional) if provided, pass arguments to the client state
     */
    public enterClientState<K extends keyof ClientGameState>(name?: K, args?: ClientGameState[K]) {
        if (name) {
            this.name = name;
        }
        if (args) {
            this._args = args ?? {} as ClientGameState[K];
        }
        this.page.setClientState(this.name, {
            descriptionmyturn: this.getDescription(this.name),
            args: args
        })
    }
}

