import Gamegui = require("ebg/core/gamegui");

import { Images } from "./Images";
import { OrderedSelection } from "./OrderedSelection";

class OrderedDeckSelection extends OrderedSelection {
    override getDiv(card_id: number): HTMLElement | undefined {
        return document.querySelector(`#deck-${card_id}`) as HTMLAudioElement;
    }
}

export class DaleDeckSelection {
    private gameHTML: HTMLElement;
    private deckSelectionHTML: HTMLElement;
    private cardContainer: HTMLElement;
    public orderedSelection: OrderedDeckSelection = new OrderedDeckSelection();

    private tooltips: dijit.Tooltip[] = [];

    constructor(page: Gamegui, deckSelectionHTML: HTMLElement, gameHTML: HTMLElement, inDeckSelection: boolean) {
        this.deckSelectionHTML = deckSelectionHTML;
        this.gameHTML = gameHTML;
        this.cardContainer = (this.deckSelectionHTML.querySelector(".dale-deck-selection-container") as HTMLElement)!;
        this.cardContainer.classList.add("dale-wrap-technique");
        if (!inDeckSelection) {
            this.deckSelectionHTML.classList.add("dale-hidden");
            return;
        }
        this.gameHTML.classList.add("dale-hidden");

        this.orderedSelection.setIconType('numbers');
        this.orderedSelection.setMaxSize(Object.values(page.gamedatas.players).length + 1)
        for (let animalfolk_id = 1; animalfolk_id < 27; animalfolk_id++) {
            //create card div
            const card_div = document.createElement('div');
            card_div.id = "deck-"+animalfolk_id;
            card_div.classList.add("dale-card", "dale-relative", "dale-clickable", "dale-deck-selection");
            this.cardContainer.appendChild(card_div);
            Images.setCardStyleForDeckSelection(card_div, animalfolk_id);

            //add tooltip
            const tooltip = new dijit.Tooltip({
                connectId: [card_div.id],
                label: this.getTooltipContent(animalfolk_id),
                showDelay: 400,
            });
            dojo.connect(card_div, "mouseleave", () => {
                tooltip.close();
            });
            this.tooltips.push(tooltip);

            //disable some animalfolk
            const unavailable = (animalfolk_id < 1 || animalfolk_id > 6);
            if (unavailable) {
                card_div.classList.add("dale-deck-selection-unavailable");
            }

            //make selectable
            const thiz = this;
            const card_id = animalfolk_id;
            card_div.addEventListener('click', () => {
                if (unavailable) {
                    page.showMessage(_("This animalfolk does not exist"), 'error');
                    return;
                }
                if (page.isCurrentPlayerActive()) {
                    thiz.orderedSelection.toggle(card_id);
                }
            })
        }
    }

    private getTooltipContent(animalfolk_id: number): string {
        return `TODO: TOOLTIP`;
	}

    /**
     * Remove all elements related to the deck selection and show the actual game
     */
    public remove() {
        this.cardContainer.remove();
        for (let tooltip of this.tooltips) {
            tooltip.destroy();
        }
        this.gameHTML.classList.remove("dale-hidden");
    }

    public setResult(animalfolk_id: number) {
        if (this.cardContainer.classList.contains("dale-wrap-technique")) {
            this.cardContainer.classList.remove("dale-wrap-technique");
            this.cardContainer.classList.add("dale-wrap-purchase");
            this.orderedSelection.unselectAll();
            this.orderedSelection.setIconType(undefined);
            this.cardContainer.querySelectorAll(".dale-deck-selection").forEach(card_div => {
                card_div.classList.add("dale-deck-selection-unavailable");
            });
        }
        $("deck-"+animalfolk_id)?.classList.remove("dale-deck-selection-unavailable");
        this.orderedSelection.selectItem(animalfolk_id);
    }
}
