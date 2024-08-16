import Gamegui = require('ebg/core/gamegui');
import { DaleCard } from "./DaleCard";
import { OrderedSelection } from "./OrderedSelection";
import { Images } from './Images';

type ActionLabelClass = 'dale-technique' | 'dale-purchase' | 'dale-build' | 'dale-discard';
type HandSelectionMode = 'none' | 'single' | 'multiple'

/**
 * A Dale of Merchants Hand Component. Replaces the BGA Stock.
 */
export class DaleHand {
    private readonly actionLabelClasses = ['dale-technique', 'dale-purchase', 'dale-build', 'dale-discard'];

    private page: Gamegui;
    private wrap: HTMLElement;
    private container: HTMLElement;

    private selectionMode: HandSelectionMode = 'none';
    private orderedSelection: OrderedSelection = new OrderedSelection();

    constructor(page: Gamegui, wrap: Element, container: Element) {
        this.page = page;
        this.wrap = wrap as HTMLElement;
        this.container = container as HTMLElement;

        dojo.setStyle(wrap, 'min-height', Images.CARD_WIDTH_S+'px');

        this.addCard(new DaleCard(1000, 0));
        this.addCard(new DaleCard(1001, 1));
        this.addCard(new DaleCard(1002, 2));
    }

    /** 
	 * Add a `DaleCard` to hand
	 * @param card card to add
	 * @param from The element to animate the item from. When the `from` parameter is specified, the item will be created at the location of the from element and animate to the stock. The location create is always an absolute position at the top left of the from div. This is optional and can be used to animate the item from a specific location on the page. If this is not specified, the item will be created and placed immediately inside the stock.
	*/
    public addCard(card: DaleCard, from?: string | HTMLElement){
        const div = card.toDiv(this.container);
        if (this.selectionMode != 'none') {
            div.classList.add("dale-clickable");
        }
        const thiz = this;
		div.addEventListener('click', function() {
            thiz.onClick(card);
		});
        if (from) {
            let top = window.scrollY + div.getBoundingClientRect().top;
            top += parseFloat(dojo.getStyle(div, 'top') as string);
            top += -Images.CARD_HEIGHT_S/2; //workaround anchor issue
            let left = window.scrollX + div.getBoundingClientRect().left;
            left += parseFloat(dojo.getStyle(div, 'left') as string);
            left += Images.CARD_WIDTH_S/2; //workaround anchor issue

            const rotate = (dojo.getStyle(div, 'rotate') as string).replace('deg', '');
            dojo.setStyle(div, 'position', 'absolute');
            dojo.setStyle(div, 'z-index', '100');
            this.page.placeOnObject(div, from);

            const slideAnim = dojo.fx.slideTo({node: div, top: top, left: left, delay: 0, onEnd: ()=> {
                dojo.setStyle(div, 'top', ''); //disable this to check if the workaround still works
                dojo.setStyle(div, 'left', '');
                dojo.setStyle(div, 'position', '');
                dojo.setStyle(div, 'z-index', '');
            }} as dojo._base.AnimationArguments);

            const rotateAnim = new dojo.Animation({
                curve: [0, rotate],
                duration: slideAnim.duration,
                onAnimate: (value: number) => {
                    dojo.setStyle(div, 'rotate', `${value}deg`);
                },
                onEnd: () => {
                    dojo.setStyle(div, 'rotate', '');
                }
            });

            dojo.fx.combine([slideAnim, rotateAnim]).play();
        }
    }

    /** 
	 * Remove a `DaleCard` from hand
	 * @param card card to remove
	 * @param to
     * @param fade (optional) - default false. If true, fade out.
	*/
    public removeCard(card: DaleCard, to?: string | HTMLElement, fade = false){
        const div = card.div;
        if (!(this.container.contains(div))) {
            throw new Error(`Card ${card.id} was not found in hand`);
        }
        let animSlide = undefined;
        let animFade = undefined;
        dojo.addClass( div, 'to_be_destroyed' );
        if (to) {
            animSlide = this.page.slideToObject(div, to) as unknown as dojo._base.Animation;;
        }
        else if (fade) {
            animFade = dojo.fadeOut({ node: div });
        }
        if (animSlide) {
            if (animFade) {
                dojo.fx.chain([animSlide, animFade]).play();
            }
            else {
                animSlide.play();
            }
        }
        else if (animFade) {
            animFade.play();
        }
        else {
            div.remove();
        }
    }

    public unselectAll() {
        this.orderedSelection.unselectAll();
    }

    private onClick(card: DaleCard) {
        console.log(card.name);
        this.orderedSelection.toggle(card.id);
    }

    /**
     * Set the action label to one of the pre-made label classes. If no label was provided, hide the label instead.
     * @param color hex color for the background and border of the label
     */
    private setLabel(label?: ActionLabelClass) {
        this.wrap.classList.remove(...this.actionLabelClasses);
        if (label) {
            console.log("Add "+label);
            console.log(this.wrap);
            this.wrap.classList.add(label);
        }
    }

	/**
	 * Sets the selection mode for the hand. 
	 * @param mode selection mode
	 * @param label (optional) if provided, show one of the pre-defined action labels
	 */
    public setSelectionMode(mode: HandSelectionMode, label?: ActionLabelClass) {
        console.log("setSelectionMode");
        this.selectionMode = mode;
        this.setLabel(label);
        this.unselectAll();
        if (mode == 'none') {
            this.container.querySelectorAll(".dale-card").forEach( div => {
                div.classList.remove("dale-clickable");
            })
        }
        else {
            this.container.querySelectorAll(".dale-card").forEach( div => {
                div.classList.add("dale-clickable");
            })
        }

    }
}