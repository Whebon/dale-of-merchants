import { DaleCard } from '../DaleCard';

export interface ChameleonTree {
    card: DaleCard | HTMLElement;
    children: ChameleonTree[];

    //TODO: safely delete this
    // /**
    //  * @returns all reachable non-chameleon cards
    //  */
    // public getValidTargets(): Set<DaleCard> {
    //     let validTargets = new Set<DaleCard>();
    //     if (!this.card.isChameleon()) {
    //         validTargets.add(this.card);
    //         return validTargets;
    //     }
    //     for (let child of this.children.slice()) {
    //         const childValidTargets = child.getValidTargets();
    //         if (childValidTargets.size > 0) {
    //             validTargets = validTargets.union(childValidTargets);
    //         }
    //         else {
    //             const index = this.children.indexOf(child);
    //             this.children.slice(index, 1);
    //         }
    //     }
    //     return validTargets;
    // }

    //TODO: safely delete this
    // /**
    //  * @returns true if a good CT_GOODOLDTIMES card is reachable
    //  */
    // public containsGoodOldTimes(): boolean {
    //     if (this.card.effective_type_id == DaleCard.CT_GOODOLDTIMES) {
    //         return true;
    //     }
    //     for (let child of this.children) {
    //         if (child.containsGoodOldTimes()) {
    //             return true;
    //         }
    //     }
    //     return false;
    // }
}
