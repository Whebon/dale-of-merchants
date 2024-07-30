import Gamegui = require('ebg/core/gamegui');
import { DaleCard } from './DaleCard';
import { Images } from './Images';
import { CardSlot, CardSlotManager } from './CardSlot';

declare function $(text: string | Element): HTMLElement;

/**
 * Major Dale of Merchants game component. Players must build 8 stacks in their Stall to win the game.
 */
export class Stall implements CardSlotManager {
    readonly MAX_STACK_SIZE: number = 100;
    readonly MAX_STACKS: number = 8;

    public page: Gamegui;
    private player_id: number;
    private container: HTMLElement;
    private stackContainers: HTMLElement[];
    private slots: CardSlot[][];
    private selectionMode: 0 | 1 | 2;
    private selectionModeSlotType: "filled" | "empty";

    constructor(page: Gamegui, player_id: number) {
        this.page = page;
        this.player_id = player_id;
        this.container = $("stall-"+player_id);
        this.stackContainers = [];
        this.selectionMode = 0;
        this.selectionModeSlotType = "filled";
        this.slots = [];
        this.createNewStack();
        this.createNewStack();
        this.createNewStack();
        this.createNewStack();
        this.createNewStack();
        this.createNewStack();
        this.createNewStack();
        this.createNewStack();
        this.createNewStack();
    }

    /**
     * Create a new empty stack in the stall with a single empty slot.
    */
    createNewStack() {
        let stackContainer = document.createElement("div");
        stackContainer.classList.add("stack-container");
        stackContainer.setAttribute('style', `${Images.getCardStyle()}; position: relative;`);
        stackContainer.classList.add("placeholder");
        this.container.appendChild(stackContainer);
        this.stackContainers.push(stackContainer);
        this.slots.push([]);
        this.createNewSlot(this.slots.length - 1);
        this.createNewSlot(this.slots.length - 1);
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
        let div = document.createElement("div");
        div.setAttribute('style', `${Images.getCardStyle()};
            position: absolute;
            top: ${20*index}%
        `);
        stackContainer.appendChild(div);

        //add the slot to the collection of slots
        const pos = this.getPos(stack_index, index);
        stack.push(new CardSlot(this, pos, div, card));
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
    setSelectionMode(mode: 0 | 1 | 2, slot_type: "filled" | "empty" = "filled") {
        //TODO: make a distinction between selectionMode 1 and 2
        if( this.selectionMode == mode ) return;
        this.unselectAll();
        this.selectionMode = mode;
        this.selectionModeSlotType = slot_type;
        let clickable = mode != 0;
        for (let stack of this.slots) {
            for (let slot of stack) {
                slot.setClickable(clickable);
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
        const index = slot.pos % this.MAX_STACKS;
        const stack = (slot.pos-index) % this.MAX_STACKS;
        console.log(`Clicked on CardStack[${stack}, ${index}]`);
        // if (slot.hasCard()) {
        //     (this.page as any).onMarketCardClick(slot.card, slot.pos);
        // } else {
        //     this.page.showMessage(_("This card is sold out!"), 'error');
        // }
    }
}
