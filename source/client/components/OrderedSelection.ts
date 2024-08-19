import { DaleCard } from './DaleCard';
import { DaleIcons } from './DaleIcons';

export type SelectionIconType = 'pileBlue' | 'pileYellow' | 'pileRed' | 'ditch' | 'build' | 'spyglass' | undefined;

export class OrderedSelection {
    private iconType: SelectionIconType;
    private card_ids: number[];

    private secondaryIconType: SelectionIconType;
    private secondary_card_ids: number[];
    
    constructor() {
        this.card_ids = [];
        this.secondary_card_ids = [];
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
     * @param secondary (optional) if provided, add an icon on the secondary layer
	 */
	private addIcon(card_id: number, index: number, secondary?: boolean) {
        const iconType = secondary ? this.secondaryIconType : this.iconType
        const div = this.getDiv(card_id)!
        div.classList.add("dale-selected");

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
        }
        if (icon) {
            if (secondary) {
                icon.classList.add("dale-selection-icon-2");
            }
            else {
                icon.classList.add("dale-selection-icon-1");
            }
            div.appendChild(icon);
        }
	}

    /**
     * @param card_id card to remove the selection icon from
     * @param secondary (optional) if provided, remove the icon on the secondary layer
     */
    private removeIcon(card_id: number, secondary?: boolean) {
        const div = this.getDiv(card_id);
        const primaryIcon = div?.querySelector(".dale-selection-icon-1");
        const secondaryIcon = div?.querySelector(".dale-selection-icon-2");
        if (secondary) {
            secondaryIcon?.remove();
            if (!primaryIcon) {
                div?.classList.remove("dale-selected");
            }
        }
        else {
            primaryIcon?.remove();
            if (!secondaryIcon) {
                div?.classList.remove("dale-selected");
            }
        }
    }

	/**
	 * Adds the given card from the selection.
	 * @param card_id card_id to add the selection icon to
	 */
	public selectItem(card_id: number, secondary?: boolean) {
        const card_ids = secondary ? this.secondary_card_ids : this.card_ids
        card_ids.push(card_id);
        this.addIcon(card_id, card_ids.length-1, secondary);
        console.log(card_ids);
	}

    /**
	 * Removes the given card from the selection. Does not update the other icons.
	 * @param card_id card_id to remove from the selection
     */
    public unselectItem(card_id: number, secondary?: boolean) {
        const card_ids = secondary ? this.secondary_card_ids : this.card_ids
		const index = card_ids.indexOf(card_id);
		card_ids.splice(index, 1);
        this.removeIcon(card_id, secondary);
        console.log(card_ids);
    }

    /**
     * Unselect all selection and icons. On both the primary and secondary levels
     */
    public unselectAll() {
        console.log("unselectAll (OrderedSelection)");
        for (let card_id of this.card_ids) {
            this.unselectItem(card_id, false);
        }
        for (let card_id of this.secondary_card_ids) {
            this.unselectItem(card_id, true);
        }
        console.log(this.card_ids);
        console.log(this.secondary_card_ids);
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
     * Shift selection icons to ensure the icons remain adjacent. Should be called when the user removes an element from the selection.
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
     * Get the order of the selection as shown by the selection icons
     * @return `card_ids`
     */
    public get(secondary?: boolean): number[] {
        const card_ids = secondary ? this.secondary_card_ids : this.card_ids
        return card_ids.slice().reverse();
    }
}
