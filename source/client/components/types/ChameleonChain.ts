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

    /**
     * Length of the chameleon chain
     */
    get length(): number {
        return this.card_ids.length
    }

    constructor(card_id?: number, type_id?: number) {
        this.card_ids = [];
        this.type_ids = [];
        if (card_id !== undefined && type_id !== undefined) {
            this.push(card_id, type_id);
        }
    }

    public push(card_id: number, type_id: number) {
        this.card_ids.push(card_id);
        this.type_ids.push(type_id);
    }

    public containsCardId(card_id: number) {
       return this.card_ids.includes(card_id);
    }

    /**
     * Concatenate a series of chameleon chains. `undefined` chains will be ignored.
     * @param chains ChameleonChains to concatenate
     * @returns new ChameleonChain 
     */
    public static concat(...chains: (ChameleonChain | undefined)[]): ChameleonChain {
        let newChain = new ChameleonChain();
        for (let chain of chains) {
            if (chain) {
                for (let i = 0; i < chain.type_ids.length; i++) {
                    newChain.push(chain.card_ids[i]!, chain.type_ids[i]!);
                }
            }
        }
        return newChain;
    }
}
