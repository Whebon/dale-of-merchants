import pandas as pd

template = """/**
 * Automatically generate based on material.xlsx
 */
export class AnimalfolkDetails {
    public static readonly COMPLEXITY = 1;
    public static readonly INTERACTIVITY = 2;
    public static readonly NASTINESS = 3;
    public static readonly RANDOMNESS = 4;
    public static readonly GAME = 5;

    public static getColumnIndex(categoryName: string): number {
        switch(categoryName) {
            case 'complexity':
                return AnimalfolkDetails.COMPLEXITY;
            case 'interactivity':
                return AnimalfolkDetails.INTERACTIVITY;
            case 'nastiness':
                return AnimalfolkDetails.NASTINESS;
            case 'randomness':
                return AnimalfolkDetails.RANDOMNESS;
            case 'game':
                return AnimalfolkDetails.GAME;
            default:
                throw new Error(`Category '${categoryName}' is not a valid AnimalfolkDetails category`)
        }
    }
    
    public static get(animalfolk_id: number, column: 1|2|3|4|5): number {
        const row = AnimalfolkDetails.table[animalfolk_id-1];
        if (!row) {
            throw new Error(`AnimalfolkDetails is missing a values for animalfolk_id = ${animalfolk_id}`);
        }
        return row[column]!;
    }

    private static readonly table = [
        ?
    ]
}
"""

# Load the Excel file
file_path = 'material_10thanniversary.xlsx'
xls = pd.ExcelFile(file_path)
df = pd.read_excel(xls, sheet_name="Mono")

# Fill the table with data
delimeter = ",\n        "
table = ""
for index, row in df.iterrows():
    table += f"[{int(row['animalfolk_id'])}, {int(row['animalfolk_complexity'])}, {int(row['animalfolk_interactivity'])}, {int(row['animalfolk_nastiness'])}, {int(row['animalfolk_randomness'])}, {int(row['animalfolk_game'])}]{delimeter}"
table = table[:-len(delimeter)]

# Insert the table in the template
output = template.replace("?", table)
with open('../../source/client/components/types/AnimalfolkDetails.ts', 'w') as f:
    f.write(output)
print("AnimalfolkDetails.ts updated!")