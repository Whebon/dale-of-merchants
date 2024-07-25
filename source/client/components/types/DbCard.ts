//Card representation as received from the database
export interface DbCard {
    id: number //actually a string (from db)
    type: string
    type_arg: number //actually a string (from db)
    location: string
    location_arg: number //actually a string (from db)
}
