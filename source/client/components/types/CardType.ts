import { Animalfolk } from "./Animalfolk";

/**
 * TS representation of values in "$this->card_types" from material.inc.php
 */
export interface CardType {
    type_id: number;                    // index on the image sheet
    name: string;                       // translated card name
    text: string;                       // translated card description
    type_displayed: string;             // translated "Technique" or "Passive"
    is_technique: boolean;              // technique or passive
    has_plus: boolean;                  // (is_technique == true) && has a plus sign
    has_active: boolean;                // (is_technique == false) && has an active ability
    playable: boolean;                  // (is_technique == true) || (has_active == true)
    value: number;                      // base value of this card
    nbr: number;                        // number of copies of this card deck in the initial deck
    animalfolk: Animalfolk;             // animalfolk set name
    animalfolk_displayed: string;       // translated animalfolk set name
}
