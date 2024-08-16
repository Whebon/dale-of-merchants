import { DaleCard } from './DaleCard';

export type SelectionIconType = 'none' | 'orderedPile' | 'hand';

export class OrderedSelection {
    private iconType: SelectionIconType;
    //private divsWithIcons: Map<number, Element>;
    private card_ids: number[];

    constructor() {
        this.iconType = 'orderedPile';
        //this.divsWithIcons = new Map<number, Element>();
        this.card_ids = [];
    }
    
    /**
     * @param card_id
     * @return div element corresponding to the card_id
     */
    protected getDiv(card_id: number): Element | null {
        //return $("dale-card-"+card_id);
        return new DaleCard(card_id).div;
    }

	/**
	 * Adds the correct selection icon to the given item_div
	 * @param card_id card to add the selection icon to
	 * @param index index of the item within the ordered card_ids
	 */
	private addIcon(card_id: number, index: number) {
        const div = this.getDiv(card_id)!
        div.classList.add("dale-selected");
        if (this.iconType == 'none') {
            return;
        }
        
        let offset = Math.min(7, index);
        if (this.iconType == 'orderedPile') {
            offset += 1;
        }
        const icon = document.createElement("div");
        icon.classList.add("selection-icon");
        icon.setAttribute('style', `
            background-position: -${offset}00%;
        `);
        // this.divsWithIcons.set(card_id, div);
		div.appendChild(icon);
	}

    /**
     * @param card_id card to remove the selection icon from
     */
    private removeIcon(card_id: number) {
        const div = this.getDiv(card_id);
        div?.classList.remove("dale-selected");
        div?.querySelector(".selection-icon")?.remove();
    }

	/**
	 * Adds the correct selection icon to the given card
	 * @param card_id card_id to add the selection icon to
	 * @param index index of the item in this.card_ids
	 */
	public selectItem(card_id: number) {
        this.card_ids.push(card_id);
        console.log(this.card_ids);
        this.addIcon(card_id, this.card_ids.length-1);
	}

    /**
	 * Removes the given card from the selection. Does not update the other icons.
	 * @param card_id card_id to remove from the selection
     */
    public unselectItem(card_id: number) {
        // const div = this.divsWithIcons.get(card_id);
        // if (div) {
        //     div.querySelector(".selection-icon")?.remove();
        //     this.divsWithIcons.delete(card_id);
        // }
		const index = this.card_ids.indexOf(card_id);
		this.card_ids.splice(index, 1);
		console.log(this.card_ids);
        this.removeIcon(card_id);
    }

    /**
     * Reset the selection and icons
     */
    public unselectAll() {
        for (let card_id of this.card_ids) {
            this.unselectItem(card_id);
        }
    }

    /**
     * Configure the type of icons that are to be displayed on the selected cards
     */
    public setIconType(type: SelectionIconType) {
        this.iconType = type;
    }
    
    /**
     * Shift selection icons to ensure the icons remain adjacent. Should be called when the user removes an element from the selection.
     */
    public updateIcons() {
        console.log("updateIcons");
        if (this.iconType != 'none') {
            for (let i = 0; i < this.card_ids.length; i++) {
                const card_id = this.card_ids[i]!;
                this.removeIcon(card_id);
                this.addIcon(card_id, i);
            }
        }
    }

    /**
     * If the card is selected, unselect it. If the card is unselected, select it. Also updates the icons.
     * @param card_id
     * @returns `true` if the card is now selected
     */
    public toggle(card_id: number) {
        if (this.includes(card_id)) {
            this.unselectItem(card_id);
            this.updateIcons();
            return false;
        }
        else {
            this.selectItem(card_id);
            return true;
        }
    }

    /**
     * @param card_id
     * @returns `true` id the card_id is present in the selection
     */
    public includes(card_id: number) {
        return this.card_ids.includes(card_id);
    }

    /**
     * Get the order of the selection as shown by the selection icons
     * @return `card_ids`
     */
    public get(): number[] {
        return this.card_ids.slice().reverse();
    }
}
