// Form Renderer - renders CAMT schema into editable form fields
// Handles collapsible sections, XOR choices, and payment type filtering

import { CAMT_SCHEMA } from './schema.js';

let currentPaymentType = 'sepa';
let formData = {};
let onChangeCallback = null;

const ARROW_SVG = `<svg class="section-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>`;

// Sections whose children get their own collapsible UI at nav level
const NAV_SECTIONS = new Set([
  'GrpHdr', 'Stmt', 'Acct', 'RltdAcct', 'Intrst', 'Bal', 'TxsSummry',
  'Ntry', 'NtryDtls', 'TxDtls', 'Refs', 'AmtDtls', 'RltdPties',
  'RltdAgts', 'Purp', 'RmtInf', 'RltdDts', 'Tax', 'RtrInf',
  'Dbtr', 'Cdtr', 'DbtrAcct', 'CdtrAcct', 'UltmtDbtr', 'UltmtCdtr',
  'DbtrAgt', 'CdtrAgt', 'Chrgs', 'Btch'
]);

/**
 * Initialize the form renderer
 */
export function initFormRenderer(container, paymentType, initialData, onChange) {
  currentPaymentType = paymentType;
  formData = initialData || {};
  onChangeCallback = onChange;
  renderForm(container);
}

/**
 * Update payment type filter
 */
export function setPaymentType(type) {
  currentPaymentType = type;
  const container = document.getElementById('form-container');
  if (container) renderForm(container);
}

/**
 * Get all current form values
 */
export function getFormData() {
  return { ...formData };
}

/**
 * Set form data (used for loading/sample)
 */
export function setFormData(data) {
  formData = { ...data };
  const container = document.getElementById('form-container');
  if (container) renderForm(container);
}

/**
 * Clear all form data
 */
export function clearFormData() {
  formData = {};
  const container = document.getElementById('form-container');
  if (container) renderForm(container);
}

/**
 * Render the entire form from schema
 */
function renderForm(container) {
  container.innerHTML = '';
  
  for (const section of CAMT_SCHEMA) {
    if (isHiddenForType(section)) continue;
    const card = renderSection(section, section.tag, 0);
    if (card) container.appendChild(card);
  }
}

/**
 * Check if a node should be hidden for current payment type
 */
function isHiddenForType(node) {
  const usage = node.usage?.[currentPaymentType];
  if (usage === 'NU') return true;
  // Also check if ALL children are NU
  if (node.children && node.children.length > 0) {
    const anyChildVisible = node.children.some(c => !isHiddenForType(c));
    if (!anyChildVisible && !node.type) return true;
  }
  return false;
}

/**
 * Render a single section (collapsible card)
 */
function renderSection(node, path, depth) {
  if (isHiddenForType(node)) return null;
  
  const usage = node.usage?.[currentPaymentType] || '';
  const hasChildren = node.children && node.children.length > 0;
  const isLeaf = !hasChildren && node.type && node.type !== '+';
  
  // If it's a simple leaf, render as a field row instead
  if (isLeaf) {
    return null; // handled by parent
  }
  
  const card = document.createElement('div');
  card.className = 'section-card';
  card.id = `section-${path.replace(/\./g, '-')}`;
  card.dataset.path = path;
  
  // Determine if section should start expanded
  const isRequired = usage === 'R';
  const hasValues = hasValuesInSubtree(node, path);
  const isTopLevel = depth <= 1;
  const shouldExpand = (isRequired && isTopLevel) || hasValues;
  
  if (shouldExpand) card.classList.add('expanded');
  
  // Header
  const header = document.createElement('div');
  header.className = 'section-header';
  header.innerHTML = `
    ${ARROW_SVG}
    <div class="section-title-wrap">
      <span class="section-title">${formatLabel(node.label)}</span>
      <span class="section-tag">&lt;${node.tag}&gt;</span>
    </div>
    ${usage ? `<span class="field-hint-wrap"><span class="section-usage-badge ${usage}">${usage}</span><span class="field-hint-tooltip">${getUsageDescription(usage)}</span></span>` : ''}
  `;
  header.addEventListener('click', () => {
    card.classList.toggle('expanded');
  });
  card.appendChild(header);
  
  // Body
  const body = document.createElement('div');
  body.className = 'section-body';
  
  // Check for XOR groups among children
  const xorGroups = findXorGroups(node.children || []);
  
  if (xorGroups.length > 0) {
    // Render XOR groups and remaining children
    const renderedXorIndices = new Set();
    
    for (const group of xorGroups) {
      const xorEl = renderXorGroup(group, path, depth);
      if (xorEl) body.appendChild(xorEl);
      group.forEach(g => renderedXorIndices.add(g.index));
    }
    
    // Render non-XOR children
    const nonXorChildren = (node.children || []).filter((_, i) => !renderedXorIndices.has(i));
    renderChildNodes(nonXorChildren, path, depth, body);
  } else {
    renderChildNodes(node.children || [], path, depth, body);
  }
  
  card.appendChild(body);
  return card;
}

/**
 * Render child nodes (mix of leaf fields and sub-sections)
 */
function renderChildNodes(children, parentPath, depth, container) {
  for (const child of children) {
    if (isHiddenForType(child)) continue;
    
    const childPath = `${parentPath}.${child.tag}`;
    const hasChildren = child.children && child.children.length > 0;
    const isLeaf = !hasChildren && child.type && child.type !== '+';
    
    if (isLeaf) {
      const fieldRow = renderFieldRow(child, childPath);
      if (fieldRow) container.appendChild(fieldRow);
    } else if (hasChildren) {
      // Render as nested sub-section
      const subSection = renderSection(child, childPath, depth + 1);
      if (subSection) {
        const nested = document.createElement('div');
        nested.className = 'nested-section';
        nested.appendChild(subSection);
        container.appendChild(nested);
      }
    }
  }
}

/**
 * Render a single form field row
 */
function renderFieldRow(node, path) {
  if (isHiddenForType(node)) return null;
  
  const usage = node.usage?.[currentPaymentType] || '';
  const row = document.createElement('div');
  row.className = 'field-row';
  
  // Label area
  const labelArea = document.createElement('div');
  labelArea.className = 'field-label-area';
  const rulesHtml = node.rules ? `<span class="field-hint-wrap"><span class="field-hint-icon" tabindex="0" aria-label="Info">?</span><span class="field-hint-tooltip">${escapeHtml(node.rules)}</span></span>` : '';
  labelArea.innerHTML = `
    <div class="field-label">
      <span class="field-hint-wrap"><span class="field-usage-dot ${usage}"></span><span class="field-hint-tooltip">${getUsageDescription(usage)}</span></span>
      <span class="field-name">${formatLabel(node.label)}</span>
      <span class="field-tag">&lt;${node.tag}&gt;</span>
      ${rulesHtml}
    </div>
  `;
  
  // Input area
  const inputArea = document.createElement('div');
  inputArea.className = 'field-input-area';
  
  if (node.hasCcyAttr) {
    // Amount field with currency
    const amtInput = createInput(node, path, 'Amount');
    const ccyInput = createInput(
      { type: 'Code', tag: 'Ccy' },
      path + '_Ccy',
      'EUR'
    );
    ccyInput.className = 'field-input ccy-input';
    inputArea.appendChild(amtInput);
    inputArea.appendChild(ccyInput);
  } else {
    const input = createInput(node, path, getPlaceholder(node));
    inputArea.appendChild(input);
  }
  
  row.appendChild(labelArea);
  row.appendChild(inputArea);
  return row;
}

/**
 * Create an input element
 */
function createInput(node, path, placeholder) {
  const input = document.createElement('input');
  input.type = getInputType(node.type);
  input.className = 'field-input';
  input.placeholder = placeholder || '';
  input.dataset.path = path;
  input.id = `field-${path.replace(/\./g, '-')}`;
  
  // Set current value
  if (formData[path] !== undefined) {
    input.value = formData[path];
  }
  
  // Change handler
  input.addEventListener('input', (e) => {
    const val = e.target.value.trim();
    if (val) {
      formData[path] = val;
    } else {
      delete formData[path];
    }
    if (onChangeCallback) onChangeCallback(formData);
  });
  
  return input;
}

/**
 * Find XOR choice groups among children
 */
function findXorGroups(children) {
  const groups = [];
  let currentGroup = [];
  let inGroup = false;
  
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    const orField = child.orField || '';
    
    if (orField.includes('{Or') || orField.includes('Or}')) {
      currentGroup.push({ ...child, index: i });
      inGroup = true;
      
      if (orField.includes('Or}')) {
        if (currentGroup.length >= 2) {
          groups.push([...currentGroup]);
        }
        currentGroup = [];
        inGroup = false;
      }
    } else if (inGroup && orField.includes('Or')) {
      currentGroup.push({ ...child, index: i });
    }
  }
  
  return groups;
}

/**
 * Render XOR choice group with tabs
 */
function renderXorGroup(group, parentPath, depth) {
  // Filter out NU items
  const visibleItems = group.filter(g => !isHiddenForType(g));
  if (visibleItems.length === 0) return null;
  
  const container = document.createElement('div');
  container.className = 'xor-group';
  
  // Tabs
  const tabs = document.createElement('div');
  tabs.className = 'xor-tabs';
  
  // Panels
  const panels = [];
  
  // Determine which tab should be active (first one with values, or just first)
  let activeIdx = 0;
  for (let i = 0; i < visibleItems.length; i++) {
    const item = visibleItems[i];
    const itemPath = `${parentPath}.${item.tag}`;
    if (hasValuesInSubtree(item, itemPath)) {
      activeIdx = i;
      break;
    }
  }
  
  visibleItems.forEach((item, idx) => {
    const itemPath = `${parentPath}.${item.tag}`;
    
    // Tab button
    const tab = document.createElement('button');
    tab.className = `xor-tab ${idx === activeIdx ? 'active' : ''}`;
    tab.textContent = formatLabel(item.label);
    tab.addEventListener('click', () => {
      tabs.querySelectorAll('.xor-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      panels.forEach((p, pi) => {
        p.classList.toggle('active', pi === idx);
      });
    });
    tabs.appendChild(tab);
    
    // Panel
    const panel = document.createElement('div');
    panel.className = `xor-panel ${idx === activeIdx ? 'active' : ''}`;
    
    const hasChildren = item.children && item.children.length > 0;
    const isLeaf = !hasChildren && item.type && item.type !== '+';
    
    if (isLeaf) {
      const fieldRow = renderFieldRow(item, itemPath);
      if (fieldRow) panel.appendChild(fieldRow);
    } else if (hasChildren) {
      renderChildNodes(item.children, itemPath, depth + 1, panel);
    }
    
    panels.push(panel);
  });
  
  container.appendChild(tabs);
  panels.forEach(p => container.appendChild(p));
  
  return container;
}

/**
 * Check if any values exist in a subtree
 */
function hasValuesInSubtree(node, path) {
  // Check direct value
  if (formData[path]) return true;
  if (formData[path + '_Ccy']) return true;
  
  // Check children
  if (node.children) {
    for (const child of node.children) {
      if (hasValuesInSubtree(child, `${path}.${child.tag}`)) return true;
    }
  }
  return false;
}

// --- Helpers ---

function getUsageDescription(usage) {
  switch (usage) {
    case 'R': return 'Required';
    case 'BD': return 'Bank Dependent (Optional)';
    case 'C': return 'Conditional';
    case 'XOR': return 'Choice (Exclusive Or)';
    default: return '';
  }
}

function formatLabel(label) {
  // Insert spaces before capitals: "MessageIdentification" → "Message Identification"
  return label.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2');
}

function getInputType(schemaType) {
  switch (schemaType) {
    case 'DateTime': return 'text'; // Use text for ISO dates
    case 'Quantity': return 'text';
    case 'Amount': return 'text';
    case 'Rate': return 'text';
    case 'Indicator': return 'text';
    default: return 'text';
  }
}

function getPlaceholder(node) {
  switch (node.type) {
    case 'DateTime': return 'YYYY-MM-DDTHH:MM:SS';
    case 'Quantity': return '0';
    case 'Amount': return '0.00';
    case 'Rate': return '0.0000';
    case 'Indicator': return 'true / false';
    case 'Code': return 'Code';
    case 'Identifier': return 'Identifier';
    default: return '';
  }
}

function escapeAttr(str) {
  return str.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function truncate(str, len) {
  return str.length > len ? str.slice(0, len) + '...' : str;
}
