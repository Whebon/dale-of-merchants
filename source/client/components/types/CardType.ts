import { DaleTrigger } from "./DaleTrigger";

/**
 * TS representation of values in "$this->card_types" from material.inc.php
 */
export interface CardType {
    type_id: number;                    // index on the image sheet
    name: string;                       // translatable card name. IMPORTANT: should be wrapped around _().
    text: string;                       // translatable card description. IMPORTANT: should be wrapped around _().
    type_displayed: string;             // translatable "Technique" or "Passive". IMPORTANT: should be wrapped around _().
    is_technique: boolean;              // technique or passive
    has_plus: boolean;                  // (is_technique == true) && has a plus sign
    has_ability: boolean;               // (is_technique == false) && has an active ability
    playable: boolean;                  // (is_technique == true) || (has_ability == true)
    trigger: DaleTrigger;               // when will this card resolve. (null = immediately)
    value: number;                      // base value of this card
    nbr: number;                        // number of copies of this card deck in the initial deck
    animalfolk_id: number;              // animalfolk set name
    animalfolk_displayed: string;       // translatable animalfolk set name. IMPORTANT: should be wrapped around _().
    is_mono: boolean;                   // indicates if this is a Mono card
}
