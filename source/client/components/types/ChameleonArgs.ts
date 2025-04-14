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
        this.firstSource = tree.card as DaleCard;
        this.currentSource = tree.card as DaleCard;
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
        console.warn("pickTarget");
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
        let validTargets = new Set<DaleCard | HTMLElement>();
        if (tree.card instanceof HTMLElement || !tree.card.isChameleon()) {
            validTargets.add(tree.card);
            return validTargets;
        }
        //recursive case
        for (let i = 0; i < tree.children.length; i++) {
            const child = tree.children[i];
            const childValidTargets = this.getAllTargets(child);
            if (childValidTargets.size > 0 || child?.card instanceof HTMLElement || child?.card.effective_type_id == DaleCard.CT_GOODOLDTIMES) {
                validTargets = validTargets.union(childValidTargets);
            } 
            else {
                tree.children.splice(i, 1);
                i--;
            }
        }
        //if this is the root, set up '_onlyGoodOldTimes'
        if (tree === this.tree) {
            this._onlyContainsGoodOldTimes = true;
            for (let target of Array.from(validTargets)) {
                // "target instanceof HTMLElement" means the target represents the ditch ability of good old times
                if (!(target instanceof HTMLElement) && target.effective_type_id != DaleCard.CT_GOODOLDTIMES) {
                    this._onlyContainsGoodOldTimes = false;
                    break;
                }
            }
        }
        return validTargets;
	}
}
