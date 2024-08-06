/**
 * Card representation as received from the database
 */
export interface DbEffect {
    effect_id: string //actually a numerical string (from db)
    card_id: string //actually a numerical string (from db)
    type_id: string //actually a numerical string (from db)
    target: string //actually a numerical string (from db)
    expires: string //actually a numerical string (from db)
}
