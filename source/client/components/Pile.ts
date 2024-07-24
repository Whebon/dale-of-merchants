import Gamegui = require('ebg/core/gamegui');
import { Images } from './Images';
import { DbCard } from './types/DbCard';

declare function $(text: string | Element): HTMLElement;

/**
 * A component to display a set of cards in a pile.
 * Only displays the size and top card of the pile.
 */
export class Pile {
    private cards: DbCard[];
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

    constructor(pile_container_id: string, pile_name?: string){
        $(pile_container_id).innerHTML = `
            ${pile_name ? `<h4 class="name">${pile_name}</h4>` : ""}
            <div class="pile" style="${Images.getCardStyle()}">
                <div class="pile-placeholder" style="${Images.getCardStyle()}"></div>
                <div class="pile-card"></div>
                <div class="size"></div>
            </div>
        `;
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
    * Pop the top card of the pile.
    * @returns {DbCard} top card of the pile.
    */
    public pop(): DbCard {
        if (this.cards.length == 0) {
            throw new Error('Cannot draw from an empty pile. The Server is responsible for reshuffling.');
        }
        let card = this.cards.pop()!;
        this.updateHTML();
        return card;
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
