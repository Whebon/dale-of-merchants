import Gamegui = require("ebg/core/gamegui");

import { DaleIcons } from "./DaleIcons"
import { Images } from "./Images";
import { AbstractOrderedSelection } from "./AbstractOrderedSelection";
import { AnimalfolkDetails } from './types/AnimalfolkDetails'

class OrderedDeckSelection extends AbstractOrderedSelection {
    override getDiv(card_id: number): HTMLElement | undefined {
        return document.querySelector(`#deck-${card_id}`) as HTMLAudioElement;
    }
}

export class DaleDeckSelection {
    private gameHTML: HTMLElement;
    private deckSelectionHTML: HTMLElement;
    private filterContainer: HTMLElement;
    private resetFiltersButton: HTMLElement;
    private cardContainer: HTMLElement;
    public orderedSelection: OrderedDeckSelection = new OrderedDeckSelection();

    private card_divs: Map<number, HTMLElement> = new Map();

    private filterBlacklists: Map<number, number[]> = new Map([
        [AnimalfolkDetails.COMPLEXITY, []],
        [AnimalfolkDetails.INTERACTIVITY, []],
        [AnimalfolkDetails.NASTINESS, []],
        [AnimalfolkDetails.RANDOMNESS, []],
        [AnimalfolkDetails.GAME, []]
    ]);

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
    static readonly ANIMALFOLK_DODOS: number = 29;
    static readonly ANIMALFOLK_CAPUCHINMONKIES: number = 30;
    static readonly ANIMALFOLK_MARKETMANIPULATION: number = 31;
    static readonly ANIMALFOLK_ENDOFTURN: number = 32;
    static readonly ANIMALFOLK_REPEAT: number = 33;
    static readonly ANIMALFOLK_GORILLA: number = 34;
    static readonly ANIMALFOLK_MORNING: number = 35;
    static readonly ANIMALFOLK_UNKNOWN: number = 36;

    constructor(page: Gamegui, deckSelectionHTML: HTMLElement, gameHTML: HTMLElement, inDeckSelection: boolean) {
        this.deckSelectionHTML = deckSelectionHTML;
        this.gameHTML = gameHTML;
        this.filterContainer = (this.deckSelectionHTML.querySelector(".daleofmerchants-filters") as HTMLElement)!;
        this.resetFiltersButton = this.filterContainer.querySelector(".reset-filters")!;
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
        for (let animalfolk_id = DaleDeckSelection.ANIMALFOLK_MACAWS; animalfolk_id <= DaleDeckSelection.ANIMALFOLK_UNKNOWN; animalfolk_id++) {
            //create card div
            const card_div = document.createElement('div');
            card_div.id = "deck-"+animalfolk_id;
            card_div.classList.add("daleofmerchants-card", "daleofmerchants-relative", "daleofmerchants-clickable", "daleofmerchants-deck-selection");
            this.cardContainer.appendChild(card_div);
            Images.setCardStyleForDeckSelection(card_div, animalfolk_id);
            this.card_divs.set(animalfolk_id, card_div);

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

        this.setupFilters();
    }

    private getTooltipContent(animalfolk_id: number): string {
        return `TODO: TOOLTIP`;
	}

    /**
     * Remove all elements related to the deck selection and show the actual game
     */
    public remove() {
        this.filterContainer.remove();
        this.cardContainer.remove();
        for (let tooltip of this.tooltips) {
            tooltip.destroy();
        }
        this.gameHTML.classList.remove("daleofmerchants-hidden");
    }

    public setResult(animalfolk_id: number) {
        //if not done yet, set the deck selection to 'reveal' mode (this uses the purchase wrap)
        if (this.cardContainer.classList.contains("daleofmerchants-wrap-technique")) {
            this.cardContainer.classList.remove("daleofmerchants-wrap-technique");
            this.cardContainer.classList.add("daleofmerchants-wrap-purchase");
            this.orderedSelection.unselectAll();
            this.orderedSelection.setIconType(undefined);
            this.cardContainer.querySelectorAll(".daleofmerchants-deck-selection").forEach(card_div => {
                card_div.classList.add("daleofmerchants-deck-selection-unavailable");
                card_div.classList.add("daleofmerchants-hidden"); //BOTCH: hide all cards!
            });
        }
        //reveal 1 animalfolk
        const card_div = this.card_divs.get(animalfolk_id);
        if (card_div) {
            card_div.classList.remove("daleofmerchants-deck-selection-unavailable");
            if (card_div.classList.contains("daleofmerchants-hidden")) {
                //if the chosen card is not visible due to filters, show it and append the portait to the back
                card_div.classList.remove("daleofmerchants-hidden");
                this.cardContainer.append(card_div);
            }
        }
        this.orderedSelection.selectItem(animalfolk_id);
    }

    private setupFilters() {
        const icons: [string, HTMLElement][] = [
            ["daleofmerchants-filter-title-reset-filters",  DaleIcons.getResetFiltersDisabledIcon()],
            ["daleofmerchants-filter-title-complexity",     DaleIcons.getComplexityIcon()],
            ["daleofmerchants-filter-title-interactivity",  DaleIcons.getInteractivityIcon()],
            ["daleofmerchants-filter-title-nastiness",      DaleIcons.getNastinessIcon()],
            ["daleofmerchants-filter-title-randomness",     DaleIcons.getRandomnessIcon()],
            ["daleofmerchants-filter-title-game",           DaleIcons.getGameIcon()]
        ]
        for (const [html_id, icon] of icons) {
            $(html_id)!.insertAdjacentHTML('afterbegin', `<span class="daleofmerchants-log-span">${icon.outerHTML}</span>`);
        }
        this.filterContainer.querySelectorAll(".toggle").forEach((toggle) => {
            const rawData = (toggle as HTMLElement).dataset['filter'] ?? "";
            if (!rawData.includes(":")) {
                console.error(toggle);
                console.error("The toggle was expected to hold 'data-filter' of format 'category: value'");
                return;
            }
            const [categoryName, rawValue] = rawData.split(":").map(s => s.trim());
            const value = +rawValue!;
            toggle.addEventListener("click", () => {
                const columnIndex = AnimalfolkDetails.getColumnIndex(categoryName!);
                const blacklist = this.filterBlacklists.get(columnIndex)!;
                const valueIndex = blacklist.indexOf(value);
                if (valueIndex !== -1) {
                    blacklist.splice(valueIndex, 1);
                    toggle.classList.add("chosen");
                } else {
                    blacklist.push(value);
                    toggle.classList.remove("chosen");
                }
                this.updateResetFiltersButton();
                this.updateFilters();
            });
        });
        this.resetFiltersButton.addEventListener("click", () => {
            this.resetFilters();
        })
    }

    private resetFilters() {
         this.filterContainer.querySelectorAll(".toggle").forEach((toggle) => {
            if (!toggle.classList.contains("chosen")) {
                (toggle as HTMLElement).click();
            }
        })
    }
    
    private updateResetFiltersButton() {
        const hasActiveFilter = Array.from(this.filterBlacklists.values()).some(blacklist => blacklist.length > 0);
        this.resetFiltersButton.classList.toggle("active", hasActiveFilter);
        const prevIcon = this.resetFiltersButton.querySelector(".daleofmerchants-icon")!;
        if (prevIcon) {
            const newIcon = hasActiveFilter ? DaleIcons.getResetFiltersEnabledIcon() : DaleIcons.getResetFiltersDisabledIcon();
            prevIcon.insertAdjacentHTML('beforebegin', `<span class="daleofmerchants-log-span">${newIcon.outerHTML}</span>`);
            prevIcon.remove();
        }
    }

    private updateFilters() {
        for (let animalfolk_id = DaleDeckSelection.ANIMALFOLK_MACAWS; animalfolk_id <= DaleDeckSelection.ANIMALFOLK_UNKNOWN; animalfolk_id++) {
            let isHidden = false;
            this.filterBlacklists.forEach((blacklist, category) => {
                if (blacklist.includes(AnimalfolkDetails.get(animalfolk_id, category))) {
                    isHidden = true;
                }
            });
            this.card_divs.get(animalfolk_id)?.classList.toggle("daleofmerchants-hidden", isHidden);
        }
    }
}
