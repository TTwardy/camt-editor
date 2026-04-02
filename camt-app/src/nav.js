// Side Navigation - tree-based navigation for the CAMT schema sections

import { CAMT_SCHEMA } from './schema.js';

let currentPaymentType = 'sepa';
let formData = {};

const ARROW_SVG = `<svg class="nav-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>`;

// Section names to show in nav (limit depth to keep nav usable)
const NAV_DEPTH_LIMIT = 4;

/**
 * Initialize navigation
 */
export function initNav(paymentType, data) {
  currentPaymentType = paymentType;
  formData = data || {};
  renderNav();
}

/**
 * Update navigation for new payment type
 */
export function updateNav(paymentType, data) {
  currentPaymentType = paymentType;
  formData = data || {};
  renderNav();
}

/**
 * Update nav indicators when data changes
 */
export function updateNavIndicators(data) {
  formData = data;
  // Update dots
  document.querySelectorAll('.nav-item .nav-dot').forEach(dot => {
    const path = dot.dataset.path;
    if (path) {
      const hasVal = hasValuesInPath(path);
      dot.classList.toggle('has-value', hasVal);
    }
  });
}

function renderNav() {
  const container = document.getElementById('nav-tree');
  if (!container) return;
  container.innerHTML = '';
  
  for (const section of CAMT_SCHEMA) {
    if (isHiddenForType(section)) continue;
    renderNavNode(container, section, section.tag, 0);
  }
}

function renderNavNode(container, node, path, depth) {
  if (isHiddenForType(node)) return;
  if (depth > NAV_DEPTH_LIMIT) return;
  
  const hasChildren = node.children && node.children.length > 0;
  const visibleChildren = hasChildren ? 
    node.children.filter(c => !isHiddenForType(c) && c.children && c.children.length > 0) : [];
  const hasVisibleChildren = visibleChildren.length > 0;
  const usage = node.usage?.[currentPaymentType] || '';
  
  // Only show nodes that have children (are sections, not leaf fields)
  if (!hasChildren) return;
  
  // Nav item
  const item = document.createElement('div');
  item.className = 'nav-item';
  item.style.setProperty('--nav-indent', depth);
  
  const arrowClass = hasVisibleChildren ? 'nav-arrow' : 'nav-arrow no-children';
  
  // Determine badge
  let badgeClass = 'optional';
  let badgeText = 'BD';
  if (usage === 'R') { badgeClass = 'required'; badgeText = 'R'; }
  else if (usage === 'C') { badgeClass = 'conditional'; badgeText = 'C'; }
  else if (usage === 'XOR') { badgeClass = 'conditional'; badgeText = 'XOR'; }
  
  item.innerHTML = `
    ${ARROW_SVG.replace('nav-arrow', arrowClass)}
    <span class="nav-label" title="${node.tag}: ${node.label}">${formatLabel(node.label)}</span>
    <span class="nav-dot" data-path="${path}"></span>
  `;
  
  // Click to scroll to section or expand nav
  item.addEventListener('click', (e) => {
    e.stopPropagation();
    
    const isArrowClick = !!e.target.closest('.nav-arrow');
    
    if (isArrowClick) {
      // Toggle children in nav
      const childContainer = item.nextElementSibling;
      if (childContainer && childContainer.classList.contains('nav-children')) {
        childContainer.classList.toggle('expanded');
        const arrow = item.querySelector('.nav-arrow');
        if (arrow && !arrow.classList.contains('no-children')) {
          arrow.classList.toggle('expanded');
        }
      }
      return; // Stop here, do not navigate down
    }
    
    // Scroll to section in form
    const sectionId = `section-${path.replace(/\./g, '-')}`;
    const sectionEl = document.getElementById(sectionId);
    if (sectionEl) {
      // Expand the section
      sectionEl.classList.add('expanded');
      // Expand all parent sections
      let parent = sectionEl.parentElement;
      while (parent) {
        if (parent.classList.contains('section-card')) {
          parent.classList.add('expanded');
        }
        parent = parent.parentElement;
      }
      // Scroll into view
      sectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Highlight active nav item
      document.querySelectorAll('.nav-item.active').forEach(el => el.classList.remove('active'));
      item.classList.add('active');
    }
  });
  
  container.appendChild(item);
  
  // Child container
  if (hasVisibleChildren && depth < NAV_DEPTH_LIMIT) {
    const childContainer = document.createElement('div');
    childContainer.className = 'nav-children';
    
    // Auto-expand first two levels
    if (depth < 2) {
      childContainer.classList.add('expanded');
      const arrow = item.querySelector('.nav-arrow');
      if (arrow) arrow.classList.add('expanded');
    }
    
    for (const child of visibleChildren) {
      const childPath = `${path}.${child.tag}`;
      renderNavNode(childContainer, child, childPath, depth + 1);
    }
    
    container.appendChild(childContainer);
  }
}

function isHiddenForType(node) {
  const usage = node.usage?.[currentPaymentType];
  if (usage === 'NU') return true;
  if (node.children && node.children.length > 0) {
    const anyVisible = node.children.some(c => !isHiddenForType(c));
    if (!anyVisible && !node.type) return true;
  }
  return false;
}

function hasValuesInPath(path) {
  return Object.keys(formData).some(key => key.startsWith(path) && formData[key]);
}

function formatLabel(label) {
  return label.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2');
}

/**
 * Collapse all nav items
 */
export function collapseAllNav() {
  document.querySelectorAll('.nav-children').forEach(el => el.classList.remove('expanded'));
  document.querySelectorAll('.nav-arrow').forEach(el => el.classList.remove('expanded'));
}

/**
 * Expand all nav items
 */
export function expandAllNav() {
  document.querySelectorAll('.nav-children').forEach(el => el.classList.add('expanded'));
  document.querySelectorAll('.nav-arrow:not(.no-children)').forEach(el => el.classList.add('expanded'));
}
