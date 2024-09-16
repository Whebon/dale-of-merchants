import { DaleCard } from './DaleCard';
import { DaleIcons } from './DaleIcons';

export type SelectionIconType = 'pileBlue' | 'pileYellow' | 'pileRed' | 'ditch' | 'build' | 'spyglass' | 'cheese' | 'numbers' | 'hand' | 'naturalSurvivor' | 'historyLesson' | undefined;

export class OrderedSelection {
    private maxSize: number;
    private iconType: SelectionIconType;
    private card_ids: number[];

    private secondaryMaxSize: number;
    private secondaryIconType: SelectionIconType;
    private secondary_card_ids: number[];

    constructor() {
        this.card_ids = [];
        this.secondary_card_ids = [];
        this.maxSize = Number.POSITIVE_INFINITY;
        this.secondaryMaxSize = Number.POSITIVE_INFINITY;
    }

    /**
     * Function to call when a card is added to the selection. dojo.connect should be used to connect to this hook
     * @param card_id the card that was added/removed from the selection
     * @param secondary true if the card was added/removed from the second selection layer
     */
    private onSelect(card_id: number, secondary?: boolean) {
        console.log(`onSelect(card_id=${card_id}, secondary=${secondary})`);
    }

    /**
     * Function to call when a card is added to the selection. dojo.connect should be used to connect to this hook
     * NOTE: I also prefer "deselect" over "unselect", but I was forced into "unselect" by the bga stock
     * @param card_id the card that was added/removed from the selection
     * @param secondary true if the card was added/removed from the second selection layer
     */
    private onUnselect(card_id: number, secondary?: boolean) {
        console.log(`onUnselect(card_id=${card_id}, secondary=${secondary})`);
    }

    /**
     * @param card_id
     * @return div element corresponding to the card_id
     */
    protected getDiv(card_id: number): HTMLElement | undefined {
        //return $("daleofmerchants-card-"+card_id);
        return DaleCard.divs.get(card_id);
    }

	/**
	 * Adds the correct selection icon to the given item_div
	 * @param card_id card to add the selection icon to
	 * @param index index of the item within the ordered card_ids
     * @param secondary (optional) if provided, add an icon on the secondary layer
	 */
	private addIcon(card_id: number, index: number, secondary?: boolean) {
        const iconType = secondary ? this.secondaryIconType : this.iconType
        const div = this.getDiv(card_id);
        if (!div) {
            console.log("addIcon skipped, card is not on screen (likely because it is inside a pile)");
            return;
        }
        div.classList.add("daleofmerchants-selected");

        let icon = undefined;
        switch(iconType) {
            case 'pileBlue':
                icon = DaleIcons.getBluePileIcon(Math.min(index, 5));
                break;
            case 'pileYellow':
                icon = DaleIcons.getYellowPileIcon(Math.min(index, 5));
                break;
            case 'pileRed':
                icon = DaleIcons.getRedPileIcon(Math.min(index, 5));
                break;
            case 'ditch':
                icon = DaleIcons.getDitchIcon();
                break;
            case 'build':
                icon = DaleIcons.getBuildIcon();
                break;
            case 'spyglass':
                icon = (index == 0) ? DaleIcons.getSpyglassIcon() : DaleIcons.getBluePileIcon(Math.min(index-1, 5));
                break;
            case 'cheese':
                icon = (index == 0) ? DaleIcons.getCheeseIcon() : DaleIcons.getBluePileIcon(Math.min(index-1, 5));
                break;
            case 'numbers':
                icon = DaleIcons.getNumberIcon(Math.min(index, 4));
                break;
            case 'hand':
                icon = DaleIcons.getHandIcon();
                break;
            case 'naturalSurvivor':
                icon = DaleIcons.getNaturalSurvivorIcon();
                break;
            case 'historyLesson':
                icon = DaleIcons.getHistoryLessonIcon();
                break;
        }
        if (icon) {
            if (secondary) {
                icon.classList.add("daleofmerchants-selection-icon-2");
            }
            else {
                icon.classList.add("daleofmerchants-selection-icon-1");
            }
            div.prepend(icon); //only the first icon is visible
        }
	}

    /**
     * @param card_id card to remove the selection icon from
     * @param secondary (optional) if provided, remove the icon on the secondary layer
     */
    private removeIcon(card_id: number, secondary?: boolean) {
        const div = this.getDiv(card_id);
        if (!div) {
            console.log("removeIcon skipped, no icon on screen (likely because it is inside a pile)");
            return;
        }
        const primaryIcon = div?.querySelector(".daleofmerchants-selection-icon-1");
        const secondaryIcon = div?.querySelector(".daleofmerchants-selection-icon-2");
        if (secondary) {
            secondaryIcon?.remove();
            if (!primaryIcon) {
                div?.classList.remove("daleofmerchants-selected");
            }
        }
        else {
            primaryIcon?.remove();
            if (!secondaryIcon) {
                div?.classList.remove("daleofmerchants-selected");
            }
        }
    }

    /**
     * Enforce a maximum selection size upon the selection by dequeing any items exceeding the maximum.
     * If maxSize = 0, don't add
     */
    public setMaxSize(max: number, secondary?: boolean) {
        console.log("setMaxSize: "+max);
        if (max < 0) {
            throw new Error("Maximum selection size must be non-negative");
        }
        if (secondary) {
            this.secondaryMaxSize = max;
        }
        else {
            this.maxSize = max;
        }
        const card_ids = secondary ? this.secondary_card_ids : this.card_ids
        while (card_ids.length > max) {
            this.pop(secondary)
        }
    }

    /**
     * Get the maximum size of the selection
     */
    public getMaxSize(secondary?: boolean) {
        if (secondary) {
            return this.secondaryMaxSize;
        }
        return this.maxSize;
    }

    /**
    * Get the size of the selection
    */
    public getSize(secondary?: boolean) {
        if (secondary) {
            return this.secondary_card_ids.length;
        }
        return this.card_ids.length;
    }

    /**
     * Remove the first item in the selection if it exists (and update all icons)
     * @return the removed item
     */
    public dequeue(secondary?: boolean): number | null {
        const card_ids = secondary ? this.secondary_card_ids : this.card_ids
        const card_id = card_ids[0]
        if (card_id === undefined) {
            return null;
        }
        this.unselectItem(card_id, secondary);
        return card_id;
    }

    /**
     * Remove the last item in the selection if it exists (and update all icons)
     * @return the removed item
     */
    public pop(secondary?: boolean): number | null {
        const card_ids = secondary ? this.secondary_card_ids : this.card_ids
        const card_id = card_ids[card_ids.length-1]
        if (card_id === undefined) {
            return null;
        }
        this.unselectItem(card_id, secondary);
        return card_id;
    }

	/**
	 * Adds the given card from the selection.
	 * @param card_id card_id to add the selection icon to
	 */
	public selectItem(card_id: number, secondary?: boolean) {
        const card_ids = secondary ? this.secondary_card_ids : this.card_ids
        const maxSize = secondary ? this.secondaryMaxSize : this.maxSize
        if (maxSize == 0) {
            return;
        }
        if (card_ids.includes(card_id)) {
            return;
        }
        while (card_ids.length >= maxSize) {
            this.pop(secondary);
        }
        card_ids.push(card_id);
        this.addIcon(card_id, card_ids.length-1, secondary);
        this.onSelect(card_id, secondary);
	}

    /**
	 * Removes the given card from the selection. Does not update the other icons.
	 * @param card_id card_id to remove from the selection
     */
    public unselectItem(card_id: number, secondary?: boolean) {
        const card_ids = secondary ? this.secondary_card_ids : this.card_ids
		const index = card_ids.indexOf(card_id);
        if (index != -1) {
            card_ids.splice(index, 1);
            this.removeIcon(card_id, secondary);
            this.onUnselect(card_id, secondary);
        }
    }

    /**
     * Unselect all selection and icons
     */
    public unselectAll(secondary?: boolean) {
        const card_ids = secondary ? this.secondary_card_ids : this.card_ids
        while (card_ids.length > 0) { 
            this.unselectItem(card_ids[card_ids.length-1]!, secondary);
        }
    }

    /**
     * Configure the type of icons that are to be displayed on the selected cards.
     * By default, selections are made on the top-most selection level.
     * @param iconType the selection icon for the primary selection
     * @param baseIconType (optional) the selection icon for the secondary selection
     */
    public setIconType(iconType: SelectionIconType, secondaryIconType?: SelectionIconType) {
        this.iconType = iconType;
        this.secondaryIconType = secondaryIconType;
    }
    
    /**
     * Shift selection icons to ensure the icons remain adjacent. Should be called when the user removes an item from the selection.
     */
    public updateIcons(secondary?: boolean) {
        const card_ids = secondary ? this.secondary_card_ids : this.card_ids
        if (this.iconType) {
            for (let i = 0; i < card_ids.length; i++) {
                const card_id = card_ids[i]!;
                this.removeIcon(card_id, secondary);
                this.addIcon(card_id, i, secondary);
            }
        }
    }

    /**
     * If the card is selected, unselect it. If the card is unselected, select it. Also updates the icons.
     * @param card_id
     * @returns `true` if the card is now selected
     */
    public toggle(card_id: number, secondary?: boolean) {
        if (this.includes(card_id)) {
            this.unselectItem(card_id, secondary);
            this.updateIcons(secondary);
            return false;
        }
        else {
            this.selectItem(card_id, secondary);
            return true;
        }
    }

    /**
     * @param card_id
     * @returns `true` id the card_id is present in the selection
     */
    public includes(card_id: number, secondary?: boolean) {
        const card_ids = secondary ? this.secondary_card_ids : this.card_ids
        return card_ids.includes(card_id);
    }

    /**
     * Get a copy of the internal order of the selection
     * @return `card_ids`
     */
    public get(secondary?: boolean): number[] {
        const card_ids = secondary ? this.secondary_card_ids : this.card_ids
        return card_ids.slice().reverse();
    }

    /**
     * Moves the secondary selection to the primary selection
     */
    public secondaryToPrimary() {
        this.unselectAll();
        this.iconType = this.secondaryIconType;
        this.maxSize = this.secondaryMaxSize;
        for (let card_id of this.secondary_card_ids.slice()) {
            this.unselectItem(card_id, true);
            this.selectItem(card_id)
        }
    }
}
