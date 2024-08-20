import { DaleCard } from '../DaleCard';

/**
 * Interface for ts components representing card locations
 */
export interface DaleLocation {
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
