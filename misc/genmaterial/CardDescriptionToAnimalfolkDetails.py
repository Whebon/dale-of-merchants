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
    
    public static get(animalfolk_id: number, column: number): number {
        const row = AnimalfolkDetails.TABLE[animalfolk_id-1];
        if (!row) {
            throw new Error(`AnimalfolkDetails is missing a values for animalfolk_id = ${animalfolk_id}`);
        }
        return row[column]!;
    }

    private static readonly TABLE = [
        ?1
    ]
    
    private static FLAVOUR_TEXTS: string[] = []

    public static getFlavourText(animalfolk_id: number): string {
        if (AnimalfolkDetails.FLAVOUR_TEXTS.length == 0) {
            AnimalfolkDetails.FLAVOUR_TEXTS = [
                ?2
            ]
        }
        const text = AnimalfolkDetails.FLAVOUR_TEXTS[animalfolk_id-1];
        return text ?? "MISSING FLAVOUR TEXT";
    }
}
"""

# Load the Excel file
file_path = 'material_11thanniversary.xlsx'
xls = pd.ExcelFile(file_path)
df = pd.read_excel(xls, sheet_name="Mono")

# Fill the table with data
delimeter = ",\n        "
table = ""
for index, row in df.iterrows():
    table += f"[{int(row['animalfolk_id'])}, {int(row['animalfolk_complexity'])}, {int(row['animalfolk_interactivity'])}, {int(row['animalfolk_nastiness'])}, {int(row['animalfolk_randomness'])}, {int(row['animalfolk_game'])}]{delimeter}"
table = table[:-len(delimeter)]

# Generate the flavour_texts array
delimeter = ",\n                "
flavour_texts = ""
for index, row in df.iterrows():
    flavour_text = str(row['animalfolk_flavour']) \
                    .replace("’", "'") \
                    .replace("\"", "'") \
                    .replace("‘", "'") \
                    .replace("–", "-")
    flavour_texts += f"_(\"{flavour_text}\"){delimeter}"
flavour_texts = flavour_texts[:-len(delimeter)]

# Insert the table and flavour texts in the template
output = template.replace("?1", table).replace("?2", flavour_texts)
with open('../../source/client/components/types/AnimalfolkDetails.ts', 'w') as f:
    f.write(output)
print("AnimalfolkDetails.ts updated!")