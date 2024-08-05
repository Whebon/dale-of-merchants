import Gamegui = require('ebg/core/gamegui');
import { DaleCard } from './DaleCard';
import { Images } from './Images';
import { CardSlot, CardSlotManager } from './CardSlot';
import { DbCard } from './types/DbCard';

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
    static readonly MAX_STACK_SIZE: number = 1000; //must be the same as on the server side
    static readonly MAX_STACKS: number = 8; //must be the same as on the server side

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
        this.selectionMode = "none";
        this.slots = [];
        //TODO: this can safely be removed
        // this.buildIcon = document.createElement("div");
        // this.buildIcon.classList.add("build-icon");
        // this.buildIcon.setAttribute('style', `${Images.getCardStyle()};`);
    }

    //TODO: safely remove this
    // /**
    //  * Remove all trailing empty stacks
    //  */
    // removeEmptyStacks() {
    //     for (let stack_index = this.getNumberOfStacks() - 1; stack_index >= 0; stack_index--) {
    //         const stack = this.slots[stack_index]!
    //         if (stack.length >= 2) {
    //             return;
    //         }
    //         if (stack.length == 1) {
    //             if (stack[0]!.hasCard()) {
    //                 return;
    //             }
    //             else {
    //                 stack[0]!.remove();
    //                 this.stackContainers[stack_index]!.remove();
    //                 this.slots[stack_index]!.pop();
    //             }
    //         }
    //     }
    // }

    /**
     * Create a new empty stack in the stall with a single empty slot.
    */
    createNewStack() {
        if (this.slots.length < Stall.MAX_STACKS) {
            if (this.stackContainers.length > 0) {
                const prevStackContainer = this.stackContainers[this.stackContainers.length - 1]!;
                const height = Images.CARD_HEIGHT_S + Images.VERTICAL_STACK_OFFSET_S * (this.slots[this.slots.length - 1]!.length - 1);
                prevStackContainer.setAttribute('style', `height: ${height}px; max-width: ${Images.CARD_WIDTH_S}px;`); //the last stack containers has a max width (to stay in bounds)
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
    }

    /**
     * Create a new slot on top of the specified stack
     * @param stack_index stack index that points to an already existing stack
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
        stackContainer.appendChild(div);

        //add the slot to the collection of slots
        const pos = this.getPos(stack_index, index);
        stack.push(new CardSlot(this, pos, div, card));
    }

    /**
     * Remove the card at the given position.
     * @param pos position in the stall to remove the card from.
     * @param to (optional) if a card was present, move it to this location, then destroy it
     * @return removed card
    */
    removeCard(pos: number, to?: HTMLElement | string): DaleCard | undefined {
        const index = pos % Stall.MAX_STACK_SIZE;
        const stack_index = (pos - index) / Stall.MAX_STACK_SIZE;
        if (stack_index < 0 || stack_index >= this.getNumberOfStacks()) {
            throw new Error(`Stack index ${stack_index} out of range`)
        }
        const stack = this.slots[stack_index]!;
        if (index < 0 || index >= stack.length) {
            throw new Error(`Index ${stack_index} out of range`)
        }
        const card = stack[index]!.removeCard(to); //TODO: the 'to' argument doesn't work...
        for (var i = stack.length-1; i >= 1; i--) { //1, because we never delete slot 0
            if (stack[i]!.hasCard()) {
                break;
            }
            else {
                stack[i]!.remove(); //...because we eliminate the parent of the slidingObject
                stack.pop();
            }
        }
        const y_offset = Images.VERTICAL_STACK_OFFSET_S * i;
        const stackContainer = this.stackContainers[stack_index]!;
        const prevStyleWithoutHeight = stackContainer.getAttribute('style')?.replace('height:.*px;', '');
        stackContainer.setAttribute('style', prevStyleWithoutHeight+`height: ${Images.CARD_HEIGHT_S + y_offset}px;`);
        return card;
    }

    /**
     * Insert a card from the db into the stall at the correct position as described by the db card's location arg.
     * @param card card as received from the db.
     * @param from
     */
    insertDbCard(card: DbCard, from?: HTMLElement | string) {
        const pos = +card.location_arg;
        const index = pos % Stall.MAX_STACK_SIZE;
        const stack_index = (pos - index) / Stall.MAX_STACK_SIZE;
        this.insertCard(DaleCard.of(card), stack_index, index, from);
    }

    /**
     * Insert a card at a given location. By default the card is automatically placed in the first empty slot within the stack.
     * @param card card to insert
     * @param stack_index index of the stack
     * @param index (optional) when provided, place the card at a specific index within the stack
     * @param from
     */
    insertCard(card: DaleCard, stack_index: number, index?: number, from?: HTMLElement | string) {
        if (stack_index >= Stall.MAX_STACKS) {
            throw new Error(`Cannot build beyond the maximum number of ${Stall.MAX_STACKS} stacks`);
        }
        while (stack_index >= this.slots.length && this.slots.length < Stall.MAX_STACKS) {
            this.createNewStack();
        }
        const stack = this.slots[stack_index]!;
        if (index == undefined) {
            index = 0;
            while (stack[index]?.hasCard()) {
                index++;
            }
        }
        while (index >= stack.length) {
            this.createNewSlot(stack_index);
        }
        console.log(`insertCard(stack_index=${stack_index}, index=${index})`);
        stack[index]!.insertCard(card, from);
    }

    /**
     * @return number of stacks in this stall.
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
        return stack_index*Stall.MAX_STACK_SIZE + index;
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
            throw new Error(`Cannot access index ${index} of stack ${stack_index} of size ${stack.length}.`)
        }
        return stack[index]!;
    }

    /**
     * @return html id of the market slot at the specified location
     * @param pos location in the stall encoding as: pos = stack_index*Stall.MAX_STACK_SIZE + index
    */
    getSlotId(pos: number): string {
        const index = pos % Stall.MAX_STACK_SIZE;
        const stack_index = (pos - index) / Stall.MAX_STACK_SIZE;
        return this.getSlot(stack_index, index).id
    }

    /**
     * You can specify a selection mode similar like for a Stock.
     * @param mode see StallSelectionMode
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
                        slot.setClickable(false);
                        break;
                    case "single":
                        slot.setClickable(slot.hasCard());
                        break;
                    case "multiple":
                        slot.setClickable(slot.hasCard());
                        break;
                    case "build":
                        slot.setClickable(!slot.hasCard());
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
        const index = slot.pos % Stall.MAX_STACK_SIZE;
        const stack_index = (slot.pos-index) / Stall.MAX_STACK_SIZE;
        (this.page as any).onStallCardClick(slot.card, stack_index, index);
    }
}
