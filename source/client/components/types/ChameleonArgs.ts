import { DaleCard } from "../DaleCard";
import { Pile } from "../Pile";
import { ChameleonChain } from "./ChameleonChain";
import { ChameleonTree } from "./ChameleonTree";

/**
 * Holds arguments for a chameleon client state(s)
 */
export class ChameleonArgs {
    public firstSource: DaleCard;
    public currentSource: DaleCard;
    public chain: ChameleonChain;
    public pile: Pile | undefined;
    private tree: ChameleonTree;
    private _onlyContainsGoodOldTimes: boolean | undefined;

    /**
     * Bundles arguments for a chameleon client state 
     * @param tree the chameleon tree of all possible (recursive) targets
     * @param pile (optional) if provided, the chameleon card is selected from a pile popin
     */
    constructor(tree: ChameleonTree, pile?: Pile) {
        this.firstSource = tree.card;
        this.currentSource = tree.card;
        this.chain = new ChameleonChain();
        this.tree = tree;
        this.pile = pile;
    }

    get currentTargets() {
        return this.tree.children.map(child => child.card);
    }

    get onlyContainsGoodOldTimes(): boolean {
        if (this._onlyContainsGoodOldTimes === undefined) {
            throw new Error("'_onlyContainsGoodOldTimes' was not setup");
        }
        return this._onlyContainsGoodOldTimes;
    }
    
    /**
     * Pick the chosen target
     */
    pickTarget(target: DaleCard) {
        console.log("pickTarget");
        for (let child of this.tree.children) {
            if (target.id == child.card.id) {
                this.chain.push(target.id, target.effective_type_id);
                this.tree = child;
                this.firstSource.bindChameleonLocal(this.chain);
                this.currentSource = target;
                return;
            }
        }
        throw new Error(`Card ${target.id} is not a valid chameleon target`);
    }

    /**
     * Get all valid targets, also removes any dead branches as a side effect
     * @returns all reachable non-chameleon cards in the `tree`
     */
    getAllTargets(tree?: ChameleonTree) {
        //base case
        tree = tree ?? this.tree;
        let validTargets = new Set<DaleCard>();
        if (!tree.card.isChameleon()) {
            validTargets.add(tree.card);
            return validTargets;
        }
        //recursive case
        for (let child of tree.children.slice()) {
            const childValidTargets = this.getAllTargets(child);
            if (childValidTargets.size > 0) {
                validTargets = validTargets.union(childValidTargets);
            }
            else {
                const index = tree.children.indexOf(child);
                tree.children.slice(index, 1);
            }
        }
        //if this is the root, set up '_onlyGoodOldTimes'
        if (tree === this.tree) {
            this._onlyContainsGoodOldTimes = true;
            for (let target of Array.from(validTargets)) {
                if (!target.isCardBack() && target.effective_type_id != DaleCard.CT_GOODOLDTIMES) {
                    this._onlyContainsGoodOldTimes = false;
                    break;
                }
            }
        }
        return validTargets;
	}
}
