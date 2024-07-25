import { Images } from './Images';
import { Animalfolk } from './types/Animalfolk';
import { CardType } from './types/CardType';

/**
 * A Dale of Merchants Card. All information of the card can be retrieved from this object.
 */
export class DaleCard {
    static cardTypes: CardType[] //initialized during "setup(gamedatas: Gamedatas)"
    static readonly cardIdtoTypeId: Map<number, number> = new Map<number, number>()

    id: number

    /** 
     * Construct a dale card of a given card id. If this is the first time this card id is constructed, the type_id MUST be provided.
     * @param id unique database id for this card instance.
     * @param type_id id that uniquely defines this card's appearance.
     * */
    constructor(id: number, type_id?: number) {
        this.id = id;
        if (type_id != undefined) {
            let prev_type_id = DaleCard.cardIdtoTypeId.get(id);
            if (prev_type_id == undefined) {
                DaleCard.cardIdtoTypeId.set(id, type_id);
            }
            else if (prev_type_id != type_id) {
                throw new Error(`Card id ${id} with type_id ${prev_type_id} cannot be set to a different type_id ${type_id}.`)
            }
        }
        else if (!DaleCard.cardIdtoTypeId.has(id)) {
            throw new Error(`The type_id of card_id ${id} is unknown. Therefore, a card with id ${id} cannot be instantiated.`)
        }
    }

    /** 
     * Statically initialize the card types.
     * */
    static init(cardTypes: {[type_id: number]: CardType}) {
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
    get type_id(): number {
        let _type_id = DaleCard.cardIdtoTypeId.get(this.id);
        if (_type_id == undefined) {
            console.warn(`id ${this.id} does not have a corresponding type_id`)
            return 0
        }
        return _type_id
    }

    get name(): string {
        return DaleCard.cardTypes[this.type_id]!.name
    }

    get text(): string {
        return DaleCard.cardTypes[this.type_id]!.text
    }

    get value(): number {
        return DaleCard.cardTypes[this.type_id]!.value
    }

    get animalfolk(): Animalfolk {
        return DaleCard.cardTypes[this.type_id]!.animalfolk
    }

    /**
     * @returns a new div element representing this card
     */
    toDiv(): HTMLElement {
        let div = document.createElement("div");
        div.classList.add("card");
        div.setAttribute('style', Images.getCardStyle(this.type_id));
        return div;
    }
}
