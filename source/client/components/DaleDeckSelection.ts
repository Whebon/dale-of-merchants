import Gamegui = require("ebg/core/gamegui");

import { Images } from "./Images";
import { AbstractOrderedSelection } from "./AbstractOrderedSelection";

class OrderedDeckSelection extends AbstractOrderedSelection {
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

    //Non-animalfolk
    static readonly ANIMALFOLK_NONE: number = 0;

    //DoM1
    static readonly ANIMALFOLK_MACAWS: number = 1;
    static readonly ANIMALFOLK_PANDAS: number = 2;
    static readonly ANIMALFOLK_RACCOONS: number = 3;
    static readonly ANIMALFOLK_SQUIRRELS: number = 4;
    static readonly ANIMALFOLK_OCELOTS: number = 5;
    static readonly ANIMALFOLK_CHAMELEONS: number = 6;

    //DoM2
    static readonly ANIMALFOLK_PLATYPUSES: number = 7;
    static readonly ANIMALFOLK_SLOTHS: number = 8;
    static readonly ANIMALFOLK_CROCODILES: number = 9;
    static readonly ANIMALFOLK_FOXES: number = 10;
    static readonly ANIMALFOLK_POLECATS: number = 11;
    static readonly ANIMALFOLK_OWLS: number = 12;

    //Beavers
    static readonly ANIMALFOLK_BEAVERS: number = 13;

    //DoM3
    static readonly ANIMALFOLK_DESERTMONITORS: number = 14;
    static readonly ANIMALFOLK_LEMURS: number = 15;
    static readonly ANIMALFOLK_MAGPIES: number = 16;
    static readonly ANIMALFOLK_ECHIDNAS: number = 17;
    static readonly ANIMALFOLK_HARES: number = 18;
    static readonly ANIMALFOLK_TREEKANGAROOS: number = 19;

    //DoMC
    static readonly ANIMALFOLK_PENGUINS: number = 20;
    static readonly ANIMALFOLK_TUATARAS: number = 21;
    static readonly ANIMALFOLK_WOODTURTLES: number = 22;
    static readonly ANIMALFOLK_TASMANIANDEVILS: number = 23;
    static readonly ANIMALFOLK_PANGOLINS: number = 24;
    static readonly ANIMALFOLK_GULLS: number = 25;
    static readonly ANIMALFOLK_MONGOOSES: number = 26;
    static readonly ANIMALFOLK_BATS: number = 27;

    //10th anniversary
    static readonly ANIMALFOLK_SNOWMACAQUES: number = 28;

    constructor(page: Gamegui, deckSelectionHTML: HTMLElement, gameHTML: HTMLElement, inDeckSelection: boolean) {
        this.deckSelectionHTML = deckSelectionHTML;
        this.gameHTML = gameHTML;
        this.cardContainer = (this.deckSelectionHTML.querySelector(".daleofmerchants-deck-selection-container") as HTMLElement)!;
        this.cardContainer.classList.add("daleofmerchants-wrap-technique");
        if (!inDeckSelection) {
            this.deckSelectionHTML.classList.add("daleofmerchants-hidden");
            return;
        }
        this.gameHTML.classList.add("daleofmerchants-hidden");

        const n = Math.max(2, Object.values(page.gamedatas.players).length);
        this.orderedSelection.setIconType('numbers');
        this.orderedSelection.setMaxSize(n + 1);
        for (let animalfolk_id = 1; animalfolk_id <= DaleDeckSelection.ANIMALFOLK_SNOWMACAQUES; animalfolk_id++) {
            //create card div
            const card_div = document.createElement('div');
            card_div.id = "deck-"+animalfolk_id;
            card_div.classList.add("daleofmerchants-card", "daleofmerchants-relative", "daleofmerchants-clickable", "daleofmerchants-deck-selection");
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
            const unavailable = page.gamedatas.disabledAnimalfolkIds.includes(animalfolk_id);
            if (unavailable) {
                card_div.classList.add("daleofmerchants-deck-selection-unavailable");
            }

            //make selectable
            const thiz = this;
            const card_id = animalfolk_id;
            card_div.addEventListener('click', () => {
                if (unavailable) {
                    page.showMessage(_("This animalfolk is unavailable"), 'error');
                    return;
                }
                if (page.isCurrentPlayerActive()) {
                    thiz.orderedSelection.toggle(card_id);
                }
            })
        }

        //move disabled animalfolk to the back
        for (const disabled_animalfolk_id of page.gamedatas.disabledAnimalfolkIds) {
            console.log("deck-"+disabled_animalfolk_id);
            this.cardContainer.appendChild($("deck-"+disabled_animalfolk_id)!);
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
        this.gameHTML.classList.remove("daleofmerchants-hidden");
    }

    public setResult(animalfolk_id: number) {
        if (this.cardContainer.classList.contains("daleofmerchants-wrap-technique")) {
            this.cardContainer.classList.remove("daleofmerchants-wrap-technique");
            this.cardContainer.classList.add("daleofmerchants-wrap-purchase");
            this.orderedSelection.unselectAll();
            this.orderedSelection.setIconType(undefined);
            this.cardContainer.querySelectorAll(".daleofmerchants-deck-selection").forEach(card_div => {
                card_div.classList.add("daleofmerchants-deck-selection-unavailable");
            });
        }
        $("deck-"+animalfolk_id)?.classList.remove("daleofmerchants-deck-selection-unavailable");
        this.orderedSelection.selectItem(animalfolk_id);
    }
}
