import { Animalfolk } from './types/Animalfolk';
import { DbCard } from './types/DBCard';
import { Images } from './Images';

export class DaleCard {
    readonly NAMES: { [card_id: number]: string } = {
        0: "Ace of Spades",
        1: "King of Hearts",
        2: "Queen of Clubs",
        3: "Jack of Diamonds"
    };
    
    
    id: number;
    type_id: number
    location: string
    location_arg: number


    constructor(dbCard: DbCard) {
        this.id = dbCard.id;
        this.type_id = dbCard.type_arg;
        this.location = dbCard.location;
        this.location_arg = dbCard.location_arg;
    }

    get animalfolk(): Animalfolk {
        return Images.getAnimalfolk(this.type_id);
    }
}