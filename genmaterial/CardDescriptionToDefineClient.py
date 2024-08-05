import pandas as pd
import math
import numbers

# Load the Excel file
file_path = 'material.xlsx'
df = pd.read_excel(file_path)

# Format the output as a PHP associative array
output = ""
for index, row in df.iterrows():
    type_id = row['type_id']
    upper = row['name'].replace(' ', '').upper()
    output += f"static readonly CT_{upper}: number = {type_id};\n"

# Print the output
print(output)

# Optionally, write the output to a PHP file
with open('define_card_types_client.ts', 'w') as f:
    f.write(output)
