import { Animalfolk } from "./Animalfolk";

/**
 * TS representation of values in "$this->card_types" from material.inc.php
 */
export interface CardType {
    type_id: number; //because type_arg is also a string
    name: string;
    text: string;
    has_plus: boolean;
    type: number;
    value: number;
    nbr: number;
    animalfolk: Animalfolk;
}
