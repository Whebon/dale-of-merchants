import Gamegui = require('ebg/core/gamegui');
import { Images } from './Images';

declare function $(text: string | Element): HTMLElement;

/**
 * A component to display a set of cards in a pile.
 * Only displays the size and top card of the pile.
 */
export class Pile {
    size: HTMLElement;
    topCard: HTMLElement;

    constructor(pile_container_id: string, pile_name?: string){
        $(pile_container_id).innerHTML = `
            ${pile_name ? `<h4 class="name">${pile_name}</h4>` : ""}
            <div class="pile" style="${Images.getCardStyle()}">
                <div class="pile-placeholder" style="${Images.getCardStyle()}"></div>
                <div class="pile-card" style="${Images.getCardStyle(30)}"></div>
                <div class="size">x 69</div>
            </div>
        `;

        this.topCard = $(pile_container_id).querySelector('.pile-card')!;
        this.size = $(pile_container_id).querySelector('.size')!;
	}
}
