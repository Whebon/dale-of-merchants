export const IMAGES_PER_ROW = 7;
export const IMAGES_PER_COLUMN = 6;

export const SHEET_WIDTH = 2694;
export const SHEET_HEIGHT = 5112;
export const CARD_WIDTH = SHEET_WIDTH / IMAGES_PER_COLUMN;
export const CARD_HEIGHT = SHEET_HEIGHT / IMAGES_PER_ROW;

export const MARKET_PADDING_TOP = 153;
export const MARKET_PADDING_BOTTOM = 45;
export const MARKET_PADDING_LEFT = 45;
export const MARKET_PADDING_RIGHT = 45;
export const MARKET_ITEM_MARGIN = 95;
export const MARKET_WIDTH = 2717;
export const MARKET_HEIGHT = 906;

export const S_SCALE = 0.3;

export const SHEET_WIDTH_S = S_SCALE * SHEET_WIDTH;
export const SHEET_HEIGHT_S = S_SCALE * SHEET_HEIGHT;
export const CARD_WIDTH_S = S_SCALE * CARD_WIDTH;
export const CARD_HEIGHT_S = S_SCALE * CARD_HEIGHT;

export const MARKET_PADDING_TOP_S = S_SCALE * MARKET_PADDING_TOP;
export const MARKET_PADDING_BOTTOM_S = S_SCALE * MARKET_PADDING_BOTTOM;
export const MARKET_PADDING_LEFT_S = S_SCALE * MARKET_PADDING_LEFT;
export const MARKET_PADDING_RIGHT_S = S_SCALE * MARKET_PADDING_RIGHT;
export const MARKET_ITEM_MARGIN_S = S_SCALE * MARKET_ITEM_MARGIN;
export const MARKET_WIDTH_S = S_SCALE * MARKET_WIDTH;
export const MARKET_HEIGHT_S = S_SCALE * MARKET_HEIGHT;

/**
 * Returns the style of the card of the given id. 
 * @param card_id The id of the card type that needs to be displayed. If card_id is null, prepare to display the placeholder image.
 * @returns {string} String that can to be set to an HTML element's style.
 */
export function get_card_style(card_id?: number) {
    let style = `width:${CARD_WIDTH_S}px; height:${CARD_HEIGHT_S}px;`;
    if (card_id == null) {
        style += `background-size: ${CARD_WIDTH_S}px ${CARD_HEIGHT_S}px;`
    }
    else {
        style += `background-size: ${SHEET_WIDTH_S}px ${SHEET_HEIGHT_S}px;`
        if (card_id >= 0 && card_id < IMAGES_PER_ROW*IMAGES_PER_COLUMN) {
            let x = card_id%IMAGES_PER_ROW;
            let y = (card_id - x) / IMAGES_PER_ROW;
            style += `background-position:-${x}00% -${y}00%`;
        }
        else {
            console.error(`Card with id ${card_id} does not exist!`);
        }
    }
    return style;
}
