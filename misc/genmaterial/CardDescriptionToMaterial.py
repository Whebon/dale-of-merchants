import pandas as pd
import numbers
import pyperclip

def format_emojis(text: str):
    return text.replace("–", "-") \
                .replace("’", "'") \
                .replace("🃏🃏🃏", "CARDS3") \
                .replace("🃏🃏", "CARDS2") \
                .replace("🃏", "CARD") \
                .replace("🐱", "DIE_OCELOT") \
                .replace("💈", "DIE_POLECAT") \
                .replace("🐰", "DIE_HARE") \
                .replace("❇️", "DIE_PANGOLIN1") \
                .replace("✳️", "DIE_PANGOLIN2") \
                .replace("[source]", "SOURCE") \
                .replace("[destination]", "DESTINATION") \
                .replace("☄️", "COMET") \
                .replace("🪐", "PLANET") \
                .replace("✨", "STARS") \
                .replace("🟡", "COIN") \
                .replace("🌅", "DAWN") \
                .replace("☀️", "DAY") \
                .replace("🌙", "NIGHT") \
                .replace("🕰️", "CLOCK")

def type_displayed(row):
    if (row['is_technique'] == "X"):
        return 'clienttranslate("Technique")'
    if (int(row['animalfolk_id']) == 0):
        return 'clienttranslate("Rubbish")'
    return 'clienttranslate("Passive")'

def is_technique(row):
    if (row['is_technique'] == "X"):
        return "true"
    return "false"

def has_plus(row):
    if (row['has_plus'] == "X"):
        if (row['is_technique'] != "X"):
            raise Exception("Only techniques can have a plus")
        return "true"
    return "false"

def has_ability(row):
    if (row['has_ability'] == "X"):
        if (row['is_technique'] == "X"):
            #"has_ability on techniques" == "acquire"
            pass #raise Exception("Techniques cannot have an active ability")
        return "true"
    return "false"

def playable(row):
    if (is_technique(row) == "true" or has_ability(row) == "true" or row['animalfolk'] == "Chameleons"):
        return "true"
    return "false"

def is_mono(sheet_name):
    if (sheet_name.upper() == "MONO"):
        return "true"
    return "false"

def string_literal(str):
    if (str == "" or str == "null" or str== "nan" or str == None or isinstance(str, numbers.Number)):
        return "null";
    return f"\"{str}\""

# Load the Excel file
file_path = 'material_11thanniversary.xlsx'
xls = pd.ExcelFile(file_path)

card_types = {}

# Iterate over all sheet names
type_id = 0
for sheet_name in xls.sheet_names:
    df = pd.read_excel(xls, sheet_name=sheet_name)

    for index, row in df.iterrows():
        animalfolk = string_literal(row['animalfolk'])
        if int(row['type_id']) != type_id:
            raise Exception(f"Expected type_id {type_id}, but found {int(row['type_id'])}")
        if type(row['name']) != str:
            break
        UPPERNAME = row['name'].replace(' ', '').replace("'", '').upper() #warning: CT_JUNK != CT_JUNK2
        card_types[type_id] = {
            'type_id': type_id,
            'name': f"clienttranslate(\"{row['name']}\")",
            'text': f"clienttranslate(\"{format_emojis(row['text'])}\")",
            'type_displayed': type_displayed(row),
            'is_technique': is_technique(row),
            'has_plus': has_plus(row),
            'has_ability': has_ability(row),
            'playable': playable(row),
            'trigger': string_literal(row['trigger']),
            'value': int(row['value']),
            'nbr': int(row['nbr']),
            'animalfolk_displayed': '""' if animalfolk == "null" else f"clienttranslate({animalfolk})",
            'animalfolk_id': int(row['animalfolk_id']),
            'is_mono': is_mono(sheet_name)
        }
        type_id += 1

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

# Optionally, copy the output to the clipboard
pyperclip.copy(output)

# # Optionally, write the output to a PHP file
# with open('output.php', 'w') as f:
#     f.write(output)
