import Gamegui = require('ebg/core/gamegui');
import { DaleCard } from './DaleCard';
import { DaleStock } from './DaleStock';

/**
 * Responsible for managing a collection of CardSlots
 */
export interface CardSlotManager {
    page: Gamegui;
    onCardSlotClick(slot: CardSlot): void;
}

/**
 * Designated space designed to hold a single card or remain empty.
 */
export class CardSlot {
    static UNIQUE_ID: number = 0;
    
    public parent: CardSlotManager;
    public pos: number;
    public selected: boolean;
    protected _container: HTMLElement;
    protected _card: DaleCard | undefined;

    /**
     * Designated space designed to hold a single card or remain empty.
     * @param parent CardSlotManager object that manages this slot
     * @param pos uniquely defines this slot in the scope of the CardSlotManager
     * @param container DomElement to turn into the slot
     * @param card (Optional) - immediately fill the slot with a card
     */
    constructor(parent: CardSlotManager, pos: number, container: HTMLElement, card?: DaleCard){
        (parent.page as any).allCardSlots.push(this);
        this.parent = parent;
        this.pos = pos;
        this.selected = false;
        this._container = container;
        this._card = undefined;
        if (card) {
            this.insertCard(card);
        }
        if (this._container.onclick != null) {
            console.warn("CardSlot is given a container that already has an onclick handler. This handler will may be overwritten.");
        }
    }

    /**
     * Returns the id of this slot's container. If it doesn't have an idea, it is given a new unique id.
    * @returns HTML id of the slot's container.
    */
    public get id(): string {
        if (this._container.id == ""){
            this._container.id = "card-slot-id-"+CardSlot.UNIQUE_ID++;
        }
        return this._container.id;
    }

    /**
    * @returns card in this slot.
    */
    public get card(): DaleCard | undefined {
        return this._card;
    }

    /**
    * @returns div representation of the card in this slot.
    */
    public get card_div(): HTMLElement {
        if (!this.hasCard()) {
            throw new Error("An empty slot has no card")
        }
        return this._container.firstChild as HTMLElement;
    }

    /**
     * Recreated the html of this slot by removing and inserting the card in the slot
     */
    public updateHTML() {
        const card = this.removeCard();
        if (card) {
            this.insertCard(card);
        }
    }

    /**
    * @returns `true` if the slot contains a card.
    */
    public hasCard() {
        return this._card != undefined;
    }
 
    /**
    * Insert a card in the slot. If there already was one, the previous card is removed.
    * @param card card to put in the slot.
    * @param from (optional) animate the card from the provided location
    * @param callback (optional) requires `from`. Callback function to execute upon arival
    */
    public insertCard(card: DaleCard, from?: HTMLElement | string, callback?: (node: HTMLElement)=>void): void {
        this.removeCard();
        const cardDiv = card.toDiv(this.id);
        this._container.appendChild(cardDiv);
        this._card = card;
        if (from) {
            this.parent.page.placeOnObject(cardDiv, from);
            const animSlide = this.parent.page.slideToObject(cardDiv, this._container);
            if (callback) {
                const animCallback = dojo.animateProperty({ node: cardDiv, duration: 0, onEnd: callback });
                const anim = dojo.fx.chain([animSlide as unknown as dojo._base.Animation, animCallback]);
                anim.play();
            }
            else {
                animSlide.play();
            }
        }
    }

    /**
     * Remove the card in this slot, if there was any.
     * @param to (optional) if a card was present, move it to this location, then destroy it
     * @return removed card.
     */
    public removeCard(to?: HTMLElement | string): DaleCard | undefined {
        if (this.hasCard()) {
            let removedCard = this._card;
            this._container.replaceChildren();
            this._card = undefined;
            if (removedCard && to) {
                this.parent.page.slideTemporaryObject(removedCard.toDiv(), this._container, this._container, to);
            }
            return removedCard;
        }
        return undefined;
    }

    /**
     * Delete the entire slot.
     */
    public remove() {
        const allCardSlots: CardSlot[] = (this.parent.page as any).allCardSlots;
        const index = allCardSlots.indexOf(this);
        if (index > -1) {
            allCardSlots.splice(index, 1);
        }
        this.removeCard();
        this._container.remove();
    }

    /**
     * Select this item
     */
    selectItem(): void {
        this._container.classList.add("selected");
        this.selected = true;
    }

    /**
     * Unselect this item
     */
    unselectItem(): void {
        this._container.classList.remove("selected");
        this.selected = false;
    }

    /**
     * (Un)assigns the "onCardSlotClick" handler of the slot manager
     * @param enable
     */
    public setClickable(enable: boolean) {
        if (enable){
            let thiz = this;
            this._container.onclick = function(evt: MouseEvent) {
                evt.stopPropagation();
                thiz.parent.onCardSlotClick(thiz);
            };
            this._container.classList.add("clickable");
        }
        else {
            this._container.classList.remove("clickable");
            this._container.onclick = null;
        }
    }

    /**
     * Swaps the card in this slot with a card with a stock
     * @param stock location of the new card for this slot
     * @param card_id id of the new card for this slot
     */
    public swapWithStock(stock: DaleStock, card_id: number) {
        if (!this.hasCard()) {
            throw new Error("'swapWithStock' called on an empty slot");
        }
        if (!stock.getItemById(card_id)) {
            throw new Error(`'swapWithStock' called with a card that is not in '${stock.control_name}' (card_id = ${card_id})`);
        }
        const div = $(stock.control_name + "_item_" + card_id) as HTMLElement;
        stock.addDaleCardToStock(this._card!, this._container); 
        this.insertCard(new DaleCard(card_id), div); //remove + add for a slot
        stock.removeFromStockByIdNoAnimation(card_id);
    }
}
