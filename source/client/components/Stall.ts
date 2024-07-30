import Gamegui = require('ebg/core/gamegui');
import { DaleCard } from './DaleCard';
import { Images } from './Images';
import { CardSlot, CardSlotManager } from './CardSlot';

declare function $(text: string | Element): HTMLElement;



/** 
 * "none": nothing is clickable
 * "single": select single non-empty card slot
 * "multiple": select multiple non-empty card slots
 * "build": click on an empty slot to build a new stack
 */
type StallSelectionMode = "none" | "single" | "multiple" | "build";

/**
 * Major Dale of Merchants game component. Players must build 8 stacks in their Stall to win the game.
 */
export class Stall implements CardSlotManager {
    readonly MAX_STACK_SIZE: number = 100;

    public page: Gamegui;
    private player_id: number;
    private container: HTMLElement;
    private stackContainers: HTMLElement[];
    private slots: CardSlot[][];
    private selectionMode: StallSelectionMode;

    constructor(page: Gamegui, player_id: number) {
        this.page = page;
        this.player_id = player_id;
        this.container = $("stall-"+player_id);
        this.stackContainers = [];
        this.selectionMode = "build";
        this.slots = [];
        //TODO: this can safely be removed
        // this.buildIcon = document.createElement("div");
        // this.buildIcon.classList.add("build-icon");
        // this.buildIcon.setAttribute('style', `${Images.getCardStyle()};`);
        this.createNewStack();
        this.setSelectionMode("build");
    }

    /**
     * Create a new empty stack in the stall with a single empty slot.
    */
    createNewStack() {
        if (this.stackContainers.length > 0) {
            const prevStackContainer = this.stackContainers[this.stackContainers.length - 1]!;
            prevStackContainer.setAttribute('style', `max-width: ${Images.CARD_WIDTH_S}px;`); //the last stack containers has a max width (to stay in bounds)
        }
        const stackContainer = document.createElement("div");
        stackContainer.classList.add("stack-container");
        stackContainer.setAttribute('style', `min-width: ${Images.CARD_WIDTH_S}px;`); //stack containers have a min width (to stay left aligned)
        const placeholder = document.createElement("div");
        placeholder.classList.add("placeholder");
        placeholder.setAttribute('style', `${Images.getCardStyle()};`);
        stackContainer.appendChild(placeholder);
        //TODO: this can safely be removed
        // stackContainer.appendChild(this.buildIcon);
        // const buildIconWidth = Images.CARD_WIDTH_S;
        // this.buildIcon.setAttribute('style', `
        //     width: ${buildIconWidth}px;
        //     height: ${buildIconWidth}px;
        //     left: ${Images.CARD_WIDTH_S / 2}px;
        //     top: ${Images.CARD_HEIGHT_S / 2}px;
        // `);
        this.container.appendChild(stackContainer);
        this.stackContainers.push(stackContainer);
        this.slots.push([]);
        this.createNewSlot(this.slots.length - 1);
    }

    /**
     * Create a new slot on top of the specified stack
     * @param stack_index stack index that points to an aleadying existing stack
     * @param card (Optional) - fill the slot with a specified card
     */
    createNewSlot(stack_index: number, card?: DaleCard) {
        //the stack must exist
        if(stack_index < 0 || stack_index >= this.slots.length || stack_index >= this.stackContainers.length){
            throw new Error(`Cannot make a slot in non-existing stack ${stack_index}`);
        }
        const stackContainer = this.stackContainers[stack_index]!;
        const stack = this.slots[stack_index]!;
        const index = stack.length;

        //create a div container for the new slot
        const y_offset = Images.VERTICAL_STACK_OFFSET_S * index;
        let div = document.createElement("div");
        div.setAttribute('style', `${Images.getCardStyle()};
            position: absolute;
            top: ${y_offset}px
        `);
        stackContainer.setAttribute('style', stackContainer.getAttribute('style')+`height: ${Images.CARD_HEIGHT_S + y_offset}px;`);
        stackContainer.appendChild(div);

        //add the slot to the collection of slots
        const pos = this.getPos(stack_index, index);
        stack.push(new CardSlot(this, pos, div, card));

        //reset the selectionMode
        this.setSelectionMode(this.selectionMode);
    }

    /**
     * @return number of stacks in this stall. Players must build 8 stacks in their Stall to win the game.
    */
    getNumberOfStacks() {
        return this.slots.length;
    }

    /**
     * @param stack_index points to a stack
     * @param index points to a card within the stack
     * @return single number that uniquely defines a location in the stall
    */
    getPos(stack_index: number, index: number): number {
        return stack_index*this.MAX_STACK_SIZE + index;
    }

    /**
     * @param stack_index points to a stack
     * @param index points to a card within the stack
     * @return CardSlot at the specified location
    */
    getSlot(stack_index: number, index: number): CardSlot {
        if (stack_index < 0 || stack_index >= this.slots.length) {
            throw new Error(`Cannot access stack_index ${stack_index}. Player ${this.player_id} only has ${this.slots.length} stacks.`)
        }
        const stack = this.slots[stack_index]!;
        if (index < 0 || index >= stack.length) {
            throw new Error(`Cannot access index ${index} of a stack of size ${stack.length}.`)
        }
        return stack[index]!;
    }

    /**
     * @return html id of the market slot at the specified location
    */
    getSlotId(stack_index: number, index: number): string {
        return this.getSlot(stack_index, index).id
    }

    /**
     * You can specify a selection mode similar like for a Stock.
     * @param mode
     * 0: no item can be selected by the player.
     * 1: a maximum of one item can be selected by the player at a time.
     * 2: multiple items can be selected by the player at the same time.
     * @param type (optional) - default "filled". type of card slots that can be selected
    */
    setSelectionMode(mode: StallSelectionMode) {
        //important: setSelectionMode is also used as a refresh when the number of slots changes
        //therefore, we can not shortcircuit when this.selectionMode == mode
        //TODO: make a distinction between selectionMode 1 and 2
        this.unselectAll();
        this.selectionMode = mode;
        for (let stack of this.slots) {
            for (let slot of stack) {
                switch(mode) {
                    case "none":
                        slot.setClickable(slot.hasCard());
                        break;
                    case "single":
                        slot.setClickable(slot.hasCard());
                        break;
                    case "multiple":
                        slot.setClickable(slot.hasCard());
                        break;
                    case "build":
                        slot.setClickable(slot.hasCard() == false);
                        break;
                }
            }
        }
    }

    unselectAll() {
        for (let stack of this.slots) {
            for (let slot of stack) {
                slot.setSelected(false);
            }
        }
    }

    onCardSlotClick(slot: CardSlot): void {
        const index = slot.pos % this.MAX_STACK_SIZE;
        const stack_index = (slot.pos-index) / this.MAX_STACK_SIZE;
        (this.page as any).onStallCardClick(slot.card, stack_index, index);
    }
}
