import { DaleCard } from '../DaleCard';

/**
 * Interface for ts components representing card locations
 */
export interface DaleLocation {
    /**
     * Refresh the HTML of this location based on potentially updated DaleCard instances
     * @param card (optional) only update the HTML for this specific card
     */
    updateHTML(card?: DaleCard): void

    /**
     * Select a card if present
     * @param card_id card id to unselect
     */
    selectItem(card_id: number): void

    /**
     * Unselect a card if present
     * @param card_id card id to unselect
     */
    unselectItem(card_id: number): void
}
