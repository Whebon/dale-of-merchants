import { DaleCard } from "../DaleCard";
import { DaleStock } from "../DaleStock";
import { MarketBoard } from "../MarketBoard";
import { Pile } from "../Pile";
import { Stall } from "../Stall";

/**
 * Holds arguments for a chameleon client state
 */
export class ChameleonClientStateArgs {
	public card: DaleCard;
	public location: Pile | DaleStock | MarketBoard | Stall;
	public callback: (card: DaleCard) => void;
    public requiresPlayable: boolean;
    public selection: number[] | undefined;

    /**
     * Bundles arguments for a chameleon client state 
     * @param card the chameleon card that needs to get bound (it needs be highlighted while selecting a valid target for it)
     * @param from points to where the card is located
     * @param callback callback method to execute after the chameleon has been bound
     * @param requiresPlayable (optional) default false. If true, the card to copy must be playable
     * @param saveSelection (optional) default false. If true, after copying, restored the saved selection
     */
    constructor(card: DaleCard, from: Pile | DaleStock | MarketBoard | Stall, callback: (card: DaleCard) => void, requiresPlayable: boolean = false, saveSelection: boolean = false) {
        this.card = card;
        this.location = from;
        this.callback = callback;
        this.requiresPlayable = requiresPlayable;
        //from instanceof DaleStock
        // if (saveSelection) {
        //     //restore selection
        //     console.log("restore selection");
        //     const selection = [...from.orderedSelectedCardIds];
        //     this.callback = (card: DaleCard) => {
        //         for (let card_id of selection) {
        //             from.selectItem(card_id);
        //         }
        //         from.orderedSelectedCardIds = selection;
        //         callback(card);
        //     }
        // }
    }

    /** Points to the card div representing this card */
	public get card_div(): HTMLElement | null {
		if (this.location instanceof DaleStock) {
			return $(this.location.control_name + "_item_" + this.card.id) as (HTMLElement | null);
		}
		console.error("Unexpected value for this.currentChameleonCardFrom");
        return null;
	}
}

