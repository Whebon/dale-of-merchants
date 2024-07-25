import Gamegui = require('ebg/core/gamegui');
import { DaleCard } from './DaleCard';
import { Images } from './Images';

declare function $(text: string | Element): HTMLElement;

/**
 * Designated space designed to hold a single card or remain empty.
 */
class CardSlot {
    static UNIQUE_ID: number = 0;

    private _container: HTMLElement;
    private _card: DaleCard | undefined;

    constructor(container?: HTMLElement, card?: DaleCard){
        this._container = container ?? document.createElement("div");
        this._card = card
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
    */
    public insertCard(card: DaleCard){
        this.removeCard();
        this._container.appendChild(card.toDiv());
        this._card = card;
    }

    /**
     * Remove the card in this slot, if there was any.
     * @return removed card.
     */
    public removeCard(): DaleCard | undefined {
        if (this.hasCard()) {
            let removedCard = this._card;
            this._container.replaceChildren();
            this._card = undefined;
            return removedCard;
        }
        return undefined;
    }
}

/**
 * Singleton component for the dale of merchants market board.
 */
export class MarketBoard {
    readonly MAX_SIZE: number = 5;

    private page: Gamegui;
    private container: HTMLElement;
    private slots: CardSlot[];

    constructor(page: Gamegui){
        //set the background for the market board
        this.page = page;
        $("market-board-background").setAttribute("style", `
            width: ${Images.MARKET_WIDTH_S - Images.MARKET_PADDING_LEFT_S - Images.MARKET_PADDING_RIGHT_S}px;
            height: ${Images.MARKET_HEIGHT_S - Images.MARKET_PADDING_TOP_S - Images.MARKET_PADDING_BOTTOM_S}px;
			background-size: ${Images.MARKET_WIDTH_S}px ${Images.MARKET_HEIGHT_S}px;
			padding-top: ${Images.MARKET_PADDING_TOP_S}px;
			padding-left: ${Images.MARKET_PADDING_LEFT_S}px;
            padding-bottom: ${Images.MARKET_PADDING_BOTTOM_S}px;
			padding-right: ${Images.MARKET_PADDING_RIGHT_S}px;
		`);
        this.container = $("market-board-background").querySelector("#market-board")!;

        //card containers
        this.slots = []
        for (let pos = this.MAX_SIZE - 1; pos >= 0; pos--) {
            let div = document.createElement("div");
            div.setAttribute('style', `${Images.getCardStyle()};
                position: absolute;
                left: ${pos*(Images.CARD_WIDTH_S + Images.MARKET_ITEM_MARGIN_S)}px
            `);
            this.container.appendChild(div);
            this.slots.push(new CardSlot(div));
        }

        this.insertCard(new DaleCard(0, 0), 0);
        this.insertCard(new DaleCard(0, 0), 2);
        this.insertCard(new DaleCard(0, 0), 4);
    }

    /**
     * Instantly (without animation) spawn a card at the given position.
     * @param card the card to add to the market.
     * @param pos (optional) position in the market to add to card to. The default position is the leftmost position: +4.
     */
    insertCard(card: DaleCard, pos?: number) {
        if (pos == undefined) pos = this.MAX_SIZE - 1;
        if (pos < 0 || pos >= this.MAX_SIZE) {
            console.warn(`${pos} is an invalid market position.`)
            pos = this.MAX_SIZE - 1;
        }
        this.slots[pos]!.insertCard(card);
    }

    /**
     * Slide all filled slots to the right.
     * @param duration (optional) duration of the animation.
     * @param delay (optional) delay of the animation.
     */
    slideRight(duration?: number, delay?: number) {
        let emptyPos = 0;
        for (let pos = 0; pos < this.MAX_SIZE; pos++) {
            if (this.slots[pos]!.hasCard()) {
                if (pos != emptyPos) {
                    console.log(`${pos} slides to ${emptyPos}`)
                    //move the data
                    let card = this.slots[pos]!.removeCard()!
                    this.slots[emptyPos]!.insertCard(card)
                    //animate
                    let target = this.slots[emptyPos]!.card_div
                    let source = this.slots[pos]!.id
                    let destination = this.slots[emptyPos]!.id
                    this.page.placeOnObject(target, source)
                    this.page.slideToObject(target, destination, duration, delay).play()
                }
                emptyPos++;
            }
        }
    }
}
