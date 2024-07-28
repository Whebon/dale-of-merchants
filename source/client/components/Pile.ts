import Gamegui = require('ebg/core/gamegui');
import { Images } from './Images';
import { DaleCard } from './DaleCard';

declare function $(text: string | Element): HTMLElement;

/**
 * A component to display a set of cards in a pile.
 * Only displays the size and top card of the pile.
 */
export class Pile {
    private page: Gamegui;
    private cards: DaleCard[];
    private containerHTML: HTMLElement;
    private sizeHTML: HTMLElement;
    private topCardHTML: HTMLElement;

    public placeholderHTML: HTMLElement;

    /**
     * Array of cards that are in the pile (they should be in `cards`), but are still animating towards the pile
     */
    private _slidingCards: DaleCard[];

    constructor(page: Gamegui, pile_container_id: string, pile_name?: string){
        $(pile_container_id).innerHTML = `
            ${pile_name ? `<h3 class="name">${pile_name}</h3>` : ""}
            <div class="pile" style="${Images.getCardStyle()}">
                <div class="placeholder" style="${Images.getCardStyle()}"></div>
                <div class="card"></div>
                <div class="size"></div>
            </div>
        `;
        this.page = page;
        this.containerHTML = $(pile_container_id);
        this.placeholderHTML = $(pile_container_id).querySelector('.placeholder')!;
        this.topCardHTML = $(pile_container_id).querySelector('.card')!;
        this.sizeHTML = $(pile_container_id).querySelector('.size')!;
        this.cards = [];
        this._slidingCards = [];
        this.updateHTML();
	}

    private updateHTML() {
        this.sizeHTML.innerText = 'x '+this.cards.length;
        let topCard = this.peek(true);
        if (topCard == undefined) {
            //the pile is empty, hide the top card so we can see the placeholder
            this.topCardHTML.setAttribute('style', "display: none");
        }
        else {
            //the pile is non-empty and its content is known, draw the top card of the pile
            this.topCardHTML.setAttribute('style', Images.getCardStyle(topCard.type_id));
        }
    }

     /**
     * Push dummy cards onto the pile. The content of these cards is unknown to the client.
     * @param amount: number of cards to push.
     */
    public pushHiddenCards(amount: number) {
        for (let i = 0; i < amount; i++) {
            this.cards.push(new DaleCard(0, 0));
        }
        this.updateHTML();
    }

    /**
     * Push a card on top of the pile.
     * @param card: card to push on the pile.
     * @param from (optional) when the `from` parameter is specified, the item will be animated from the specified location to the pile.
     * @param onEnd (optional) callback function to execute when the card arived on the pile
     * @param duration (optional) defines the duration in millisecond of the slide. The default is 500 milliseconds.
     * @param delay (optional) defines the delay in millisecond before the slide is executed. The default is 0 milliseconds.
     */
    public push(card: DaleCard, from?: string | HTMLElement, onEnd?: Function | null, duration?: number, delay?: number) {
        this.cards.push(card);
        if (from != null) {
            this._slidingCards.push(card);
            let slidingElement = card.toDiv();
            this.topCardHTML.insertAdjacentElement('afterend', slidingElement);

            let thiz = this;
			let callback = function (node: any) { 
                dojo.destroy( node );
                const i = thiz._slidingCards.indexOf(card);
                if (i > -1) {
                    thiz._slidingCards.splice(i, 1);
                }
                thiz.updateHTML();
                if (onEnd) { 
                    onEnd( node ); 
                }
            };

            this.page.placeOnObject(slidingElement, from)
            var slideAnimation = this.page.slideToObject(slidingElement, this.placeholderHTML, duration, delay) as unknown as dojo._base.Animation;
            var fadeAnimation = dojo.fadeOut({ node: slidingElement, end: callback });
            dojo.fx.chain([slideAnimation, fadeAnimation]).play();
            dojo.addClass( slidingElement, 'to_be_destroyed' );
        }
        this.updateHTML();
    }

    /**
    * Pop the top card of the pile and destroy it.
    * @param to (optional) the element to animate the item to. When the `to` parameter is specified, the item will be animated from the pile to the location of the to element.
    * @param onEnd (optional) callback function to execute when the card arived at its location
    * @param duration (optional) defines the duration in millisecond of the slide. The default is 500 milliseconds.
    * @param delay (optional) defines the delay in millisecond before the slide is executed. The default is 0 milliseconds.
    */
    public pop(to?: string | HTMLElement | Pile, onEnd?: Function | null, duration?: number, delay?: number): DaleCard {
        if (this.cards.length == 0) {
            throw new Error('Cannot draw from an empty pile. The Server is responsible for reshuffling.');
        }

        //animate card
        if (to != null) {
            if (to instanceof Pile) {
                to = to.placeholderHTML;
            }
            let slidingElement = this.topCardHTML.cloneNode() as HTMLElement;
            this.topCardHTML.insertAdjacentElement('afterend', slidingElement);

			let callback = function (node: any) { 
                dojo.destroy( node ); 
                if (onEnd) { 
                    onEnd( node ); 
                }
            };

            var slideAnimation = this.page.slideToObject(slidingElement, to, duration, delay) as unknown as dojo._base.Animation;
            var fadeAnimation = dojo.fadeOut({ node: slidingElement, end: callback });
            dojo.fx.chain([slideAnimation, fadeAnimation]).play();
            dojo.addClass( slidingElement, 'to_be_destroyed' );
        }

        //pop the element from the pile, and update the html to reveal the next card in the pile.
        let card = this.cards.pop()!;
        this.updateHTML();
        return card;
    }

    /**
    * Pop all cards from the pile, destroying the entire pile in the process. Adds hidden cards to the provided `drawPile`.
    * @param drawPile pile to add a hidden card to for each card popped.
    * @param duration (optional) defines the total duration in millisecond of the slide.
    */
    public shuffleToDrawPile(drawPile: Pile, duration: number = 1000) {
        if (this.cards.length == 0) {
            return;
        }
        if (this === drawPile) {
            throw new Error('Cannot shuffle to self.');
        }
        let n = this.cards.length;
        let durationPerPop = duration/n;
        let thiz = this;
        let callback = function (node: any) {
            //pop next
            if (thiz.cards.length > 0) {
                thiz.pop(drawPile, callback, durationPerPop);
            }
            //add a hidden card to the drawpile
            drawPile.pushHiddenCards(1);
        };
        if (n > 10) {
            durationPerPop *= 4;
            this.pop(drawPile, callback, durationPerPop);
            this.pop(drawPile, callback, durationPerPop, durationPerPop*1/4);
            this.pop(drawPile, callback, durationPerPop, durationPerPop*2/4);
            this.pop(drawPile, callback, durationPerPop, durationPerPop*3/4);
        }
        else if (n > 5) {
            durationPerPop *= 2;
            this.pop(drawPile, callback, durationPerPop);
            this.pop(drawPile, callback, durationPerPop, durationPerPop*1/4);
        }
        else {
            this.pop(drawPile, callback, durationPerPop);
        }

    }

    /**
    * Get at the top card of the pile without modifying the pile.
    * @param exclude_sliding_cards (optional) default false. If true, return the top non-sliding card in the pile.
    * @returns {DaleCard} top card of the pile (visible).
    */
    public peek(exclude_sliding_cards: boolean = false): DaleCard | undefined {
        if (this.cards.length == 0) {
            //pile is empty, there is no top card
            return undefined;
        }
        let i = this.cards.length - 1;
        if (exclude_sliding_cards) {
            while (i >= 0 && this._slidingCards.indexOf(this.cards[i]!) != -1) {
                i--;
            }
            if (i == -1) {
                //all cards are still flying towards the pile
                return undefined;
            }
        }
        return this.cards[i]!;
    }
}
