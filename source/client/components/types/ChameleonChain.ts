export class ChameleonChain {
    /**
     * The chain of card_ids to reach the target
     */
    card_ids: number[];

    /**
     * The chain of type_ids to reach the target
     */
    type_ids: number[];

    /**
     * The target card_id to copy (at the tail of the chameleon chain)
     */
    get card_id(): number {
        return this.card_ids[this.card_ids.length-1]!;
    }

    /**
     * The target type_id to copy (at the tail of the chameleon chain)
     */
    get type_id(): number {
        return this.type_ids[this.type_ids.length-1]!;
    }

    constructor(card_id: number, type_id: number) {
        this.card_ids = [card_id];
        this.type_ids = [type_id];
    }

    public push(card_id: number, type_id: number) {
        this.card_ids.push(card_id);
        this.type_ids.push(type_id);
    }
}
