"""
Generate schema.js for the CAMT.053 editor from camt_structure.json.
Builds a hierarchical tree structure, filtering out fully-NU elements.
"""
import json

with open(r'e:\camt editor\camt_structure.json', 'r') as f:
    raw = json.load(f)

# Clean up XML tags - remove angle brackets
def clean_tag(tag):
    return tag.replace('<', '').replace('>', '').strip()

# Build tree from flat depth-based list
def build_tree(elements):
    """Given flat list with depth info, build nested tree."""
    root = {'children': []}
    stack = [(-1, root)]  # (depth_level, node)
    
    for el in elements:
        depth_str = el.get('depth', '')
        if depth_str == 'Depth' or depth_str == '-' or not depth_str:
            continue
        
        depth = depth_str.count('+')
        if depth == 0:
            continue
        
        tag = clean_tag(el['xml_tag'])
        
        # Handle Amount tags with Ccy attribute: <AmtCcy="AAA"> -> Amt with currencyAttr
        has_ccy_attr = False
        if 'Ccy="AAA"' in tag or "Ccy='AAA'" in tag:
            tag = tag.split('Ccy=')[0].strip()
            has_ccy_attr = True
        
        # Also handle <TtlAmtCcy="AAA"> etc
        if 'Ccy="AAA"' in el['xml_tag'] or "Ccy='AAA'" in el['xml_tag']:
            has_ccy_attr = True
        
        node = {
            'tag': tag,
            'label': el.get('message_item_flat', el.get('message_item', tag)),
            'type': el.get('type', ''),
            'mult': el.get('mult', ''),
            'usage': el.get('usage', {}),
            'or_field': el.get('or_field', ''),
            'rules': el.get('rules', ''),
            'hasCcyAttr': has_ccy_attr,
            'children': [],
            'depth': depth
        }
        
        # Find parent: go up the stack until we find a node with depth < current
        while len(stack) > 1 and stack[-1][0] >= depth:
            stack.pop()
        
        parent = stack[-1][1]
        parent['children'].append(node)
        stack.append((depth, node))
    
    return root['children']

# Check if a node or any descendant is used (not all NU) for a given payment type
def is_used_for_type(node, ptype):
    usage = node.get('usage', {})
    val = usage.get(ptype, 'NU')
    if val and val != 'NU':
        return True
    for child in node.get('children', []):
        if is_used_for_type(child, ptype):
            return True
    return False

# Check if node is used for ANY payment type
def is_used_any(node):
    usage = node.get('usage', {})
    all_nu = all(v == 'NU' for v in usage.values() if v)
    if not all_nu:
        return True
    for child in node.get('children', []):
        if is_used_any(child):
            return True
    return False

tree = build_tree(raw)

# Serialize tree to JS
def node_to_js(node, indent=2):
    sp = ' ' * indent
    lines = []
    lines.append(f'{sp}{{')
    lines.append(f'{sp}  tag: "{node["tag"]}",')
    label = node["label"].replace('"', '\\"')
    lines.append(f'{sp}  label: "{label}",')
    if node["type"]:
        lines.append(f'{sp}  type: "{node["type"]}",')
    if node["mult"]:
        mult = node["mult"].replace('[', '').replace(']', '')
        lines.append(f'{sp}  mult: "{mult}",')
    
    # Usage per type
    usage = node.get('usage', {})
    lines.append(f'{sp}  usage: {{ ach: "{usage.get("ach", "")}", wire: "{usage.get("wire", "")}", cheques: "{usage.get("cheques", "")}", sepa: "{usage.get("sepa", "")}" }},')
    
    if node.get('or_field'):
        or_val = node['or_field'].replace('"', '\\"')
        lines.append(f'{sp}  orField: "{or_val}",')
    
    if node.get('hasCcyAttr'):
        lines.append(f'{sp}  hasCcyAttr: true,')
    
    if node.get('rules'):
        rules = node['rules'].replace('"', '\\"').replace('\n', ' ').replace('\r', ' ')[:200]
        lines.append(f'{sp}  rules: "{rules}",')
    
    if node.get('children'):
        lines.append(f'{sp}  children: [')
        for child in node['children']:
            if is_used_any(child):
                lines.append(node_to_js(child, indent + 4) + ',')
        lines.append(f'{sp}  ]')
    
    lines.append(f'{sp}}}')
    return '\n'.join(lines)

# Generate output
output_lines = []
output_lines.append('// Auto-generated CAMT.053.001.02 schema')
output_lines.append('// Filtered: only elements that are used for at least one payment type')
output_lines.append('// Usage codes: R=Required, BD=Bank Dependent, C=Conditional, XOR=Choice, NU=Not Used')
output_lines.append('')
output_lines.append('export const PAYMENT_TYPES = [')
output_lines.append('  { id: "sepa", label: "SEPA" },')
output_lines.append('  { id: "ach", label: "ACH Domestic & Intl" },')
output_lines.append('  { id: "wire", label: "Wire Domestic & Intl" },')
output_lines.append('  { id: "cheques", label: "Cheques / Drafts" },')
output_lines.append('];')
output_lines.append('')
output_lines.append('export const CAMT_SCHEMA = [')

for node in tree:
    if is_used_any(node):
        output_lines.append(node_to_js(node, 2) + ',')

output_lines.append('];')

schema_content = '\n'.join(output_lines)

with open(r'e:\camt editor\camt-app\src\schema.js', 'w', encoding='utf-8') as f:
    f.write(schema_content)

print(f"Schema written. Total top-level nodes: {len(tree)}")
print(f"Output size: {len(schema_content)} bytes")
