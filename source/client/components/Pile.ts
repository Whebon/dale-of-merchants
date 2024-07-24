import Gamegui = require('ebg/core/gamegui');
import { Images } from './Images';
import { DbCard } from './types/DbCard';

declare function $(text: string | Element): HTMLElement;

/**
 * A component to display a set of cards in a pile.
 * Only displays the size and top card of the pile.
 */
export class Pile {
    private page: Gamegui;
    private cards: DbCard[];
    private containerHTML: HTMLElement;
    private sizeHTML: HTMLElement;
    private topCardHTML: HTMLElement;

    //Shared reference for facedown card that are kept hidden from the current player
    private static readonly HIDDEN_CARD: DbCard = {
        id: 0,
        type: "",
        type_arg: 0,
        location: "",
        location_arg: 0
    }

    constructor(page: Gamegui, pile_container_id: string, pile_name?: string){
        $(pile_container_id).innerHTML = `
            ${pile_name ? `<h4 class="name">${pile_name}</h4>` : ""}
            <div class="pile" style="${Images.getCardStyle()}">
                <div class="pile-placeholder" style="${Images.getCardStyle()}"></div>
                <div class="pile-card"></div>
                <div class="size"></div>
            </div>
        `;
        this.page = page;
        this.containerHTML = $(pile_container_id);
        this.topCardHTML = $(pile_container_id).querySelector('.pile-card')!;
        this.sizeHTML = $(pile_container_id).querySelector('.size')!;
        this.cards = [];
        this.updateHTML();
	}

    private updateHTML() {
        this.sizeHTML.innerText = 'x '+this.cards.length;
        if (this.cards.length == 0) {
            //the pile is empty, hide the top card so we can see the placeholder
            this.topCardHTML.setAttribute('style', "display: none");
        }
        else {
            //the pile is non-empty and its content is known, draw the top card of the pile
            this.topCardHTML.setAttribute('style', Images.getCardStyle(this.peek().type_arg)); //TODO: top card card of the pile
        }
    }

     /**
     * Push dummy cards onto the pile. The content of these cards is unknown to the client.
     * @param amount: number of cards to push.
     */
    public pushHiddenCards(amount: number) {
        for (let i = 0; i < amount; i++) {
            this.cards.push(Pile.HIDDEN_CARD);
        }
        this.updateHTML();
    }

    /**
     * Push a card on top of the pile.
     * @param card: card to push on the pile.
     */
    public push(card: DbCard) {
        this.cards.push(card);
        this.updateHTML();
    }

    /**
    * Pop the top card of the pile and destroy it.
    * @param to (optional) the element to animate the item to. When the `to` parameter is specified, the item will be animated from the pile to the location of the to element.
    * @param onEnd (optional) callback function to execute when the card arived at its location
    * @param duration (optional) defines the duration in millisecond of the slide. The default is 500 milliseconds.
    * @param delay (optional) defines the delay in millisecond before the slide is executed. The default is 0 milliseconds.
    */
    public pop(to?: string | HTMLElement | Pile, onEnd?: Function | null, duration: number = 500, delay: number = 0) {
        if (this.cards.length == 0) {
            throw new Error('Cannot draw from an empty pile. The Server is responsible for reshuffling.');
        }

        //animate card
        if (to != null) {
            if (to instanceof Pile) {
                to = to.topCardHTML;
            }
            let movingElement = this.topCardHTML.cloneNode() as HTMLElement;
            this.topCardHTML.insertAdjacentElement('afterend', movingElement);

			let callback = function (node: any) { 
                dojo.destroy( node ); 
                if (onEnd) { 
                    onEnd( node ); 
                }
            };

            var slideAnimation = this.page.slideToObject(movingElement, to, duration, delay) as unknown as dojo._base.Animation;;
            var fadeAnimation = dojo.fadeOut({ node: movingElement, end: callback });
            dojo.fx.chain([slideAnimation, fadeAnimation]).play();
            dojo.addClass( movingElement, 'to_be_destroyed' );
        }

        //pop the element from the pile, and update the html to reveal the next card in the pile.
        this.cards.pop()!;
        this.updateHTML();
    }

    /**
    * Pop all cards from the pile, destroying the entire pile in the process. Adds `HIDDEN_CARD`s to the provided `drawPile`.
    * @param drawPile pile to add `HIDDEN_CARD`s to for each card popped.
    * @param duration (optional) defines the total duration in millisecond of the slide.
    */
    public shuffleToDrawPile(drawPile: Pile, duration: number = 1000) {
        if (this === drawPile) {
            throw new Error('Cannot shuffle to self.');
        }
        let n = this.cards.length;
        let durationPerPop = 2*duration/n;
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
    * @returns {DbCard} top card of the pile.
    */
    public peek(): DbCard {
        if (this.cards.length == 0) {
            throw new Error('Cannot peek at an empty pile. The Server is responsible for reshuffling.');
        }
        return this.cards[this.cards.length - 1]!;
    }
}
