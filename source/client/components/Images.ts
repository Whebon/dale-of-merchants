import { Animalfolk } from "./types/Animalfolk";

export class Images {
    static readonly IMAGES_PER_ROW = 6;
    static readonly IMAGES_PER_COLUMN = 7;

    static readonly SHEET_WIDTH = 2694;
    static readonly SHEET_HEIGHT = 4907;
    static readonly CARD_WIDTH = Images.SHEET_WIDTH / Images.IMAGES_PER_ROW;
    static readonly CARD_HEIGHT = Images.SHEET_HEIGHT / Images.IMAGES_PER_COLUMN;

    static readonly MARKET_PADDING_TOP = 156;
    static readonly MARKET_PADDING_BOTTOM = 42;
    static readonly MARKET_PADDING_LEFT = 45;
    static readonly MARKET_PADDING_RIGHT = 45;
    static readonly MARKET_ITEM_MARGIN = 95;
    static readonly MARKET_WIDTH = 2717;
    static readonly MARKET_HEIGHT = 906;

    static readonly S_SCALE = 0.28;

    static readonly SHEET_WIDTH_S = Images.S_SCALE * Images.SHEET_WIDTH;
    static readonly SHEET_HEIGHT_S = Images.S_SCALE * Images.SHEET_HEIGHT;
    static readonly CARD_WIDTH_S = Images.S_SCALE * Images.CARD_WIDTH;
    static readonly CARD_HEIGHT_S = Images.S_SCALE * Images.CARD_HEIGHT;
    static readonly MARKET_PADDING_TOP_S = Images.S_SCALE * Images.MARKET_PADDING_TOP;
    static readonly MARKET_PADDING_BOTTOM_S = Images.S_SCALE * Images.MARKET_PADDING_BOTTOM;
    static readonly MARKET_PADDING_LEFT_S = Images.S_SCALE * Images.MARKET_PADDING_LEFT;
    static readonly MARKET_PADDING_RIGHT_S = Images.S_SCALE * Images.MARKET_PADDING_RIGHT;
    static readonly MARKET_ITEM_MARGIN_S = Images.S_SCALE * Images.MARKET_ITEM_MARGIN;
    static readonly MARKET_WIDTH_S = Images.S_SCALE * Images.MARKET_WIDTH;
    static readonly MARKET_HEIGHT_S = Images.S_SCALE * Images.MARKET_HEIGHT;

    /**
     * Returns the style of the card of the given id. 
     * @param card_type_id The id of the card type that needs to be displayed. If card_type_id is null, prepare to display the placeholder image.
     * @returns {string} String that can to be set to an HTML element's style.
     */
    static getCardStyle(card_type_id?: number) {
        let style = `width:${Images.CARD_WIDTH_S}px; height:${Images.CARD_HEIGHT_S}px;`;
        if (card_type_id == null) {
            style += `background-size: ${Images.CARD_WIDTH_S}px ${Images.CARD_HEIGHT_S}px;`
        }
        else {
            style += `background-size: ${Images.SHEET_WIDTH_S}px ${Images.SHEET_HEIGHT_S}px;`
            if (card_type_id >= 0 && card_type_id < Images.IMAGES_PER_ROW * Images.IMAGES_PER_COLUMN) {
                let x = card_type_id % Images.IMAGES_PER_ROW;
                let y = (card_type_id - x) / Images.IMAGES_PER_ROW;
                style += `background-position:-${x}00% -${y}00%`;
            }
            else {
                console.error(`Card with type id ${card_type_id} does not exist!`);
            }
        }
        return style;
    }
}
