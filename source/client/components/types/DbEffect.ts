/**
 * Card representation as received from the database
 */
export interface RawDbEffect {
    effect_id: number | string
    effect_class: number | string
    card_id: number | string
    type_id: number | string
    arg: number | string | null | "NULL"
}

export class DbEffect {
    effect_id: number
    effect_class: number
    card_id: number
    type_id: number
    arg: number | null

    constructor(effect: RawDbEffect) {
        this.effect_id = +effect.effect_id;
        this.effect_class = +effect.effect_class;
        this.card_id = +effect.card_id;
        this.type_id = +effect.type_id;
        this.arg = (effect.arg == null || effect.arg == "NULL") ? null : +effect.arg;
    }
}
