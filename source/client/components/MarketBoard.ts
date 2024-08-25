import Gamegui = require('ebg/core/gamegui');
import { DaleCard } from './DaleCard';
import { DaleStock } from './DaleStock';
import { Images } from './Images';
import { CardSlot, CardSlotManager } from './CardSlot';
import { DaleLocation } from './types/DaleLocation';
import { OrderedSelection, SelectionIconType } from './OrderedSelection';
import { DALE_WRAP_CLASSES, DaleWrapClass } from './types/DaleWrapClass';

declare function $(text: string | Element): HTMLElement;

/**
 * Singleton component for the dale of merchants market board.
 */
export class MarketBoard implements CardSlotManager, DaleLocation {
    readonly MAX_SIZE: number = 5;

    public page: Gamegui;
    private container: HTMLElement;
    private slots: CardSlot[];
    private selectionMode: 0 | 1 | 2;
    public orderedSelection: OrderedSelection;

    constructor(page: Gamegui) {
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
            this.slots.push(new CardSlot(this, 4-pos, div));
        }

        //by default, market slots cannot be clicked
        this.orderedSelection = new OrderedSelection();
        this.selectionMode = 0;
    }

    /**
     * Number of cards on the market board (0, 1, 2, 3, 4 or 5).
     */
    public get size(): number {
        let nbr = 0;
        for (let slot of this.slots) {
            if (slot.hasCard()) {
                nbr++;
            }
        }
        return nbr;
    }

    /**
     * @param card_id
     * @return `pos` of this card_id
     */
    posOf(card_id: number): number {
        for (let slot of this.slots) {
            if (slot.card?.id == card_id) {
                return slot.pos;
            } 
        }
        throw new Error(`card ${card_id} does not exist in the market!`);
    }

    /**
     * @return `card_id` of the card at the given `pos`
     */
    getCardId(pos?: number) {
        pos = this.getValidPos(pos);
        if (this.slots[pos]!.hasCard()) {
            return this.slots[pos]!.card!.id;
        }
        throw new Error(`There is no card in market slot ${pos}`);
    }

    /**
     * converts any position to a valid market position
     * @param pos any market position
     * @param valid valid market position: 4, 3, 2, 1 or 0
    */
    getValidPos(pos?: number): number {
        if (pos == undefined || pos < 0 || pos >= this.MAX_SIZE) {
            console.warn(`${pos} is an invalid market position. Using market position ${this.MAX_SIZE - 1} instead.`)
            pos = this.MAX_SIZE - 1;
        }
        return pos;
    }

    /**
     * Insert a card at the given position. Overwrites any card that was previously in that slot.
     * @param card the card to add to the market.
     * @param pos (optional) position in the market to add to card to. The default position is the leftmost position: +4.
     * @param from (optional) animate the card from the provided location
     */
    insertCard(card: DaleCard, pos?: number, from?: HTMLElement | string): void {
        pos = this.getValidPos(pos);
        this.slots[pos]!.insertCard(card, from);
    }

    /**
     * Remove the card at the given position.
     * @param pos position in the market to remove the card from. The default position is the leftmost position: +4.
     * @param to (optional) if a card was present, move it to this location, then destroy it
     * @return removed card
    */
    removeCard(pos: number, to?: HTMLElement | string): DaleCard | undefined {
        pos = this.getValidPos(pos);
        return this.slots[pos]!.removeCard(to);
    }

    /**
     * Slide all filled slots to the right.
     * @param duration (optional) duration of the animation.
     * @param delay (optional) delay of the animation.
     */
    slideRight(duration?: number, delay?: number) {
        this.unselectAll();
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

    /**
     * @return html id of the market slot at position pos
     * @param pos valid market position: 4, 3, 2, 1 or 0
    */
    getSlotId(pos: number): string {
        pos = this.getValidPos(pos);
        return this.slots[pos]!.id;
    }

	private setWrapClass(wrapClass: DaleWrapClass = 'dale-wrap-default') {
		if (wrapClass != 'previous') {
			this.container.classList.remove(...DALE_WRAP_CLASSES);
			if (wrapClass) {
				this.container.classList.add(wrapClass);
			}
		}
	}

    /**
     * You can specify a selection mode similar like for a Stock.
     * @param mode
     * 0: no item can be selected by the player.
     * 1: a maximum of one item can be selected by the player at a time.
     * 2: multiple items can be selected by the player at the same time.
     * @param iconType (optional) types of icons to use for the selection
    */
    setSelectionMode(mode: 0 | 1 | 2, iconType?: SelectionIconType, wrapClass: DaleWrapClass = "dale-wrap-default") {
        //TODO: action label?
        this.orderedSelection.setIconType(iconType);
        if( this.selectionMode == mode ) return;
        this.setWrapClass(wrapClass);
        this.unselectAll();
        this.selectionMode = mode;
        let clickable = mode != 0;
        for (let slot of this.slots) {
            slot.setClickable(clickable);
        }
    }

    /**
     * Select a slot in the market by position
     * @param pos valid market position: 4, 3, 2, 1 or 0
     * @param enable (optional) default true. enable/disable the `selected` property.
     */
    setSelected(pos: number, enable: boolean = true) {
        pos = this.getValidPos(pos);
        if (enable) {
            this.slots[pos]!.selectItem();
        }
        else {
            this.slots[pos]!.unselectItem();
        }
    }

    selectItem(card_id: number): void {
        for (let slot of this.slots) {
            if (slot.card?.id == card_id) {
                slot.selectItem();
                return;
            }
        }
        console.warn(`Attempted to select a card (card_id = ${card_id}) that is not present in the market`);
    }

    unselectItem(card_id: number): void {
        for (let slot of this.slots) {
            if (slot.card?.id == card_id) {
                slot.unselectItem();
                return;
            }
        }
        console.warn(`Attempted to unselect a card (card_id = ${card_id}) that is not present in the market`);
    }

    /**
     * For each card slot, set `selected` to false.
    */
    unselectAll() {
        this.orderedSelection.unselectAll();
        for (let slot of this.slots) {
            slot.unselectItem();
        }
    }

    onCardSlotClick(slot: CardSlot): void {
        if (slot.hasCard()) {
            if (this.selectionMode == 2) {
                this.orderedSelection.toggle(slot.card!.id);
            }
            (this.page as any).onMarketCardClick(slot.card, slot.pos);
        } else {
            this.page.showMessage(_("This card is sold out!"), 'error');
        }
    }

    public getCards(): DaleCard[] {
        const cards = [];
        for (let slot of this.slots) {
            if (slot.hasCard()){
                cards.push(slot.card!);
            }
        }
        return cards;
    }

    /**
     * Swaps a card in this market with a card with a stock
     * @param card_id card id in this market
     * @param stock location of the new card for this slot
     * @param new_card_id id of the new card for this slot
     */
    public swapWithStock(card_id: number, stock: DaleStock, new_card_id: number) {
        for (let slot of this.slots) {
            if (slot.card?.id == card_id) {
                slot.swapWithStock(stock, new_card_id)
            }
        }
    }
}
