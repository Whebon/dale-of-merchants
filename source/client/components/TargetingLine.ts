import { DaleCard } from "./DaleCard";
import { Images } from "./Images";
import { Pile } from "./Pile";

type lineClass = "dale-line-chameleon" | "dale-line-technique";
type targetClass = "dale-line-target-chameleon" | "dale-line-target-technique";
type sourceClass = "dale-line-source-chameleon" | "dale-line-source-technique";

/**
 * Can be used to draw a svg lines
 */
export class TargetingLine {
    private static readonly targetingLines: TargetingLine[] = [];

    public static previousMouseEvent: MouseEvent | undefined;
    private svg: SVGSVGElement;
    private line: SVGElement;

    private sourceClass: sourceClass;
    private targetClass: targetClass;

    private cardDiv: HTMLElement;
    private targetDivs: HTMLElement[];
    private prevTarget: HTMLElement | undefined;
    
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
        this.cardDiv.classList.add("dale-line-source", this.sourceClass);
        this.onSource = () => {
            thiz.remove();
            onSource(finalSource);
        }
        this.cardDiv.addEventListener("click", this.onSource);

        //setup targets
        this.targetDivs = [];
        this.onTargets = [];
        for (let targetCard of targets) {
            targetCard.div.classList.add("dale-line-target", this.targetClass);
            this.targetDivs.push(targetCard.div);
            const finalTarget = targetCard;
            const finalOnTarget = () => {
                thiz.remove();
                onTarget(finalSource, finalTarget);
            }
            this.onTargets.push(finalOnTarget);
            targetCard.div.addEventListener("click", finalOnTarget);
        }

        //setup line
        let readjustments = 0;
        this.updateLine = function(this: Window, evt: MouseEvent) {
            const sourceRect = thiz.cardDiv.getBoundingClientRect();
            const x1 = sourceRect.left + window.scrollX + Images.CARD_WIDTH_S/2;
            const y1 = sourceRect.top + window.scrollY + Images.CARD_HEIGHT_S/2;
            const currTarget = evt.target as HTMLElement;
            let x2 = evt.pageX;
            let y2 = evt.pageY;
            if (currTarget != thiz.prevTarget) {
                readjustments = 0;
                thiz.prevTarget?.classList.remove("dale-line-source", thiz.sourceClass);
                thiz.prevTarget?.classList.add("dale-line-target", thiz.targetClass);
            }
            for (let targetCard of thiz.targetDivs) {
                if (currTarget == targetCard) {
                    //snap to new target
                    if (currTarget == thiz.prevTarget && readjustments >= 3) {
                        thiz.line.setAttribute("x1", String(x1));
                        thiz.line.setAttribute("y1", String(y1));
                        return;
                    }
                    readjustments += 1;
                    const targetRect = currTarget.getBoundingClientRect();
                    x2 = targetRect.left + window.scrollX + Images.CARD_WIDTH_S/2;
                    y2 = targetRect.top + window.scrollY + Images.CARD_HEIGHT_S/2;
                    targetCard.classList.add("dale-line-source", thiz.sourceClass);
                    targetCard.classList.remove("dale-line-target", thiz.targetClass);
                    thiz.prevTarget = currTarget;
                }
            }
            // console.log(currTarget);
            // console.log(`(${x1}, ${y1}) -> (${x2}, ${y2}))`);
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
        this.cardDiv.classList.remove("dale-line-source", this.sourceClass);
        this.cardDiv.removeEventListener("click", this.onSource);
        if (this.pile) {
            this.cardDiv.remove(); //delete the dummy
            this.pile.openPopin();
        }
        for (let i = 0; i < this.targetDivs.length; i++) {
            this.targetDivs[i]!.classList.remove("dale-line-source", this.sourceClass);
            this.targetDivs[i]!.classList.remove("dale-line-target", this.targetClass);
            this.targetDivs[i]!.removeEventListener("click", this.onTargets[i]!);
        }
        this.line.remove();
        removeEventListener("mousemove", this.updateLine);
        const index = TargetingLine.targetingLines.indexOf(this);
        if (index != -1) {
            TargetingLine.targetingLines.splice(index, 1);
        }
    }
    
    public static removeAll() {
        for (let line of TargetingLine.targetingLines.slice()) {
            line.remove();
        }
    }
}
