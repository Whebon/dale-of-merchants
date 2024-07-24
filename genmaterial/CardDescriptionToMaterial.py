import pandas as pd
import math
import numbers

def string_literal(str):
    if (str == "" or str == "null" or str== "nan" or str == None or isinstance(str, numbers.Number)):
        return "null";
    return f"\"{str}\""

# Load the Excel file
file_path = 'material.xlsx'
df = pd.read_excel(file_path)

# Initialize the card types dictionary
card_types = {}

# Iterate over the rows in the dataframe
for index, row in df.iterrows():
    type_id = row['type_id']
    card_types[type_id] = {
        'name': f"clienttranslate(\"{row['name']}\")",
        'text': f"clienttranslate(\"{row['text']}\")",
        'has_plus': row['has_plus'],
        'type': row['type'],
        'value': row['value'],
        'nbr': row['nbr'],
        'animalfolk': string_literal(row['animalfolk'])
    }


# Format the output as a PHP associative array
output = "$this->card_types = array(\n"
for type_id, card_info in card_types.items():
    output += f"  {type_id} => array(\n"
    for key, value in card_info.items():
        output += f"      '{key}' => {value},\n"
    output = output.rstrip(',\n') + "\n  ),\n"
output = output.rstrip(',\n') + "\n);\n"

# Print the output
print(output)

# Optionally, write the output to a PHP file
with open('output.php', 'w') as f:
    f.write(output)
