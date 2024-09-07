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

    static readonly VERTICAL_STACK_OFFSET = Images.CARD_HEIGHT / 6;
    static readonly STACK_MIN_MARGIN_X = 0.05; //show full placeholders beyond this margin
    static readonly STACK_MAX_MARGIN_X = 0.1; //maximum margin between full placeholders

    static readonly Z_INDEX_CARDBACK = 1;
    static readonly Z_INDEX_CARDFRONT = 2;
    static readonly Z_INDEX_HAND_CARD = 100;
    static readonly Z_INDEX_LIMBO_CARD = 150;
    static readonly Z_INDEX_SELECTED_CARD = 200;
    static readonly Z_INDEX_SLIDING_CARD = 300;
    static readonly Z_INDEX_DECK_ABOVE_SLIDING_CARD = 350;

    static readonly S_SCALE = 0.27;

    static readonly CARD_WIDTH_S =  Math.round(Images.S_SCALE * Images.CARD_WIDTH);
    static readonly CARD_HEIGHT_S =  Math.round(Images.S_SCALE * Images.CARD_HEIGHT);
    static readonly SHEET_WIDTH_S =  Images.CARD_WIDTH_S * Images.IMAGES_PER_ROW;
    static readonly SHEET_HEIGHT_S =  Images.CARD_HEIGHT_S * Images.IMAGES_PER_COLUMN;
    static readonly MARKET_PADDING_TOP_S = Images.S_SCALE * Images.MARKET_PADDING_TOP;
    static readonly MARKET_PADDING_BOTTOM_S = Images.S_SCALE * Images.MARKET_PADDING_BOTTOM;
    static readonly MARKET_PADDING_LEFT_S = Images.S_SCALE * Images.MARKET_PADDING_LEFT;
    static readonly MARKET_PADDING_RIGHT_S = Images.S_SCALE * Images.MARKET_PADDING_RIGHT;
    static readonly MARKET_ITEM_MARGIN_S = Images.S_SCALE * Images.MARKET_ITEM_MARGIN;
    static readonly MARKET_WIDTH_S = Images.S_SCALE * Images.MARKET_WIDTH;
    static readonly MARKET_HEIGHT_S = Images.S_SCALE * Images.MARKET_HEIGHT;
    static readonly VERTICAL_STACK_OFFSET_S = Images.S_SCALE * Images.VERTICAL_STACK_OFFSET;

    static readonly DECK_SELECTION_IMAGES_PER_ROW = 6;
    static readonly DECK_SELECTION_IMAGES_PER_COLUMN = 5;

    /**
     * !!!!! DEPRECATED !!!!! usage of setCardStyle is prefered over this
     * Returns the style of the card of the given type id. 
     * @param card_type_id The id of the card type that needs to be displayed. If card_type_id is null, prepare to display the placeholder image.
     * @returns {string} String that can to be set to an HTML element's style.
     */
    static getCardStyle(card_type_id?: number) {
        let style = `width:${Images.CARD_WIDTH_S}px; height:${Images.CARD_HEIGHT_S}px;`;
        if (card_type_id == null) {
            style += `background-size: ${Images.CARD_WIDTH_S}px ${Images.CARD_HEIGHT_S}px;`
        }
        else {
            style += `background-size: ${Images.IMAGES_PER_ROW}00% ${Images.IMAGES_PER_COLUMN}00%;`
            if (card_type_id >= 0 && card_type_id < Images.IMAGES_PER_ROW * Images.IMAGES_PER_COLUMN) {
                let x = card_type_id % Images.IMAGES_PER_ROW;
                let y = (card_type_id - x) / Images.IMAGES_PER_ROW;
                style += `background-position:-${x}00% -${y}00%;`;
                //style += `z-index: ${card_type_id == 0 ? Images.Z_INDEX_CARDBACK : Images.Z_INDEX_CARDFRONT};`;
            }
            else {
                throw new Error(`Card with type id ${card_type_id} does not exist!`);
            }
        }
        return style;
    }

    /**
     * Sets the style of the card of the given type id. 
     * @param div
     * @param card_type_id The id of the card type that needs to be displayed. If card_type_id is undefined, only set the card dimensions
     */
    static setCardStyle(div: HTMLElement, card_type_id?: number) {
        dojo.setStyle(div, 'width', `${Images.CARD_WIDTH_S}px`);
        dojo.setStyle(div, 'height', `${Images.CARD_HEIGHT_S}px`);
        dojo.setStyle(div, 'background-size', `${Images.IMAGES_PER_ROW}00% ${Images.IMAGES_PER_COLUMN}00%`);
        if (card_type_id !== undefined) {
            if (card_type_id >= 0 && card_type_id < Images.IMAGES_PER_ROW * Images.IMAGES_PER_COLUMN) {
                let x = card_type_id % Images.IMAGES_PER_ROW;
                let y = (card_type_id - x) / Images.IMAGES_PER_ROW;
                dojo.setStyle(div, 'background-position', `-${x}00% -${y}00%`);
            }
            else {
                throw new Error(`Card with type id ${card_type_id} does not exist!`);
            }
        }
    }

    /**
     * Sets the style of the card of the given type id. 
     * @param div
     * @param animalfolk_id
     */
    static setCardStyleForDeckSelection(div: HTMLElement, animalfolk_id: number) {
        Images.setCardStyle(div, animalfolk_id-1);
        dojo.setStyle(div, 'background-size', `${Images.DECK_SELECTION_IMAGES_PER_ROW}00% ${Images.DECK_SELECTION_IMAGES_PER_COLUMN}00%`);
    }

    /**
     * @returns new placeholder div
     */
    static getPlaceholder(): HTMLElement {
        const placeholder = document.createElement('div');
        placeholder.setAttribute('style',`width:${Images.CARD_WIDTH_S}px; height:${Images.CARD_HEIGHT_S}px;`);
        placeholder.classList.add("dale-placeholder")
        return placeholder;
    }
}
