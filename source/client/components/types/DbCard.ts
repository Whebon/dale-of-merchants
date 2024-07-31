/**
 * Card representation as received from the database
 */
export interface DbCard {
    id: string //actually a numerical string (from db)
    type: string
    type_arg: string //actually a numerical string (from db)
    location: string
    location_arg: string //actually a numerical string (from db)
}
