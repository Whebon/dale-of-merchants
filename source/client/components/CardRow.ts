//import Gamegui = require('ebg/core/gamegui');
import { DaleCard } from './DaleCard';
import { Images } from './Images';
import { CardSlot, CardSlotManager } from './CardSlot';

type Gamegui = any;

declare function $(text: string | Element): HTMLElement;


/**
 * A row of card slots that hides when empty
 */
export class CardRow implements CardSlotManager {
    public page: Gamegui;
    private outer_container: HTMLElement;
    private container: HTMLElement;
    private slots: CardSlot[];

    constructor(page: Gamegui, container_id: string, name?: string) {
        this.page = page;
        this.outer_container = $(container_id);
        this.outer_container.classList.add('hidden');
        this.outer_container.innerHTML = `
            ${name ? `<h3 class="name">${name}</h3>` : ""}
            <div class="card-row-container"></div>
        `;
        this.container = this.outer_container.querySelector('.card-row-container')!;
        this.slots = [];
    }

    /**
     * Create a new slot in the rightmost position, then insert a card into that position
     * @param card card to add
     * @param player_id (optional) default current player. owner of the card.
     * @param from
    */
    append(card: DaleCard, player_id?: number, from?: HTMLElement | string){
        const pos = this.slots.length;
        let div = document.createElement("div");
        div.setAttribute('style', `${Images.getCardStyle()};`);
        div.classList.add('card-row-slot');
        //div.classList.add('schedule-slot');  //TODO: can be safely deleted
        this.container.appendChild(div);
        this.outer_container.classList.remove('hidden');
        this.slots.push(new CardSlot(this, pos, div));
        this.insertCard(card, pos, from);
        console.log(`Caller: inserting card at position ${pos}`)
    }

    /**
     * Return the html id of the slot of the specified card
     * @param card
    */
    getHTMLId(card: DaleCard): string {
        const index = this.indexOf(card);
        return this.slots[index]!.id;
    }

    /**
     * Return the position of the slot containing the specified card
     * @param card
    */
    indexOf(card: DaleCard): number {
        for (let i = 0; i < this.slots.length; i++) {
            if (this.slots[i]?.card?.id == card.id) {
                if (this.slots[i]?.pos != i) {
                    console.warn("CardRow invariant violation.");
                }
                return i;
            }
        }
        throw new Error(`Card ${card.id} does not exist in the CardRow.`);
    }

    /**
     * Remove the card slot that is holding the specified card. Throws an exception if the card is not found.
     * @param card card to remove
     * @return index of the removed card
    */
    remove(card: DaleCard): number {
        const index = this.indexOf(card);
        this.slots[index]!.remove();
        for (let i = index + 1; i < this.slots.length; i++) {
            const slot = this.slots[i]!;
            slot.pos -= 1;
        }
        this.slots.splice(index, 1);
        if (this.slots.length == 0) {
            this.outer_container.classList.add('hidden');
        }
        return index;
    }

    /**
     * converts any position to a valid position in the row
     * @param pos any position
     * @param valid position within the row's bounds
    */
    getValidPos(pos: number): number {
        if (pos < 0 || pos >= this.slots.length) {
            console.warn(`${pos} is an invalid row position. The position should be in range [0, ${this.slots.length - 1}] Using position 0 instead.`)
            pos = 0;
        }
        return pos;
    }

    /**
     * Insert a card at the given position. Overwrites any card that was previously in that slot.
     * @param card the card to add to the market.
     * @param pos (optional) position in the market to add to card to. The default position is the leftmost position: +4.
     * @param from (optional) animate the card from the provided location
     */
    insertCard(card: DaleCard, pos: number, from?: HTMLElement | string): void {
        pos = this.getValidPos(pos);
        this.slots[pos]!.insertCard(card, from, (node: HTMLElement) => {
            //TODO: update the styling of the node from absolute to relative
        });
    }

    /**
     * Remove the card at the given position.
     * @param pos position in the market to add to card to. The default position is the leftmost position: +4.
     * @param to (optional) if a card was present, move it to this location, then destroy it
     * @return removed card
    */
    removeCard(pos: number, to?: HTMLElement | string): DaleCard | undefined {
        pos = this.getValidPos(pos);
        return this.slots[pos]!.removeCard(to);
    }

    onCardSlotClick(slot: CardSlot): void {
        //TODO
        console.error("onCardSlotClick NOT IMPLEMENTED");
        // if (slot.hasCard()) {
        //     (this.page as any).onMarketCardClick(slot.card, slot.pos);
        // } else {
        //     this.page.showMessage(_("This card is sold out!"), 'error');
        // }
    }
}
