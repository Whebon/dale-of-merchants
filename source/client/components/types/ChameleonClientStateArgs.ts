import { DaleCard } from "../DaleCard";
import { DaleStock } from "../DaleStock";
import { Images } from "../Images";
import { Pile } from "../Pile";
import { DaleLocation } from "./DaleLocation";

/**
 * Holds arguments for a chameleon client state
 */
export class ChameleonClientStateArgs {
	public card: DaleCard;
	public location: DaleLocation;
    public targets: DaleCard[];
	public callback: (card?: DaleCard) => void;
    public requiresPlayable: boolean;
    public selection: number[] | undefined;
    public isChain: boolean;

    public line_origin: HTMLElement;
    private line: SVGElement;
    private updateLine: (this: Window, ev: MouseEvent) => any;

    /**
     * Bundles arguments for a chameleon client state 
     * @param card the chameleon card that needs to get bound (it needs be highlighted while selecting a valid target for it)
     * @param from points to where the card is located
     * @param targets html elements that represent valid targets for this chameleon
     * @param callback callback method to execute after the chameleon has been bound
     * @param requiresPlayable (optional) default false. If true, the card to copy must be playable
     * @param saveSelection (optional) default false. If true, after copying, restored the saved selection
     */
    constructor(card: DaleCard, from: DaleLocation, targets: DaleCard[], callback: (card?: DaleCard) => void, requiresPlayable: boolean = false, isChain: boolean = false) {
        this.card = card;
        this.location = from;
        this.targets = targets;
        this.callback = callback;
        this.requiresPlayable = requiresPlayable;
        this.isChain = isChain;
        this.line = $("dale-chameleon-line") as SVGLineElement;
        if (from instanceof Pile) {
            //in case of a pile, create a dummy div on top of the pile, to indicate that this card is in the pile
            this.line_origin = card.toDiv();
            this.line_origin.classList.add("dale-chameleon-selected");
            this.line_origin.classList.add("dale-clickable");
            from.placeholderHTML.appendChild(this.line_origin);
        }
        else {
            this.line_origin = card.div;
        }
        // if (from instanceof DaleStock) {
        //     this.line_origin = $("dale-myhand_item_"+this.card.id) as HTMLElement;
        // }
        // else if (from instanceof Pile) {
        //     this.line_origin = from.topCardHTML;
        // }
        // else {
        //     this.line_origin = card.div;
        // }
        
        //prevent entering a chameleon state if the chameleon has 0 targets
        if (this.targets.length == 0 && card.effective_type_id != DaleCard.CT_GOODOLDTIMES) {
            throw new Error(`Attempting to enter a chameleon state, but the chameleon card only has 0 targets`)
        }
        for (let target of this.targets) {
            console.log("add chameleon target");
            console.log(target.div);
            target.div.classList.add("dale-chameleon-target");
        }
        
        //set up the chameleon line
        const thiz = this;
        if (isChain) {
            thiz.line.classList.remove("dale-hidden"); //line is already at the correct position
        }
        else {
            thiz.line.classList.add("dale-hidden"); //mouse event for the first frame is unknown
        }
        this.updateLine = function(this: Window, evt: MouseEvent) {
            thiz.line.classList.remove("dale-hidden");
            const rect = thiz.line_origin.getBoundingClientRect();
            const x1 = evt.pageX;
            const y1 = evt.pageY
            const x2 = rect.left + window.scrollX + Images.CARD_WIDTH_S/2;
            const y2 = rect.top + window.scrollY + Images.CARD_HEIGHT_S/2;;
            thiz.line.setAttribute("x1", String(x1));
            thiz.line.setAttribute("y1", String(y1));
            thiz.line.setAttribute("x2", String(x2));
            thiz.line.setAttribute("y2", String(y2));
        }
        addEventListener("mousemove", this.updateLine);
        this.line_origin.classList.add("dale-z-index-above-svg")
    }

    public selectChameleonCard() {
        this.line_origin.classList.add("dale-chameleon-selected");
        
        //TODO: safely delete this
        // let card_div = undefined;
		// if (this.location instanceof DaleStock) {
		// 	card_div = $(this.location.control_name + "_item_" + this.card.id) as (HTMLElement | null);
		// }
        // else if (this.location instanceof Pile) {
        //     card_div = this.location.getPopinCardDiv(this.card.id);
        //     this.location.topCardHTML.classList.add("dale-chameleon-selected"); //TODO: keep this?
        // }
        // card_div?.classList.add("dale-chameleon-selected");
    }

    public unselectChameleonCard() {
        this.line_origin.classList.remove("dale-chameleon-selected");

        //TODO: safely delete this
        // let card_div = undefined;
		// if (this.location instanceof DaleStock) {
		// 	card_div = $(this.location.control_name + "_item_" + this.card.id) as (HTMLElement | null);
		// }
        // else if (this.location instanceof Pile) {
        //     card_div = this.location.getPopinCardDiv(this.card.id);
        //     this.location.topCardHTML.classList.remove("dale-chameleon-selected"); //TODO: keep this?
        // }
        // card_div?.classList.remove("dale-chameleon-selected");
    }

    /**
     * Removes the chameleon svg line
     */
    public remove() {
        for (let target of this.targets) {
            target.div.classList.remove("dale-chameleon-target");
        }
        this.line_origin.classList.remove("dale-z-index-above-svg");
        if (this.location instanceof Pile) {
            this.line_origin.remove(); //delete the dummy
            this.location.openPopin();
        }
        this.line.classList.add("dale-hidden");
        removeEventListener("mousemove", this.updateLine);
    }
}

