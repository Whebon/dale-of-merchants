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
    public targets: HTMLElement[];
	public callback: (card?: DaleCard) => void;
    public requiresPlayable: boolean;
    public selection: number[] | undefined;
    public isChain: boolean;

    private line: SVGElement;
    private line_origin: HTMLElement;
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
    constructor(card: DaleCard, from: DaleLocation, targets: HTMLElement[], callback: (card?: DaleCard) => void, requiresPlayable: boolean = false, isChain: boolean = false) {
        this.card = card;
        this.location = from;
        this.targets = targets;
        this.callback = callback;
        this.requiresPlayable = requiresPlayable;
        this.isChain = isChain;
        this.line = $("dale-chameleon-line") as SVGLineElement;
        if (from instanceof DaleStock) {
            this.line_origin = $("dale-myhand_item_"+this.card.id) as HTMLElement;
        }
        else if (from instanceof Pile) {
            this.line_origin = from.topCardHTML;
        }
        else {
            this.line_origin = card.div;
        }
        
        //TODO: prevents from going into a client state if the chameleon has less than 2 targets
        if (this.targets.length < 2 && card.effective_type_id != DaleCard.CT_GOODOLDTIMES) {
            throw new Error(`Chameleon card only has ${this.targets.length} target(s)`)
        }
        for (let target of this.targets) {
            target.classList.add("dale-chameleon-target");
        }
        
        //set up the chameleon line
        const thiz = this;
        if (isChain) {
            thiz.line.classList.remove("dale-hidden");
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
        //dojo.setStyle(this.line_origin, 'z-index', '1001');
        // const dummyEvent = {
        //     pageX: thiz.line_origin.getBoundingClientRect().left + window.scrollX,
        //     pageY: thiz.line_origin.getBoundingClientRect().top + window.scrollY
        // } as MouseEvent;
        // this.updateLine.call(window, dummyEvent);
        // addEventListener("mousemove", this.updateLine);
        // this.updateLine.call(window, PrevMouseEvent.evt);

        // // Add a svg line for the chameleons
        // this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        // this.svg.setAttribute("width", "100%");
        // this.svg.setAttribute("height", "100%");

        // this.svg.style.position = "absolute";
        // this.svg.style.top = "0";
        // this.svg.style.left = "0";
        // this.line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        // this.line.setAttribute("x1", "0");
        // this.line.setAttribute("y1", "0");
        // this.line.setAttribute("x2", "50vw");
        // this.line.setAttribute("y2", "50vh");
        // this.line.setAttribute("style", "stroke:red;stroke-width:2");
        // this.svg.appendChild(this.line);
        // document.body.appendChild(this.svg);
    }

    public selectChameleonCard() {
        let card_div = undefined;
		if (this.location instanceof DaleStock) {
			card_div = $(this.location.control_name + "_item_" + this.card.id) as (HTMLElement | null);
		}
        else if (this.location instanceof Pile) {
            card_div = this.location.getPopinCardDiv(this.card.id);
            this.location.topCardHTML.classList.add("dale-chameleon-selected"); //TODO: keep this?
        }
        card_div?.classList.add("dale-chameleon-selected");
    }

    public unselectChameleonCard() {
        let card_div = undefined;
		if (this.location instanceof DaleStock) {
			card_div = $(this.location.control_name + "_item_" + this.card.id) as (HTMLElement | null);
		}
        else if (this.location instanceof Pile) {
            card_div = this.location.getPopinCardDiv(this.card.id);
            this.location.topCardHTML.classList.remove("dale-chameleon-selected"); //TODO: keep this?
        }
        card_div?.classList.remove("dale-chameleon-selected");
    }

    /**
     * Removes the chameleon svg line
     */
    public remove() {
        for (let target of this.targets) {
            target.classList.remove("dale-chameleon-target");
        }
        this.line_origin.classList.remove("dale-z-index-above-svg")
        this.line.classList.add("dale-hidden");
        removeEventListener("mousemove", this.updateLine);
    }
}

