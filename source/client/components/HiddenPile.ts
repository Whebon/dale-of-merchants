import { DaleCard } from "./DaleCard";
import { Pile } from "./Pile";

/**
 * A pile with only face-down cards
 */
export class HiddenPile extends Pile {
    /**
     * Pushes a card on top of the pile. Hide the content.
     */
    override push(_card: DaleCard, from?: string | HTMLElement, onEnd?: Function | null, duration?: number, delay?: number) {
        //we simply ignore the '_card' and push a hidden card instead.
        super.push(new DaleCard(0, 0), from, onEnd, duration, delay);
    }

    /**
     * If the content is not set, prevent opening the popin.
     */
    override openPopin() {
        if (this.cards[0] === undefined || this.cards[0].id == 0) {
            this.page.showMessage(_("This deck contains ")+this.size+_(" card(s)"), 'info');
        }
        else {
            super.openPopin();
        }
    }

    /**
    * The top card of a deck is always face-down
    */
    override peek(exclude_sliding_cards: boolean = false): DaleCard | undefined {
        return super.peek(exclude_sliding_cards) ? new DaleCard(0, 0) : undefined;
    }

    /**
     * Replace the hidden cards with the actual card ids.
     * e.g. `[0, 0, 0, 0]` => `[23, 55, 34, 3]`
     */
    public setContent(cards: DaleCard[]) {
        if (this.cards.length != cards.length) {
            throw Error(`Client expected a deck of size ${this.cards.length}, but got size ${cards.length} from the server`)
        }
        this.cards = cards;
        this.updateHTML();
    }

    /**
     * Hide the cards (set with setContent) using card backs.
     * e.g. `[23, 55, 34, 3]` => `[0, 0, 0, 0]`
     */
    public hideContent() {
        this.closePopin();
        const size = this.cards.length;
        this.cards = [];
        this.pushHiddenCards(size);
    }
}
