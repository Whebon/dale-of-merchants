/**
 * Card representation as received from the database
 */
export interface DbEffect {
    effect_id: number
    effect_class: number
    card_id: number
    type_id: number
    arg: number | null
    chameleon_target_id: number | null
}
