import Gamegui = require('ebg/core/gamegui');
import { DaleCard } from './DaleCard';
import { DaleStock } from './DaleStock';
import { Images } from './Images';
import { CardSlot, CardSlotManager } from './CardSlot';
import { DbCard } from './types/DbCard';
import { DaleLocation } from './types/DaleLocation';
import { DaleIcons } from './DaleIcons';

declare function $(text: string | Element): HTMLElement;

/** 
 * "none": nothing is clickable
 * "single": select single non-empty card slot
 * "multiple": select multiple non-empty card slots
 * "rightmoststack": click on any card in the right most stack
 */
type StallSelectionMode = 'none' | 'single' | 'rightmoststack';

/**
 * Major Dale of Merchants game component. Players must build 8 stacks in their Stall to win the game.
 */
export class Stall implements CardSlotManager, DaleLocation {
    static readonly MAX_STACK_SIZE: number = 1000; //must be the same as on the server side
    static readonly MAX_STACKS: number = 8; //must be the same as on the server side

    public page: Gamegui;
    private player_id: number;
    private container: HTMLElement;
    private stackContainers: HTMLElement[];
    private selectionMode: StallSelectionMode;
    private slots: CardSlot[][];
    private numberOfStacks;

    constructor(page: Gamegui, player_id: number) {
        this.page = page;
        this.player_id = player_id;
        this.container = $("stall-"+player_id);
        this.stackContainers = [];
        this.selectionMode = 'none';
        this.slots = [];
        this.numberOfStacks = 0;
        for (let i = 0; i < Stall.MAX_STACKS; i++) {
            this.createNewStack();
        }
        dojo.setStyle(this.container.parentElement!, 'max-width', Images.CARD_WIDTH_S*(1-Images.STACK_MIN_OVERLAP_X)*Stall.MAX_STACKS+'px');
    }

    private get leftMostPlaceholder(): HTMLElement | undefined {
        const placeholder = this.container.querySelector(".dale-stack-placeholder-first") ?? this.container.querySelector(".dale-stack-placeholder");
        if (placeholder) {
            return placeholder as HTMLElement;
        }
        console.warn("Failed to find a stall placeholder")
        return undefined;
    }

    /**
     * Create a new empty stack in the stall with a single empty slot.
    */
    private createNewStack() {
        if (this.slots.length < Stall.MAX_STACKS) {
            if (this.stackContainers.length > 0) {
                const prevStackContainer = this.stackContainers[this.stackContainers.length - 1]!;
                prevStackContainer.setAttribute('style', `max-width: ${Images.CARD_WIDTH_S*(1-Images.STACK_MIN_OVERLAP_X)}px;`); //the last stack containers has a max width (to stay in bounds)
            }
            const stackContainer = document.createElement("div");
            stackContainer.classList.add("stack-container");
            stackContainer.setAttribute('style', `min-width: ${Images.CARD_WIDTH_S}px;`); //stack containers have a min width (to stay left aligned)

            const placeholder = document.createElement("div");
            if (this.slots.length == 0) {
                placeholder.classList.add("dale-stack-placeholder-first");
                const text = document.createElement("div");
                text.classList.add("dale-text");
                text.textContent = _("Build a new stack");
                placeholder.appendChild(text);
            }
            else {
                placeholder.classList.add("dale-stack-placeholder");
                stackContainer.classList.add("dale-grayed-out");
            }
            placeholder.setAttribute('style', `${Images.getCardStyle()};`);
            const stackIndexDiv = document.createElement("div");
            stackIndexDiv.classList.add("dale-stack-index");
            stackIndexDiv.innerText = String(this.slots.length+1);
            placeholder.append(stackIndexDiv);
            placeholder.appendChild(DaleIcons.getBuildIcon());
            stackContainer.appendChild(placeholder);

            this.container.appendChild(stackContainer);
            this.stackContainers.push(stackContainer);
            this.slots.push([]);
            //this.createNewSlot(this.slots.length - 1); //no first slot needed
        }
        else {
            throw new Error(`Attempted to create stack index ${this.slots.length} (exceeding ${Stall.MAX_STACKS})`)
        }
    }

    /**
     * Update the height of the (first) stack container according to the current maximum stack size
     */
    private updateHeight() {
        const stackContainer = this.stackContainers[0];
        if (stackContainer) {
            let maxHeight = 0;
            for (let stack of this.slots) {
                maxHeight = Math.max(maxHeight, stack.length);
            }
            const y_offset = Images.VERTICAL_STACK_OFFSET_S * (maxHeight - 1);
            console.log("Update height");
            console.log(stackContainer.getAttribute('style'));
            const prevStyleWithoutHeight = stackContainer.getAttribute('style')?.replace(/height:.*px;/, '');
            console.log(prevStyleWithoutHeight);
            stackContainer.setAttribute('style', prevStyleWithoutHeight+`height: ${Images.CARD_HEIGHT_S + y_offset}px;`);
        }
    }

    /**
     * UpdateHTML for all cardslots. 
     * @param card (optional) - if provided, only update the card slot of this card.
     */
    updateHTML(card?: DaleCard) {
        for (let stack of this.slots) {
            for (let slot of stack) {
                if (card == undefined || card.id == slot.card?.id) {
                    slot.updateHTML();
                }
            }
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
        this.updateHeight();
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
        if (stack_index > this.numberOfStacks) {
            throw new Error(`Cannot insert a card at stack index ${stack_index}, because only ${this.numberOfStacks} stacks exist`);
        }
        else if (stack_index == this.numberOfStacks) {
            this.leftMostPlaceholder?.remove(); //building a new stack, remove the placeholder.
            this.numberOfStacks += 1;
        }
        // while (stack_index >= this.slots.length-1 && this.slots.length < Stall.MAX_STACKS) { //-1 because we need a trailing empty stack
        //     this.createNewStack();
        // }
        const stackContainer = this.stackContainers[stack_index]!;
        stackContainer.classList.remove("dale-grayed-out");
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
        return this.numberOfStacks;
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
    */
    setSelectionMode(mode: StallSelectionMode) {
        console.log("Stall setSelectionMode");
        console.log(mode);
        //important: setSelectionMode is also used as a refresh when the number of slots changes
        //therefore, we can not shortcircuit when this.selectionMode == mode
        this.unselectAll();
        this.selectionMode = mode;
        for (let stack of this.slots) {
            for (let slot of stack) {
                switch(mode) {
                    case 'none':
                        slot.setClickable(false);
                        break;
                    case 'single':
                        slot.setClickable(true);
                        break;
                    case 'rightmoststack':
                        slot.setClickable(stack === this.slots[this.numberOfStacks-1]);
                        break;
                }
            }
        }
    }

    /**
     * Make the left placeholder clickable or not
     * @pararm enable
     */
    setLeftPlaceholderClickable(enable: boolean) {
        const placeholder = this.leftMostPlaceholder;
        if (placeholder) {
            if (enable) {
                placeholder.classList.add("dale-clickable");
                placeholder.parentElement!.classList.remove("dale-grayed-out");
                placeholder.onclick = (this.page as any).onRequestBuildAction.bind(this.page);
            }
            else {
                placeholder.classList.remove("dale-clickable");
                placeholder.parentElement!.classList.add("dale-grayed-out"); //parent element to also block click events of overlapping stacks
                placeholder.onclick = null;
            }
        }
    }

    /**
     * Select the leftmost placeholder, but don't make it clickable
     */
    selectLeftPlaceholder() {
        const placeholder = this.leftMostPlaceholder;
        if (placeholder) {
            placeholder.classList.add("dale-selected");
            placeholder.parentElement!.classList.remove("dale-grayed-out");
        }
    }

    /**
     * Unselect the leftmost placeholder
     */
    unselectLeftPlaceholder() {
        const placeholder = this.leftMostPlaceholder;
        if (placeholder) {
            placeholder.classList.remove("dale-selected");
            placeholder.parentElement!.classList.add("dale-grayed-out");
        }
    }

    selectItem(card_id: number): void {
        for (let stack of this.slots) {
            for (let slot of stack) {
                if (slot.card?.id == card_id) {
                    slot.selectItem();
                    return;
                }
            }
        }
        console.warn(`Attempted to select a card (card_id = ${card_id}) that is not present in the stall`);
    }

    unselectItem(card_id: number): void {
        for (let stack of this.slots) {
            for (let slot of stack) {
                if (slot.card?.id == card_id) {
                    slot.unselectItem();
                    return;
                }
            }
        }
        console.warn(`Attempted to unselect a card (card_id = ${card_id}) that is not present in the stall`);
    }

    unselectAll() {
        for (let stack of this.slots) {
            for (let slot of stack) {
                slot.unselectItem();
            }
        }
    }

    onCardSlotClick(slot: CardSlot): void {
        const index = slot.pos % Stall.MAX_STACK_SIZE;
        const stack_index = (slot.pos-index) / Stall.MAX_STACK_SIZE;
        (this.page as any).onStallCardClick(this, slot.card, stack_index, index);
    }

    /**
     * Swaps a card in this stall with a card with a stock
     * @param card_id card id in this stall
     * @param stock location of the new card for this slot
     * @param new_card_id id of the new card for this slot
     */
    public swapWithStock(card_id: number, stock: DaleStock, new_card_id: number) {
        for (let stack of this.slots) {
            for (let slot of stack) {
                if (slot.card?.id == card_id) {
                    slot.swapWithStock(stock, new_card_id);
                }
            }
        }
    }
}
