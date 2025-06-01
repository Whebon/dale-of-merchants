/**
 * Automatically generate based on material.xlsx
 */
class AnimalfolkDetails {
    public static readonly COMPLEXITY = 1;
    public static readonly INTERACTIVITY = 2;
    public static readonly NASTINESS = 3;
    public static readonly RANDOMNESS = 4;
    public static readonly GAME = 5;

    public static get(animalfolk_id: number, column: 1|2|3|4|5) {
        return AnimalfolkDetails.table[animalfolk_id-1][column];
    }

    private static readonly table = [
        [1, 1, 1, 0, 1, 1],
        [2, 1, 2, 0, 1, 1],
        [3, 1, 3, 3, 2, 1],
        [4, 1, 2, 0, 1, 1],
        [5, 2, 3, 2, 3, 1],
        [6, 3, 2, 0, 1, 1],
        [7, 1, 1, 0, 1, 2],
        [8, 2, 1, 0, 1, 2],
        [9, 2, 3, 3, 1, 2],
        [10, 3, 3, 2, 2, 2],
        [11, 1, 2, 0, 3, 2],
        [12, 3, 3, 0, 1, 2],
        [13, 3, 1, 0, 1, 5],
        [14, 1, 1, 0, 0, 3],
        [15, 1, 1, 0, 2, 3],
        [16, 3, 3, 3, 2, 3],
        [17, 2, 3, 1, 2, 3],
        [18, 2, 1, 0, 3, 3],
        [19, 2, 1, 0, 1, 3],
        [20, 2, 1, 0, 1, 4],
        [21, 2, 1, 0, 1, 4],
        [22, 3, 1, 0, 1, 4],
        [23, 2, 3, 1, 2, 6],
        [24, 3, 3, 3, 3, 5],
        [25, 1, 2, 1, 1, 5],
        [26, 3, 1, 0, 1, 6],
        [27, 3, 3, 3, 2, 6],
        [28, 2, 1, 0, 2, 5],
        [29, 2, 1, 0, 1, 4],
        [30, 2, 3, 3, 1, 4],
        [31, 2, 3, 2, 2, 4],
        [32, 2, 1, 0, 1, 5],
        [33, 3, 1, 0, 1, 5],
        [34, 1, 1, 0, 1, 6],
        [35, 2, 1, 0, 1, 6],
        [36, 0, 0, 0, 0, 6]
    ]
}
