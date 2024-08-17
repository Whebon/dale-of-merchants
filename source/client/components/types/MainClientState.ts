import Gamegui = require('ebg/core/gamegui');

/**
 * Main non-chameleon client state with arguments
 */
export class MainClientState {
    private page: Gamegui;
	public name: keyof ClientGameState;
    public descriptionmyturn: string;
    private _args: ClientGameState[keyof ClientGameState];

    public static readonly DESCRIPTIONS: Map<keyof ClientGameState, string> = new Map<keyof ClientGameState, string>([
        ['client_technique', _("asdsad")]
    ])

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
            descriptionmyturn: MainClientState.DESCRIPTIONS.get(this.name) ?? _("<missing client state description>")
        })
    }
}

