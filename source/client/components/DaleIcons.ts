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

    public static getBuildIcon(): HTMLElement {
        return this.getIcon(2, 1);
    }
}

//background-size: ${DaleIcons.COLUMNS*width}px ${DaleIcons.ROWS*height}px;

//background-size: ${width*DaleIcons.ROWS}px ${height*DaleIcons.COLUMNS}px;
