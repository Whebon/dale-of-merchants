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
    public container: HTMLElement;
    protected _card: DaleCard | undefined;

    private clickable: boolean = false;

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
        this.container = container;
        this.container.classList.add("dale-slot");
        this._card = undefined;
        if (card) {
            this.insertCard(card);
        }
        if (this.container.onclick != null) {
            console.warn("CardSlot is given a container that already has an onclick handler. This handler will may be overwritten.");
        }
    }

    /**
     * Returns the id of this slot's container. If it doesn't have an idea, it is given a new unique id.
    * @returns HTML id of the slot's container.
    */
    public get id(): string {
        if (this.container.id == ""){
            this.container.id = "card-slot-id-"+CardSlot.UNIQUE_ID++;
        }
        return this.container.id;
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
        return this.container.firstChild as HTMLElement;
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
        const cardDiv = card.toDiv(this.id, from ? 'moving' : undefined);
        this.container.appendChild(cardDiv);
        this._card = card;
        this.setClickable(this.clickable);
        if (from) {
            this.parent.page.placeOnObject(cardDiv, from);
            const animSlide = this.parent.page.slideToObject(cardDiv, this.container);
            const onEnd = (node:HTMLElement) => {
                dojo.setStyle(node, 'left', '0px');
                dojo.setStyle(node, 'top', '0px');
                if (callback) {
                    callback(node);
                }
            }
            const animCallback = dojo.animateProperty({ node: cardDiv, duration: 0, onEnd: onEnd });
            const anim = dojo.fx.chain([animSlide as unknown as dojo._base.Animation, animCallback]);
            anim.play();
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
            this.container.replaceChildren();
            this._card = undefined;
            if (removedCard && to) {
                this.parent.page.slideTemporaryObject(removedCard.toDiv(), this.container, this.container, to);
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
        this.container.remove();
    }

    /**
     * Select this item
     */
    selectItem(): void {
        this.container.classList.add("dale-selected");
        this.selected = true;
    }

    /**
     * Unselect this item
     */
    unselectItem(): void {
        this.container.classList.remove("dale-selected");
        this.selected = false;
    }

    /**
     * (Un)assigns the "onCardSlotClick" handler of the slot manager
     * @param enable
     */
    public setClickable(enable: boolean) {
        this.clickable = enable;
        const div = this._card?.div;
        if (div) {
            if (enable){
                const thiz = this;
                div.onclick = function(evt: MouseEvent) {
                    evt.stopPropagation();
                    thiz.parent.onCardSlotClick(thiz);
                };
                div.classList.add("dale-clickable");
            }
            else {
                div.classList.remove("dale-clickable");
                div.onclick = null;
            }
        }
    }

    /**
     * Swaps the card in this slot with a card with a stock
     * @param stock location of the new card for this slot
     * @param card_id id of the new card for this slot
     */
    public swapWithStock(stock: DaleStock, new_card: DaleCard) {
        if (!this.hasCard()) {
            throw new Error("'swapWithStock' called on an empty slot");
        }
        if (!stock.getItemById(new_card.id)) {
            throw new Error(`'swapWithStock' called with a card that is not in '${stock.control_name}' (card_id = ${new_card.id})`);
        }
        const div = $(stock.control_name + "_item_" + new_card.id) as HTMLElement;
        stock.addDaleCardToStock(this._card!, this.container); 
        this.insertCard(new_card, div); //remove + add for a slot
        stock.removeFromStockByIdNoAnimation(new_card.id);
    }

    /**
     * Swaps a card in this stall with a card with the overall player board of the given player_id
     * @param player_id
     * @param new_card new card for this slot
     */
    public swapWithOverallPlayerBoard(player_id: number, new_card: DaleCard) {
        if (!this.hasCard()) {
            throw new Error("'swapWithOverallPlayerBoard' called on an empty slot");
        }
        const player_board = $('overall_player_board_'+player_id) as HTMLElement;
        this.removeCard(player_board);
        this.insertCard(new_card, player_board);
    }
}
