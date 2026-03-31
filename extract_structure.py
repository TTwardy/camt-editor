import xlrd, json

wb = xlrd.open_workbook(r'e:\camt editor\swift_corporates_banktocustomer_iso20022_b2c_statementv2cgi2mig0160701finalpublication.xls')
sheet = wb.sheet_by_name('camt.053.001.02')

rows = []
for row in range(4, sheet.nrows):
    vals = []
    for col in range(14):
        v = str(sheet.cell_value(row, col)).strip()
        vals.append(v)
    # Only process rows that have an XMLTag
    if vals[4]:
        usage = {
            'ach': vals[9],
            'wire': vals[10],
            'cheques': vals[11],
            'sepa': vals[12]
        }
        # Check if ALL usages are NU
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

total = len(rows)
nu_count = sum(1 for r in rows if r['all_nu'])
used_count = sum(1 for r in rows if not r['all_nu'])
print(f"Total rows with XML tags: {total}")
print(f"Rows where all usage is NU: {nu_count}")
print(f"Rows used (not all NU): {used_count}")

# Print the top-level structure (depth + and ++)
print("\n=== TOP-LEVEL USED ELEMENTS ===")
for r in rows:
    if not r['all_nu'] and r['depth'] in ['+', '++']:
        print(f"{r['depth']} {r['xml_tag']} {r['message_item_flat']} [{r['mult']}] {r['type']} ACH={r['usage']['ach']}")

# Print unique depth values
depths = set(r['depth'] for r in rows)
print(f"\nUnique depths: {sorted(depths)}")

# Count by section
sections = {}
for r in rows:
    if not r['all_nu']:
        sec = r['seq_no'].split('.')[0] if '.' in r['seq_no'] else r['seq_no']
        if sec not in sections:
            sections[sec] = 0
        sections[sec] += 1
print(f"\nUsed elements by section: {json.dumps(sections, indent=2)}")
