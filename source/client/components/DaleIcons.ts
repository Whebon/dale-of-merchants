export class DaleIcons {
    private static readonly ROWS = 10;
    private static readonly COLUMNS = 6;
    
    private static readonly ICON_WIDTH = 150;
    private static readonly ICON_HEIGHT = 150;

    private static readonly BACKGROUND_WIDTH = DaleIcons.ICON_WIDTH * DaleIcons.COLUMNS;
    private static readonly BACKGROUND_HEIGHT = DaleIcons.ICON_HEIGHT * DaleIcons.ROWS;

    /**
     * Get the icon at a given cell in the icon spreadsheet
     * @param row row in the spritesheet
     * @param col column in the spritesheet
     */
    private static getIcon(row: number, col: number): HTMLElement {
        const icon = document.createElement("i");
        icon.classList.add("daleofmerchants-icon");
        icon.setAttribute('style', `
            background-size: ${DaleIcons.COLUMNS}00% ${DaleIcons.ROWS}00%;
            background-position: -${col}00% -${row}00%;
        `)
        return icon;
    }

    ///////////////////////////////
    ////////    ALIASES    ////////
    ///////////////////////////////

    public static getDuplicateEntry(): HTMLElement {
        return this.getHandIcon(); //TODO: should be a 'put aside' icon (these cards are moved to limbo)
    }

    public static getNaturalSurvivorIcon(): HTMLElement {
        return this.getHandIcon(); //TODO: should be a 'deck' icon (these cards are moved from the hand to the deck)
    }

    public static getTravelingEquipmentDitchIcon(): HTMLElement {
        return this.getDitchIcon();
    }

    public static getTravelingEquipmentDiscardIcon(): HTMLElement {
        return this.getDiscardIcon();
    }


    /////////////////////////////
    ////////    ROW 0    ////////
    /////////////////////////////

    public static getBluePileIcon(index: number): HTMLElement {
        return this.getIcon(0, index);
    }

    /////////////////////////////
    ////////    ROW 1    ////////
    /////////////////////////////

    public static getYellowPileIcon(index: number): HTMLElement {
        return this.getIcon(1, index);
    }

    /////////////////////////////
    ////////    ROW 2    ////////
    /////////////////////////////

    public static getRedPileIcon(index: number): HTMLElement {
        return this.getIcon(2, index);
    }

    /////////////////////////////
    ////////    ROW 3    ////////
    /////////////////////////////

    public static getDiscardIcon(): HTMLElement {
        return this.getIcon(3, 0);
    }

    public static getBuildIcon(): HTMLElement {
        const icon = this.getIcon(3, 1);
        icon.classList.add("daleofmerchants-build-icon");
        return icon;
    }

    public static getHandIcon(): HTMLElement {
        return this.getIcon(3, 4);
    }

    public static getChameleonIcon(): HTMLElement {
        return this.getIcon(3, 5);
    }

    /////////////////////////////
    ////////    ROW 4    ////////
    /////////////////////////////

    public static getSpyglassIcon(): HTMLElement {
        return this.getIcon(4, 0);
    }

    public static getDitchIcon(): HTMLElement {
        return this.getIcon(4, 1);
    }

    public static getCheeseIcon(): HTMLElement {
        return this.getIcon(4, 2);
    }

    public static getHistoryLessonIcon(): HTMLElement {
        return this.getIcon(4, 3);
    }

    /////////////////////////////
    ////////    ROW 5    ////////
    /////////////////////////////

    public static getNumberIcon(index: number): HTMLElement {
        return this.getIcon(5, index);
    }

    
    /////////////////////////////
    ////////    ROW 6    ////////
    /////////////////////////////

    public static getCostModificationIcon(index: number): HTMLElement {
        if (index >= 4) {
            throw new Error("CostModificationIcon "+index+" does not exist");
        }
        return this.getIcon(6, index);
    }

        
    public static getCoinIcon(): HTMLElement {
        return this.getIcon(6, 4);
    }


    /////////////////////////////
    ////////    ROW 7    ////////
    /////////////////////////////

    public static getCardIcon(): HTMLElement {
        return this.getIcon(7, 0);
    }

    public static getCards2Icon(): HTMLElement {
        return this.getIcon(7, 1);
    }

    public static getCards3Icon(): HTMLElement {
        return this.getIcon(7, 2);
    }

    public static getCometIcon(): HTMLElement {
        return this.getIcon(7, 3);
    }

    public static getPlanetIcon(): HTMLElement {
        return this.getIcon(7, 4);
    }

    public static getStarsIcon(): HTMLElement {
        return this.getIcon(7, 5);
    }

    /////////////////////////////
    ////////    ROW 8    ////////
    /////////////////////////////

    public static getDawnIcon(): HTMLElement {
        return this.getIcon(8, 0);
    }

    public static getDayIcon(): HTMLElement {
        return this.getIcon(8, 1);
    }

    public static getNightIcon(): HTMLElement {
        return this.getIcon(8, 2);
    }

    public static getClockIcon(): HTMLElement {
        return this.getIcon(8, 3);
    }

    /////////////////////////////
    ////////    ROW 9    ////////
    /////////////////////////////

    public static get3DDieOcelotIcon(): HTMLElement {
        return this.getIcon(9, 0);
    }

    public static get3DDiePolecatIcon(): HTMLElement {
        return this.getIcon(9, 1);
    }

    public static get3DDieHareIcon(): HTMLElement {
        return this.getIcon(9, 2);
    }

    public static get3DDiePangolin1Icon(): HTMLElement {
        return this.getIcon(9, 3);
    }

    public static get3DDiePangolin2Icon(): HTMLElement {
        return this.getIcon(9, 4);
    }
}
