import pandas as pd
import math
import numbers

# Load the Excel file
file_path = 'material_11thanniversary.xlsx'
xls = pd.ExcelFile(file_path)

# Format the output as TS
output = ""
for sheet_name in xls.sheet_names:
    df = pd.read_excel(xls, sheet_name=sheet_name)
    for index, row in df.iterrows():
        type_id = int(row['type_id'])
        upper = row['name'].replace(' ', '').replace("'", '').upper()
        if upper == "JUNK" and index > 1:
            upper += str(index)
        output += f"    static readonly CT_{upper}: number = {type_id};\n"

# Add deprecated card types
with open("deprecated_card_types.txt") as f:
    for deprecated_card_type in f.readlines():
        deprecated_card_type = deprecated_card_type.replace("\n", "")
        if deprecated_card_type != "":
            type_id += 1
            output += f"    static readonly {deprecated_card_type}: number = {type_id};\n"

# Print the output
print(output)

# Optionally, write the output to a PHP file
with open('define_card_types_client.ts', 'w') as f:
    f.write(output)
