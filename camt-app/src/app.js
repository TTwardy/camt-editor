// CAMT.053 Editor - Main Application
import './styles.css';
import { initFormRenderer, setPaymentType, getFormData, setFormData, clearFormData } from './form-renderer.js';
import { initNav, updateNav, updateNavIndicators, collapseAllNav, expandAllNav } from './nav.js';
import { generateXML, generateHighlightedXML, getDownloadFilename } from './xml-generator.js';
import { saveFormData, loadFormData, clearFormData as clearStorage, savePaymentType, loadPaymentType } from './storage.js';
import { getSampleData } from './sample-data.js';

let currentPaymentType = 'sepa';
let previewVisible = false;

function init() {
  // Load saved payment type
  currentPaymentType = loadPaymentType();
  const typeSelect = document.getElementById('payment-type');
  typeSelect.value = currentPaymentType;
  
  // Load saved form data or use sample data
  let initialData = loadFormData();
  if (!initialData) {
    initialData = getSampleData();
  }
  
  // Initialize form
  const formContainer = document.getElementById('form-container');
  initFormRenderer(formContainer, currentPaymentType, initialData, onFormChange);
  
  // Initialize navigation
  initNav(currentPaymentType, initialData);
  
  // Update preview if open
  updatePreview();
  
  // Bind controls
  bindControls();
}

function onFormChange(data) {
  saveFormData(data);
  updateNavIndicators(data);
  if (previewVisible) {
    updatePreview();
  }
}

function updatePreview() {
  const output = document.getElementById('xml-output');
  if (!output) return;
  const data = getFormData();
  try {
    const highlighted = generateHighlightedXML(data, currentPaymentType);
    output.querySelector('code').innerHTML = highlighted;
  } catch (e) {
    output.querySelector('code').textContent = 'Error generating XML: ' + e.message;
  }
}

function bindControls() {
  // Payment type selector
  document.getElementById('payment-type').addEventListener('change', (e) => {
    currentPaymentType = e.target.value;
    savePaymentType(currentPaymentType);
    const data = getFormData();
    setPaymentType(currentPaymentType);
    updateNav(currentPaymentType, data);
    if (previewVisible) updatePreview();
  });
  
  // Clear button
  document.getElementById('btn-clear').addEventListener('click', () => {
    if (confirm('Clear all form data?')) {
      clearFormData();
      clearStorage();
      updateNav(currentPaymentType, {});
      if (previewVisible) updatePreview();
      showToast('Form data cleared');
    }
  });
  
  // Sample data button
  document.getElementById('btn-sample').addEventListener('click', () => {
    const sample = getSampleData();
    setFormData(sample);
    saveFormData(sample);
    updateNav(currentPaymentType, sample);
    if (previewVisible) updatePreview();
    showToast('Sample data loaded');
  });
  
  // Preview toggle
  document.getElementById('btn-preview').addEventListener('click', () => {
    const panel = document.getElementById('xml-preview');
    previewVisible = !previewVisible;
    panel.classList.toggle('hidden', !previewVisible);
    if (previewVisible) updatePreview();
  });
  
  // Download button
  document.getElementById('btn-download').addEventListener('click', (e) => {
    e.preventDefault();
    const data = getFormData();
    const xml = generateXML(data, currentPaymentType);
    const blob = new Blob([xml], { type: 'application/xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = getDownloadFilename();
    
    document.body.appendChild(a);
    a.click();
    
    // Give the browser plenty of time to launch the download dialog
    // before destroying the link and object URL.
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 2000);
    
    showToast('XML file downloaded', 'success');
  });
  
  // Copy XML button
  document.getElementById('btn-copy-xml').addEventListener('click', () => {
    const data = getFormData();
    const xml = generateXML(data, currentPaymentType);
    navigator.clipboard.writeText(xml).then(() => {
      showToast('XML copied to clipboard', 'success');
    }).catch(() => {
      showToast('Failed to copy');
    });
  });
  
  // Collapse/Expand nav
  document.getElementById('btn-nav-collapse').addEventListener('click', () => {
    collapseAllNav();
  });
  
  document.getElementById('btn-nav-expand').addEventListener('click', () => {
    expandAllNav();
  });

  // Collapse/Expand form
  document.getElementById('btn-form-collapse').addEventListener('click', () => {
    document.querySelectorAll('.section-card.expanded').forEach(el => el.classList.remove('expanded'));
  });
  
  document.getElementById('btn-form-expand').addEventListener('click', () => {
    document.querySelectorAll('.section-card').forEach(el => el.classList.add('expanded'));
  });
}

function showToast(message, type = '') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => toast.remove(), 2500);
}

// Boot
document.addEventListener('DOMContentLoaded', init);
