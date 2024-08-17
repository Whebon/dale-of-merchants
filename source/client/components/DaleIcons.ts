export class DaleIcons {
    private static readonly ROWS = 4;
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
        icon.classList.add("dale-icon");
        icon.setAttribute('style', `
            background-size: ${DaleIcons.COLUMNS}00% ${DaleIcons.ROWS}00%;
            background-position: -${col}00% -${row}00%;
        `)
        return icon;
    }

    /////////////////////////////
    ////////    ROW 1    ////////
    /////////////////////////////

    public static getBluePileIcon(index: number): HTMLElement {
        return this.getIcon(0, index);
    }

    public static getYellowPileIcon(index: number): HTMLElement {
        return this.getIcon(1, index);
    }

    /////////////////////////////
    ////////    ROW 2    ////////
    /////////////////////////////

    public static getDiscardIcon(): HTMLElement {
        return this.getIcon(2, 0);
    }

    public static getBuildIcon(): HTMLElement {
        return this.getIcon(2, 1);
    }

    public static getHandIcon(): HTMLElement {
        return this.getIcon(2, 4);
    }

    public static getChameleonIcon(): HTMLElement {
        return this.getIcon(2, 5);
    }

    /////////////////////////////
    ////////    ROW 3    ////////
    /////////////////////////////

    public static getSpyglassIcon(): HTMLElement {
        return this.getIcon(3, 0);
    }

    public static getDitchIcon(): HTMLElement {
        return this.getIcon(3, 1);
    }
}
