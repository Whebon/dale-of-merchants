import Gamegui = require('ebg/core/gamegui');

/**
 * Main non-chameleon client state with arguments
 */
export class MainClientState {
    private page: Gamegui;
	public name: keyof ClientGameState;
    public descriptionmyturn: string;
    public args: ClientGameState[keyof ClientGameState];

    public static readonly DESCRIPTIONS: Map<keyof ClientGameState, string> = new Map<keyof ClientGameState, string>([
        ['client_technique', _("asdsad")]
    ])

    constructor(page: Gamegui) {
        this.page = page;
        this.name = 'client_technique';
        this.descriptionmyturn = "";
        this.args = {};
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
        this.args = args ?? {} as ClientGameState[K];
        this.page.setClientState(this.name, {
            descriptionmyturn: MainClientState.DESCRIPTIONS.get(this.name) ?? _("<missing client state description>")
        })
    }
}

