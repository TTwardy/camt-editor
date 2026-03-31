import xlrd, json

wb = xlrd.open_workbook(r'e:\camt editor\swift_corporates_banktocustomer_iso20022_b2c_statementv2cgi2mig0160701finalpublication.xls')
sheet = wb.sheet_by_name('camt.053.001.02')

rows = []
for row in range(4, sheet.nrows):
    vals = []
    for col in range(14):
        v = str(sheet.cell_value(row, col)).strip()
        vals.append(v)
    if vals[4]:
        usage = {
            'ach': vals[9],
            'wire': vals[10],
            'cheques': vals[11],
            'sepa': vals[12]
        }
        all_nu = all(u == 'NU' for u in usage.values())
        rows.append({
            'index': vals[0],
            'or_field': vals[1],
            'message_item': vals[2].strip(),
            'message_item_flat': vals[3].strip(),
            'xml_tag': vals[4],
            'mult': vals[5],
            'type': vals[6],
            'seq_no': vals[7],
            'depth': vals[8],
            'usage': usage,
            'all_nu': all_nu,
            'rules': vals[13]
        })

with open(r'e:\camt editor\camt_structure.json', 'w') as f:
    json.dump(rows, f, indent=2)

output = []
total = len(rows)
nu_count = sum(1 for r in rows if r['all_nu'])
used_count = sum(1 for r in rows if not r['all_nu'])
output.append(f"Total rows with XML tags: {total}")
output.append(f"Rows where all usage is NU: {nu_count}")
output.append(f"Rows used (not all NU): {used_count}")

output.append("\n=== USED ELEMENTS (not all NU) - hierarchy ===")
for r in rows:
    if not r['all_nu']:
        indent = r['depth'].count('+') if '+' in r['depth'] else 0
        prefix = '  ' * indent
        output.append(f"{prefix}{r['xml_tag']} {r['message_item_flat']} [{r['mult']}] type={r['type']} ACH={r['usage']['ach']} WIRE={r['usage']['wire']} CHQ={r['usage']['cheques']} SEPA={r['usage']['sepa']}")

depths = set(r['depth'] for r in rows)
output.append(f"\nUnique depths: {sorted(depths)}")

with open(r'e:\camt editor\analysis_output.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(output))

print("Done. Output written to analysis_output.txt")
