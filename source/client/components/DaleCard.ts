import { Images } from './Images';
import { Animalfolk } from './types/Animalfolk';
import { CardType } from './types/CardType';
import { DbCard } from './types/DbCard';

/**
 * A Dale of Merchants Card. All information of the card can be retrieved from this object.
 */
export class DaleCard {
    static cardTypes: CardType[] //initialized during "setup(gamedatas: Gamedatas)"
    static readonly cardIdtoTypeId: Map<number, number> = new Map<number, number>()
    static readonly tooltips: Map<number, dijit.Tooltip> = new Map<number, dijit.Tooltip>();

    public id: number

    /** 
     * Construct a dale card of a given card id. If this is the first time this card id is constructed, the type_id MUST be provided.
     * @param id unique database id for this card instance.
     * @param type_id id that uniquely defines this card's appearance.
     * */
    public constructor(id: number | string, type_id?: number | string) {
        id = +id;
        this.id = id;
        if (type_id != undefined) {
            let prev_type_id = DaleCard.cardIdtoTypeId.get(id);
            if (prev_type_id == undefined) {
                DaleCard.cardIdtoTypeId.set(id, +type_id);
            }
            else if (prev_type_id != type_id) {
                throw new Error(`Card id ${id} with type_id ${prev_type_id} cannot be set to a different type_id ${type_id}.`)
            }
        }
        else if (!DaleCard.cardIdtoTypeId.has(id)) {
            console.log("cardIdtoTypeId");
            console.log(DaleCard.cardIdtoTypeId);
            throw new Error(`The type_id of card_id ${id} is unknown. Therefore, a card with id ${id} cannot be instantiated.`)
        }
    }

    /** 
     * Statically initialize the card types.
     * */
    public static init(cardTypes: {[type_id: number]: CardType}) {
        if (DaleCard.cardTypes) {
            throw new Error("Card types are only be initialized once")
        }
        DaleCard.cardTypes = Object.values(cardTypes);
        // for (let i = 0; i < DaleCard.cardTypes.length; i++) {
        //     const card = cards[i];
        //     // Process the card object
        //     console.log(card);
        // }
    }

    /** 
     * Uniquely defines the appearance of a card (not to be confused with tehcnique/passive typing). 
     * Cards with the same type_id are indistinguishable up to their ids.
     * */
    public get type_id(): number {
        let _type_id = DaleCard.cardIdtoTypeId.get(this.id);
        if (_type_id == undefined) {
            console.warn(`id ${this.id} does not have a corresponding type_id`)
            return 0
        }
        return _type_id
    }

    public get value(): number {
        return DaleCard.cardTypes[this.type_id]!.value
    }

    public get animalfolk(): Animalfolk {
        return DaleCard.cardTypes[this.type_id]!.animalfolk
    }

    public isPlayable(): boolean {
        return DaleCard.cardTypes[this.type_id]!.playable
    }

    private getTooltipContent(): string {
        const cardType = DaleCard.cardTypes[this.type_id]!;
        const animalfolkWithBull = cardType.animalfolk_displayed ? " • "+cardType.animalfolk_displayed : ""
        return `<div class="card-tooltip">
            <h3>${cardType.name}</h3>
            <hr>
            ${cardType.value}${animalfolkWithBull} • ${cardType.type_displayed} ${cardType.has_plus ? "(+)" :""}
            <br><br>
            <div class="text">${cardType.text}</div>
        </div>`
	}

    /**
     * Add a tooltip to the specified tooltip_parent_id. WARNING: each DaleCard card_id can have at most 1 tooltip.
     * @param tooltip_parent_id parent id to attach the tooltip to.
     */
    public addTooltip(tooltip_parent_id: string) {
        if (this.id == 0) return; //card back doesn't have a tooltip
        const parent = $(tooltip_parent_id)
        if (!parent) {
            throw new Error(`DomElement with id '${tooltip_parent_id}' does not exist. Cannot add a tooltip to non-existing parent.`)
        }
        const tooltip = new dijit.Tooltip({
            connectId: [tooltip_parent_id],
            label: this.getTooltipContent(),
            showDelay: 400,
        });
        dojo.connect(parent, "mouseleave", () => {
            tooltip.close();
        });
        DaleCard.tooltips.get(this.id)?.destroy()
        DaleCard.tooltips.set(this.id, tooltip);
    }

    /**
     * @returns a new div element representing this card
     * @param tooltip_parent_id (optional) - if specified, the div will be added to the parent, and it will have a tooltip
     */
    public toDiv(tooltip_parent_id?: string): HTMLElement {
        let div = document.createElement("div")
        div.id = "dale-card-"+this.id
        div.classList.add("card")
        div.setAttribute('style', Images.getCardStyle(this.type_id))
        if (tooltip_parent_id) {
            $(tooltip_parent_id)?.appendChild(div)
            this.addTooltip(tooltip_parent_id);
        }
        return div;
    }

    /**
     * converts a DbCard (from the database table) to a DaleCard (typescript representation of a card)
     * @returns DaleCard
     */
    public static of(card: DbCard) {
        return new DaleCard(card.id, card.type_arg)
    }
}
