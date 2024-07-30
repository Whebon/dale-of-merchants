import Gamegui = require('ebg/core/gamegui');
import { DaleCard } from './DaleCard';

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
    * @returns `true` if the slot contains a card.
    */
    public hasCard() {
        return this._card != undefined;
    }
 
    /**
    * Insert a card in the slot. If there already was one, the previous card is removed.
    * @param card card to put in the slot.
    * @param from (optional) animate the card from the provided location
    */
    public insertCard(card: DaleCard, from?: HTMLElement | string): void {
        this.removeCard();
        const cardDiv = card.toDiv(this.id);
        this._container.appendChild(cardDiv);
        this._card = card;
        if (from) {
            this.parent.page.placeOnObject(cardDiv, from);
            this.parent.page.slideToObject(cardDiv, this._container).play();
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
     * (Un)set this slots's selected property
     * @param enable
    */
    public setSelected(enable: boolean){
        if (this.selected == enable) return;
        if (enable) {
            this._container.classList.add("card-slot-selected");
        }
        else {
            this._container.classList.remove("card-slot-selected");
        }
        this.selected = enable;
    }

    /**
     * (Un)assigns the "onCardSlotClick" handler of the slot manager
     * @param enable
     */
    public setClickable(enable: boolean) {
        if (enable){
            let thiz = this;
            this._container.onclick = function() {
                thiz.parent.onCardSlotClick(thiz);
            };
            this._container.classList.add("clickable");
        }
        else {
            this._container.classList.remove("clickable");
            this._container.onclick = null;
        }
    }
}
