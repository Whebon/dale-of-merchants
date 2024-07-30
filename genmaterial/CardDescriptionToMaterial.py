import pandas as pd
import math
import numbers

def type_displayed(row):
    if (row['is_technique'] == "X"):
        return 'clienttranslate("Technique")'
    if (string_literal(row['animalfolk']) == "null"):
        return 'clienttranslate("Rubbish")'
    return 'clienttranslate("Passive")'

def is_technique(row):
    if (row['is_technique'] == "X"):
        return "true"
    return "false"

def has_plus(row):
    if (row['is_technique'] == "X"):
        if (row['has_plus'] == "X"):
            return "true"
        return "false"
    # Only techniques can have a plus
    return "false"

def playable(row):
    if (row['is_technique'] == "X"):
        # All techniques are playable 
        return "true"
    if (row['playable'] == "X"):
        return "true"
    return "false"

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
    animalfolk = string_literal(row['animalfolk'])
    card_types[type_id] = {
        'type_id': row['type_id'],
        'name': f"clienttranslate(\"{row['name']}\")",
        'text': f"clienttranslate(\"{row['text']}\")",
        'type_displayed': type_displayed(row),
        'is_technique': is_technique(row),
        'has_plus': has_plus(row),
        'playable': playable(row),
        'value': row['value'],
        'nbr': row['nbr'],
        'animalfolk': animalfolk,
        'animalfolk_displayed': '""' if animalfolk == "null" else f"clienttranslate({animalfolk})"
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
