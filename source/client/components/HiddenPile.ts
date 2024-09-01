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
     * The popin can't be opened for hidden piles
     */
    override openPopin() {
        this.page.showMessage(_("This deck contains ")+this.size+_(" cards"), 'info');
    }
}
