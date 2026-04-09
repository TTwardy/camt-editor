// XML Generator - reads form data and produces camt.053.001.02 XML

import { CAMT_SCHEMA } from './schema.js';

const XML_NAMESPACE = 'urn:iso:std:iso:20022:tech:xsd:camt.053.001.02';
const XML_HEADER = '<?xml version="1.0" encoding="UTF-8"?>';

/**
 * Generate XML from form data
 * @param {Object} formData - key-value pairs where key is dot-path like "GrpHdr.MsgId"
 * @param {string} paymentType - selected payment type (sepa, ach, wire, cheques)
 * @returns {string} formatted XML string
 */
export function generateXML(formData, paymentType) {
  const lines = [];
  lines.push(XML_HEADER);
  lines.push(`<Document xmlns="${XML_NAMESPACE}">`);
  lines.push('  <BkToCstmrStmt>');
  
  for (const section of CAMT_SCHEMA) {
    const usage = section.usage?.[paymentType];
    if (usage === 'NU') continue;
    
    const sectionXml = renderNode(section, `${section.tag}`, formData, paymentType, 2);
    if (sectionXml) {
      lines.push(sectionXml);
    }
  }
  
  lines.push('  </BkToCstmrStmt>');
  lines.push('</Document>');
  
  return lines.join('\n');
}

/**
 * Recursively render a schema node to XML if it has values
 */
function renderNode(node, path, formData, paymentType, indent) {
  const usage = node.usage?.[paymentType];
  if (usage === 'NU') return null;
  
  const sp = '  '.repeat(indent);
  const tag = node.tag;
  const children = node.children || [];
  const isLeaf = children.length === 0 && node.type && node.type !== '+';
  
  if (isLeaf) {
    // Leaf node - check for value
    const value = formData[path];
    if (!value && value !== 0) return null;
    
    // Handle Amount fields with currency attribute
    if (node.hasCcyAttr) {
      const ccyValue = formData[path + '_Ccy'] || 'EUR';
      return `${sp}<${tag} Ccy="${escapeXml(ccyValue)}">${escapeXml(String(value))}</${tag}>`;
    }
    
    // Check if it's a multiline value for a repeatable field
    const isMulti = node.mult && (!node.mult.endsWith('1') && node.mult !== '');
    if (isMulti && String(value).includes('\n')) {
      const lines = String(value).split('\n').filter(l => l.trim() !== '');
      return lines.map(line => `${sp}<${tag}>${escapeXml(line)}</${tag}>`).join('\n');
    }
    
    return `${sp}<${tag}>${escapeXml(String(value))}</${tag}>`;
  }
  
  // Container node - collect children output
  const childLines = [];
  
  for (const child of children) {
    const childPath = `${path}.${child.tag}`;
    const childXml = renderNode(child, childPath, formData, paymentType, indent + 1);
    if (childXml) {
      childLines.push(childXml);
    }
  }
  
  // Also check if this container itself might have a direct value (like Amount nodes)
  const directValue = formData[path];
  if (directValue && node.hasCcyAttr) {
    const ccyValue = formData[path + '_Ccy'] || 'EUR';
    return `${sp}<${tag} Ccy="${escapeXml(ccyValue)}">${escapeXml(String(directValue))}</${tag}>`;
  }
  
  if (childLines.length === 0 && !directValue) return null;
  
  if (directValue && !node.hasCcyAttr && childLines.length === 0) {
    return `${sp}<${tag}>${escapeXml(String(directValue))}</${tag}>`;
  }
  
  return `${sp}<${tag}>\n${childLines.join('\n')}\n${sp}</${tag}>`;
}

/**
 * Generate syntax-highlighted XML for preview
 */
export function generateHighlightedXML(formData, paymentType) {
  const xml = generateXML(formData, paymentType);
  return highlightXml(xml);
}

function highlightXml(xml) {
  return xml
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // XML declaration
    .replace(/(&lt;\?xml.*?\?&gt;)/g, '<span class="xml-header">$1</span>')
    // Self-closing tags
    .replace(/(&lt;)([\w:]+)((?:\s+[\w:]+="[^"]*")*)\s*(\/&gt;)/g, 
      '<span class="xml-tag">$1$2</span>$3<span class="xml-tag">$4</span>')
    // Opening tags with attributes
    .replace(/(&lt;)([\w:]+)((?:\s+[\w:]+="[^"]*")*)(&gt;)/g, (match, lt, tag, attrs, gt) => {
      const highlightedAttrs = attrs.replace(/([\w:]+)=(&quot;|")([^"]*?)(&quot;|")/g, 
        '<span class="xml-attr">$1</span>=<span class="xml-value">"$3"</span>');
      return `<span class="xml-tag">${lt}${tag}</span>${highlightedAttrs}<span class="xml-tag">${gt}</span>`;
    })
    // Closing tags
    .replace(/(&lt;\/)([\w:]+)(&gt;)/g, '<span class="xml-tag">$1$2$3</span>')
    // Text content between tags
    .replace(/>([^<]+)</g, (match, content) => {
      if (content.trim()) {
        return `><span class="xml-value">${content}</span><`;
      }
      return match;
    });
}

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Generate download filename
 */
export function getDownloadFilename() {
  const now = new Date();
  const ts = now.toISOString().slice(0, 19).replace(/[-:]/g, '').replace('T', '_');
  return `camt053_${ts}.xml`;
}
