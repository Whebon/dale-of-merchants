import Gamegui = require('ebg/core/gamegui');
import { DaleCard } from './DaleCard';
import { Images } from './Images';
import { CardSlot, CardSlotManager } from './CardSlot';

declare function $(text: string | Element): HTMLElement;


/**
 * Singleton component for the dale of merchants market board.
 */
export class MarketBoard implements CardSlotManager {
    readonly MAX_SIZE: number = 5;

    private page: Gamegui;
    private container: HTMLElement;
    private slots: CardSlot[];
    private selectionMode: 0 | 1 | 2;

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
            div.classList.add('grow');
            div.setAttribute('style', `${Images.getCardStyle()};
                position: absolute;
                left: ${pos*(Images.CARD_WIDTH_S + Images.MARKET_ITEM_MARGIN_S)}px
            `);
            this.container.appendChild(div);
            this.slots.push(new CardSlot(this, 4-pos, div));
        }

        //by default, market slots cannot be clicked
        this.selectionMode = 0;
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

    /**
     * You can specify a selection mode similar like for a Stock.
     * @param mode
     * 0: no item can be selected by the player.
     * 1: a maximum of one item can be selected by the player at a time.
     * 2: multiple items can be selected by the player at the same time.
    */
    setSelectionMode(mode: 0 | 1 | 2) {
        //TODO: make a distinction between selectionMode 1 and 2
        if( this.selectionMode == mode ) return;
        this.unselectAll();
        this.selectionMode = mode;
        let clickable = mode != 0;
        for (let slot of this.slots) {
            slot.setClickable(clickable);
        }
    }

    /**
     * Select a slot in the market
     * @param pos valid market position (0, 1, 2, 3 or 4)
     * @param enable (optional) default true. enable/disable the `selected` property.
     */
    setSelected(pos: number, enable: boolean = true) {
        if (pos < 0 || pos >= 5){
			console.error(`select: Market position ${pos} does not exist, using position 0 instead`)
			pos = 0;
		}
        this.slots[pos]!.setSelected(enable);
    }

    /**
     * For each card slot, set `selected` to false.
    */
    unselectAll() {
        for (let slot of this.slots) {
            slot.setSelected(false);
        }
    }

    onCardSlotClick(slot: CardSlot): void {
        if (slot.hasCard()) {
            (this.page as any).onMarketCardClick(slot.card, slot.pos);
        } else {
            this.page.showMessage(_("This card is sold out!"), 'error');
        }
    }
}
