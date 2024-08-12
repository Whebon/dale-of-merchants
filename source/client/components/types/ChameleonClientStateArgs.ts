import { DaleCard } from "../DaleCard";
import { DaleStock } from "../DaleStock";
import { Pile } from "../Pile";
import { DaleLocation } from "./DaleLocation";

/**
 * Holds arguments for a chameleon client state
 */
export class ChameleonClientStateArgs {
	public card: DaleCard;
	public location: DaleLocation;
	public callback: (card?: DaleCard) => void;
    public requiresPlayable: boolean;
    public selection: number[] | undefined;
    public isChain: boolean;

    /**
     * Bundles arguments for a chameleon client state 
     * @param card the chameleon card that needs to get bound (it needs be highlighted while selecting a valid target for it)
     * @param from points to where the card is located
     * @param callback callback method to execute after the chameleon has been bound
     * @param requiresPlayable (optional) default false. If true, the card to copy must be playable
     * @param saveSelection (optional) default false. If true, after copying, restored the saved selection
     */
    constructor(card: DaleCard, from: DaleLocation, callback: (card?: DaleCard) => void, requiresPlayable: boolean = false, isChain: boolean = false) {
        this.card = card;
        this.location = from;
        this.callback = callback;
        this.requiresPlayable = requiresPlayable;
        this.isChain = isChain;
    }

    public selectChameleonCard() {
        let card_div = undefined;
		if (this.location instanceof DaleStock) {
			card_div = $(this.location.control_name + "_item_" + this.card.id) as (HTMLElement | null);
		}
        else if (this.location instanceof Pile) {
            card_div = this.location.getPopinCardDiv(this.card.id);
            this.location.topCardHTML.classList.add("chameleon-selected"); //TODO: keep this?
        }
        card_div?.classList.add("chameleon-selected");
    }

    public unselectChameleonCard() {
        let card_div = undefined;
		if (this.location instanceof DaleStock) {
			card_div = $(this.location.control_name + "_item_" + this.card.id) as (HTMLElement | null);
		}
        else if (this.location instanceof Pile) {
            card_div = this.location.getPopinCardDiv(this.card.id);
            this.location.topCardHTML.classList.remove("chameleon-selected"); //TODO: keep this?
        }
        card_div?.classList.remove("chameleon-selected");
    }
}

