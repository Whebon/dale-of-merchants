import { DaleCard } from "../DaleCard";
import { ChameleonChain } from "./ChameleonChain";

/**
 * Holds arguments for a chameleon client state
 */
export class ChameleonArgs {
    public firstSource: DaleCard;
    public firstTypeId: number;
    public currentSource: DaleCard;
    public currentTargets: DaleCard[];
    public chain: ChameleonChain;

    /**
     * Bundles arguments for a chameleon client state 
     * @param card the chameleon card that needs to get bound
     * @param targets the potential targets for this chameleon card
     * @param chain (optional) the chain of intermediate chameleon targets so far
     */
    constructor(card: DaleCard, targets: DaleCard[]) {
        this.firstSource = card;
        this.firstTypeId = card.effective_type_id;
        this.currentSource = card;
        this.currentTargets = targets;
        this.chain = new ChameleonChain();
    }

    /**
     * Extend the chain with a new source and new targets
     * @param source the chameleon card that needs to get bound
     * @param targets the potential targets for this chameleon card
     */
    extendChain(source: DaleCard, targets: DaleCard[]) {
        this.pickTarget(source);
        this.currentSource = source;
        this.currentTargets = targets;
    }

    /**
     * Pick the chosen target
     */
    pickTarget(target: DaleCard) {
        console.log("pickTarget");
        console.log(this.currentTargets);
        for (let validTarget of this.currentTargets) {
            if (target.id == validTarget.id) {
                this.chain.push(target.id, target.effective_type_id);
                this.currentTargets = [];
                this.firstSource.bindChameleonLocal(this.chain);
                return;
            }
        }
        throw new Error(`Card ${target.id} is not a valid chameleon target`);
    }
}
