import { DaleCard } from "./DaleCard";
import { Images } from "./Images";
import { Pile } from "./Pile";

type lineClass = "dale-line-chameleon";
type targetClass = "dale-line-target-chameleon";
type sourceClass = "dale-line-source-chameleon";

/**
 * Can be used to draw a svg lines
 */
export class TargetingLine {
    public static readonly targetingLines: TargetingLine[] = [];
    public static previousMouseEvent: MouseEvent | undefined;
    private svg: SVGSVGElement;
    private line: SVGElement;

    private sourceClass: sourceClass;
    private targetClass: targetClass;

    private cardDiv: HTMLElement;
    private targetDivs: HTMLElement[];
    
    private pile: Pile | undefined;

    private updateLine: (this: Window, ev: MouseEvent) => any;
    private onSource: () => void;
    private onTargets: (() => void)[];

    /**
     * Creates a new "targeting line" selection mode, that allows selection from a `source` to 1 of the `targets`
     * @param source card that needs to find a target
     * @param targets potential target
     * @param sourceClass css class to give to the source
     * @param targetClass css class to give to the targets
     * @param lineClass css class to give to the line
     * @param onSource callback function when the source is clicked
     * @param onTarget callback function when a target is clicked
     * @param pile (optional) if provided, create a dummy source representing a card inside a pile
    */
    constructor(source: DaleCard, targets: DaleCard[], sourceClass: sourceClass, targetClass: targetClass, lineClass: lineClass, onSource: (source: DaleCard) => void, onTarget: (source: DaleCard, target: DaleCard) => void, pile?: Pile) {
        TargetingLine.targetingLines.push(this);
        this.svg = $("dale-svg-container")!.querySelector("svg")!;
        this.line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        this.line.classList.add(lineClass);
        this.svg.appendChild(this.line);
        this.sourceClass = sourceClass;
        this.targetClass = targetClass;
        const thiz = this;

        //setup source
        const finalSource = source;
        if (pile) {
            this.pile = pile;
            this.cardDiv = source.toDiv();
            this.pile.placeholderHTML.appendChild(this.cardDiv);
        }
        else {
            this.cardDiv = source.div;
        }
        this.cardDiv.classList.add("dale-line-node", this.sourceClass);
        this.onSource = () => {
            onSource(finalSource);
            thiz.remove();
        }
        this.cardDiv.addEventListener("click", this.onSource);

        //setup targets
        this.targetDivs = [];
        this.onTargets = [];
        for (let targetCard of targets) {
            targetCard.div.classList.add("dale-line-node", this.targetClass);
            this.targetDivs.push(targetCard.div);
            const finalTarget = targetCard;
            const finalOnTarget = () => {
                onTarget(finalSource, finalTarget);
                thiz.remove();
            }
            this.onTargets.push(finalOnTarget);
            targetCard.div.addEventListener("click", finalOnTarget);
        }

        //setup
        this.updateLine = function(this: Window, evt: MouseEvent) {
            const sourceRect = thiz.cardDiv.getBoundingClientRect();
            const x1 = sourceRect.left + window.scrollX + Images.CARD_WIDTH_S/2;
            const y1 = sourceRect.top + window.scrollY + Images.CARD_HEIGHT_S/2;
            const currTarget = evt.target as HTMLElement;
            if (thiz.targetDivs.includes(currTarget)) {
                //snap to target
                const targetRect = currTarget.getBoundingClientRect();
                var x2 = targetRect.left + window.scrollX + Images.CARD_WIDTH_S/2;
                var y2 = targetRect.top + window.scrollY + Images.CARD_HEIGHT_S/2;
            }
            else {
                x2 = evt.pageX;
                y2 = evt.pageY;
            }
            console.log(currTarget);
            console.log(`(${x1}, ${y1}) -> (${x2}, ${y2}))`);
            thiz.line.setAttribute("x1", String(x1));
            thiz.line.setAttribute("y1", String(y1));
            thiz.line.setAttribute("x2", String(x2));
            thiz.line.setAttribute("y2", String(y2));
        }
        addEventListener("mousemove", this.updateLine);
        if (TargetingLine.previousMouseEvent) {
            this.updateLine.call(window, TargetingLine.previousMouseEvent);
        }
    }
    
    /**
     * Removes the chameleon svg line
     */
    private remove() {
        this.cardDiv.classList.remove("dale-line-node", this.sourceClass);
        this.cardDiv.removeEventListener("click", this.onSource);
        if (this.pile) {
            this.cardDiv.remove(); //delete the dummy
            this.pile.openPopin();
        }
        for (let i = 0; i < this.targetDivs.length; i++) {
            this.targetDivs[i]!.classList.remove("dale-line-node", this.targetClass);
            this.targetDivs[i]!.removeEventListener("click", this.onTargets[i]!);
        }
        this.line.remove();
        removeEventListener("mousemove", this.updateLine);
        const index = TargetingLine.targetingLines.indexOf(this);
        if (index > -1) {
            TargetingLine.targetingLines.splice(index, 1);
        }
    }
}

