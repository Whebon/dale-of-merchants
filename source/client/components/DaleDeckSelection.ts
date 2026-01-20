import Gamegui = require("ebg/core/gamegui");

import { DaleIcons } from "./DaleIcons"
import { Images } from "./Images";
import { AbstractOrderedSelection } from "./AbstractOrderedSelection";
import { AnimalfolkDetails } from './types/AnimalfolkDetails'
import { DaleCard } from "./DaleCard";
import { DaleAnimalfolk } from "./DaleAnimalfolk";

class OrderedDeckSelection extends AbstractOrderedSelection {
    override getDiv(card_id: number): HTMLElement | undefined {
        return document.querySelector(`#deck-${card_id}`) as HTMLAudioElement;
    }
}

export class DaleDeckSelection {
    private page: Gamegui | undefined;
    private gameHTML: HTMLElement;
    private deckSelectionHTML: HTMLElement;
    private filterContainer: HTMLElement;
    private resetFiltersButton: HTMLElement;
    private pickRandomButton: HTMLElement;
    private cardContainer: HTMLElement;
    private cardContainerUnavailable: HTMLElement;
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

    constructor(page: Gamegui, deckSelectionHTML: HTMLElement, gameHTML: HTMLElement, inDeckSelection: boolean) {
        this.page = page;
        this.deckSelectionHTML = deckSelectionHTML;
        this.gameHTML = gameHTML;
        this.filterContainer = (this.deckSelectionHTML.querySelector(".daleofmerchants-filters") as HTMLElement)!;
        this.resetFiltersButton = this.filterContainer.querySelector("#daleofmerchants-filter-title-reset-filters")!;
        this.pickRandomButton = this.filterContainer.querySelector("#daleofmerchants-pick-random")!;
        this.cardContainer = ($("daleofmerchants-deck-selection-container-available") as HTMLElement)!;
        this.cardContainerUnavailable = ($("daleofmerchants-deck-selection-container-unavailable") as HTMLElement)!;
        this.cardContainer.classList.add("daleofmerchants-wrap-technique");
        if (!inDeckSelection) {
            this.deckSelectionHTML.classList.add("daleofmerchants-hidden");
            return;
        }
        this.gameHTML.classList.add("daleofmerchants-hidden");

        const n = Math.max(2, Object.values(page.gamedatas.players).length);
        this.orderedSelection.setIconType('numbers');
        this.orderedSelection.setMaxSize(n + 1);
        for (let animalfolk_id = DaleAnimalfolk.ANIMALFOLK_MACAWS; animalfolk_id <= DaleAnimalfolk.ANIMALFOLK_BATS; animalfolk_id++) {
            //create card div
            const card_div = document.createElement('div');
            card_div.id = "deck-"+animalfolk_id;
            card_div.classList.add("daleofmerchants-card", "daleofmerchants-relative", "daleofmerchants-clickable", "daleofmerchants-deck-selection");
            this.cardContainer.appendChild(card_div);
            this.card_divs.set(animalfolk_id, card_div);
            Images.setCardStyleForDeckSelection(card_div, animalfolk_id);

            //draw the deck selection portrait on top as a background, so it can be set to a lower opacity without affecting the selection border and icon
            const card_div_background = document.createElement('div');
            card_div.appendChild(card_div_background);
            card_div_background.classList.add("daleofmerchants-deck-selection-background");
            Images.setCardStyleForDeckSelection(card_div_background, animalfolk_id);

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
                    page.showMessage(_("This animalfolk is unavailable on BGA"), 'error');
                    return;
                }
                if (page.isCurrentPlayerActive()) {
                    thiz.orderedSelection.toggle(card_id);
                }
            })
        }

        //move disabled animalfolk to the back
        for (const disabled_animalfolk_id of page.gamedatas.disabledAnimalfolkIds) {
            this.cardContainerUnavailable.appendChild($("deck-"+disabled_animalfolk_id)!);
        }

        this.setupFilters();
    }

    private getTooltipContent(animalfolk_id: number): string {
        const disabled = this.page!.gamedatas.disabledAnimalfolkIds.includes(animalfolk_id);
        let flavour_text = AnimalfolkDetails.getFlavourText(animalfolk_id);
        let footer = "";
        if (disabled) {
            footer = `<hr> <strong>${_("This animalfolk is unavailable on BGA")}</strong>`;
        }
        else if (this.page!.is_solo) {
            const type_id = Images.first_mono_type_id + animalfolk_id - 1
            const cardType = DaleCard.cardTypes[type_id]! 
            //footer = `<strong>${_("Mono will have this card:")}</strong><br>`
            footer = `<hr>
                <strong>${cardType.name} • ${cardType.type_displayed} ${cardType.has_plus ? "(+)":""}</strong><br>
                ${DaleCard.format_string(cardType.text)} <br><br style="line-height: 10px" />`;
        }
        return `<div class="daleofmerchants-card-tooltip">
            <div class="daleofmerchants-card-tooltip-text">${flavour_text}</div>
            <div class="daleofmerchants-card-tooltip-text">${footer}</div>
        </div>`
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
            $("daleofmerchants-title-unavailable-decks")?.classList.add("daleofmerchants-hidden");
            this.cardContainer.classList.remove("daleofmerchants-wrap-technique");
            this.cardContainer.classList.add("daleofmerchants-wrap-purchase");
            this.orderedSelection.unselectAll();
            this.orderedSelection.setIconType(undefined);
            this.cardContainer.querySelectorAll(".daleofmerchants-deck-selection").forEach(card_div => {
                card_div.classList.add("daleofmerchants-hidden");
            });
            this.cardContainerUnavailable.querySelectorAll(".daleofmerchants-deck-selection").forEach(card_div => {
                card_div.classList.add("daleofmerchants-hidden");
            });
        }
        //reveal 1 animalfolk
        const card_div = this.card_divs.get(animalfolk_id);
        if (card_div) {
            card_div.classList.remove("daleofmerchants-deck-selection-unavailable");
            card_div.classList.remove("daleofmerchants-filtered-out");
            if (card_div.classList.contains("daleofmerchants-hidden")) {
                card_div.classList.remove("daleofmerchants-hidden");
                this.cardContainer.append(card_div);
            }
        }
        this.orderedSelection.selectItem(animalfolk_id);
    }

    private setupFilters() {
        //icons
        const icons: [string, HTMLElement][] = [
            ["daleofmerchants-filter-title-reset-filters",  DaleIcons.getResetFiltersDisabledIcon()],
            ["daleofmerchants-filter-title-complexity",     DaleIcons.getComplexityIcon()],
            ["daleofmerchants-filter-title-interactivity",  DaleIcons.getInteractivityIcon()],
            ["daleofmerchants-filter-title-nastiness",      DaleIcons.getNastinessIcon()],
            ["daleofmerchants-filter-title-randomness",     DaleIcons.getRandomnessIcon()],
            ["daleofmerchants-filter-title-game",           DaleIcons.getGameIcon()],
            ["daleofmerchants-pick-random",                 DaleIcons.getRandomIcon()],
        ]
        for (const [html_id, icon] of icons) {
            $(html_id)!.insertAdjacentHTML('afterbegin', `<span class="daleofmerchants-log-span">${icon.outerHTML}</span>`);
        }
        const warningIcon = DaleIcons.getWarningIcon();
        this.filterContainer.querySelectorAll(".daleofmerchants-warning").forEach((elem) => {
            elem.insertAdjacentHTML('afterbegin', `<span class="daleofmerchants-log-span">${warningIcon.outerHTML}</span>`);
        });

        //toggles
        this.filterContainer.querySelectorAll(".toggle").forEach((toggle) => {
            const rawData = (toggle as HTMLElement).dataset['filter'] ?? "";
            if (!rawData.includes(":")) {
                console.error(toggle);
                console.error("The toggle was expected to hold 'data-filter' of format 'category: value'");
                return;
            }
            const [categoryName, rawValue] = rawData.split(":").map(s => s.trim());
            const value = +rawValue!;
            const warningElement = toggle.parentElement?.parentElement?.querySelector(".daleofmerchants-warning");
            toggle.addEventListener("click", () => {
                const columnIndex = AnimalfolkDetails.getColumnIndex(categoryName!);
                const blacklist = this.filterBlacklists.get(columnIndex)!;
                const valueIndex = blacklist.indexOf(value);
                if (valueIndex !== -1) {
                    blacklist.splice(valueIndex, 1);
                    toggle.classList.add("chosen");
                    warningElement?.classList.add("daleofmerchants-hidden");
                } else {
                    blacklist.push(value);
                    toggle.classList.remove("chosen");
                    if (!toggle.parentElement?.querySelector(".chosen")) {
                        warningElement?.classList.remove("daleofmerchants-hidden");
                    }
                }
                this.updateResetFiltersButton();
                this.updateFilters();
            });
        });

        //reset toggles
        this.resetFiltersButton.addEventListener("click", () => {
            this.resetFilters();
        })

        //pick random toggle
        this.pickRandomButton.addEventListener("click", () => {
            this.pickRandom();
        })

        //collapsible
        this.filterContainer.querySelector("h2")?.addEventListener("click", () => {
            this.filterContainer.classList.toggle("daleofmerchants-collapsed");
        })
        this.filterContainer.classList.add("daleofmerchants-collapsed"); // Sami: "Whenever the filters are on top (not on the side), they should be hidden by default"
    }

    private resetFilters() {
         this.filterContainer.querySelectorAll(".toggle").forEach((toggle) => {
            if (!toggle.classList.contains("chosen")) {
                (toggle as HTMLElement).click();
            }
        })
    }

    /**
     * Returns all animalfolk_ids that pass the current filters and is not selected already
     */
    private getSelectableAnimalfolkIds(): number[] {
        let animalfolk_ids = [];
        for (let animalfolk_id = DaleAnimalfolk.ANIMALFOLK_MACAWS; animalfolk_id <= DaleAnimalfolk.ANIMALFOLK_BATS; animalfolk_id++) {
            const div = this.card_divs.get(animalfolk_id)!
            const isHidden = div.classList.contains("daleofmerchants-hidden");
            const isFilteredOut = div.classList.contains("daleofmerchants-filtered-out");
            const isDisabled = div.classList.contains("daleofmerchants-deck-selection-unavailable");
            const isAlreadySelected = this.orderedSelection.includes(animalfolk_id);
            if (!isHidden && !isFilteredOut && !isDisabled && !isAlreadySelected) {
                animalfolk_ids.push(animalfolk_id);
            }
        }
        return animalfolk_ids;
    }

    private pickRandom() {
        const animalfolk_ids = this.getSelectableAnimalfolkIds();
        if (animalfolk_ids.length > 0) {
            const random_index = Math.floor(Math.random() * animalfolk_ids.length);
            const animalfolk_id = animalfolk_ids[random_index]!;
            this.orderedSelection.selectItem(animalfolk_id);
        }
    }
    
    private updateResetFiltersButton() {
        const hasActiveFilter = Array.from(this.filterBlacklists.values()).some(blacklist => blacklist.length > 0);
        this.resetFiltersButton.classList.toggle("active", hasActiveFilter);
        const prevIcon = this.resetFiltersButton.querySelector(".daleofmerchants-icon")!;
        if (prevIcon) {
            const newIcon = hasActiveFilter ? DaleIcons.getResetFiltersEnabledIcon() : DaleIcons.getResetFiltersDisabledIcon();
            prevIcon.insertAdjacentHTML('beforebegin', newIcon.outerHTML); //`<span class="daleofmerchants-log-span">${newIcon.outerHTML}</span>`);
            prevIcon.remove();
        }
    }

    private updateFilters() {
        for (let animalfolk_id = DaleAnimalfolk.ANIMALFOLK_MACAWS; animalfolk_id <= DaleAnimalfolk.ANIMALFOLK_BATS; animalfolk_id++) {
            let isHidden = false;
            this.filterBlacklists.forEach((blacklist, category) => {
                if (blacklist.includes(AnimalfolkDetails.get(animalfolk_id, category))) {
                    isHidden = true;
                }
            });
            this.card_divs.get(animalfolk_id)?.classList.toggle("daleofmerchants-filtered-out", isHidden);
        }
    }
}
