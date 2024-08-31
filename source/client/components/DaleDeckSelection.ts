import Gamegui = require("ebg/core/gamegui");

import { Images } from "./Images";
import { OrderedSelection } from "./OrderedSelection";
import { Animalfolk } from "./types/Animalfolk";

class OrderedDeckSelection extends OrderedSelection {
    override getDiv(card_id: number): HTMLElement | undefined {
        return document.querySelector(`#deck-${card_id}`) as HTMLAudioElement;
    }
}

export class DaleDeckSelection {
    private gameHTML: HTMLElement;
    private deckSelectionHTML: HTMLElement;
    private cardContainer: HTMLElement;
    private orderedSelection: OrderedDeckSelection = new OrderedDeckSelection();

    public static animalfolkNames: Record<number, Animalfolk> = {
        0: "Macaws",
        1: "Pandas",
        2: "Raccoons",
        3: "Squirrels",
        4: "Ocelots",
        5: "Chameleons"
    }

    constructor(page: Gamegui, deckSelectionHTML: HTMLElement, gameHTML: HTMLElement, inDeckSelection: boolean) {
        this.deckSelectionHTML = deckSelectionHTML;
        this.gameHTML = gameHTML;
        this.cardContainer = (this.deckSelectionHTML.querySelector(".dale-deck-selection-container") as HTMLElement)!;
        if (!inDeckSelection) {
            this.deckSelectionHTML.classList.add("dale-hidden");
            return;
        }
        this.gameHTML.classList.add("dale-hidden");

        this.orderedSelection.setIconType('numbers');
        this.orderedSelection.setMaxSize(Object.values(page.gamedatas.players).length + 1)
        for (let animalfolk_id = 0; animalfolk_id < 26; animalfolk_id++) {
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

            //disable some animalfolk
            const unavailable = (animalfolk_id >= 6);
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
                thiz.orderedSelection.toggle(card_id);
            })
        }
    }

    private getTooltipContent(animalfolk_id: number): string {
        return `TODO: TOOLTIP`;
	}
}
