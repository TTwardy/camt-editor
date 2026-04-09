// CAMT.053 Editor - Main Application
import './styles.css';
import { CAMT_SCHEMA } from './schema.js';
import { initFavorites, updateFavoritesData } from './favorites.js';
import { initFormRenderer, setPaymentType, getFormData, setFormData, clearFormData } from './form-renderer.js';
import { initNav, updateNav, updateNavIndicators, collapseAllNav, expandAllNav } from './nav.js';
import { generateXML, generateHighlightedXML, getDownloadFilename } from './xml-generator.js';
import { saveFormData, loadFormData, clearFormData as clearStorage, savePaymentType, loadPaymentType } from './storage.js';
import { getSampleData } from './sample-data.js';
import { parseXMLToFormData } from './xml-parser.js';

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
  
  // Initialize favorites
  initFavorites(onFormChange);
  updateFavoritesData(initialData);
  
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
  updateFavoritesData(data);
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
  // Options menu toggle
  const btnOptions = document.getElementById('btn-options');
  const optionsMenu = document.getElementById('options-menu');
  if (btnOptions && optionsMenu) {
    btnOptions.addEventListener('click', (e) => {
      e.stopPropagation();
      optionsMenu.classList.toggle('hidden');
    });
    
    document.addEventListener('click', (e) => {
      if (!optionsMenu.contains(e.target) && e.target !== btnOptions) {
        optionsMenu.classList.add('hidden');
      }
    });
  }

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
      updateFavoritesData({});
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
    updateFavoritesData(sample);
    if (previewVisible) updatePreview();
    showToast('Sample data loaded');
  });

  // Upload button
  const fileUploadBtn = document.getElementById('btn-upload');
  const fileUploadInput = document.getElementById('file-upload');
  
  if (fileUploadBtn && fileUploadInput) {
    fileUploadBtn.addEventListener('click', () => {
      fileUploadInput.click();
    });

    fileUploadInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const xmlString = event.target.result;
          const parsedData = parseXMLToFormData(xmlString, CAMT_SCHEMA);
          
          if (Object.keys(parsedData).length === 0) {
            showToast('No valid CAMT fields found in file', 'error');
            return;
          }

          setFormData(parsedData);
          saveFormData(parsedData);
          updateNav(currentPaymentType, parsedData);
          updateFavoritesData(parsedData);
          if (previewVisible) updatePreview();
          
          showToast('XML file imported successfully', 'success');
        } catch (err) {
          console.error(err);
          showToast('Failed to parse XML file', 'error');
        }
      };
      reader.readAsText(file);
      
      // Reset input so the same file could be uploaded again
      e.target.value = '';
    });
  }
  
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
    
    // Apply download options
    const optIncrementSeq = document.getElementById('opt-increment-seq')?.checked;
    const optUpdateDates = document.getElementById('opt-update-dates')?.checked;
    
    if (optIncrementSeq || optUpdateDates) {
      applyDownloadOptions(data, optIncrementSeq, optUpdateDates);
      setFormData(data); // Re-render UI
      saveFormData(data); // Save updated state
      updateFavoritesData(data);
      if (previewVisible) updatePreview();
    }

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

  // Modal logic
  const modal = document.getElementById('about-modal');
  const btnCloseModal = document.getElementById('btn-modal-close');
  const btnAbout = document.getElementById('btn-about');

  if (modal && btnCloseModal && btnAbout) {
    if (!localStorage.getItem('disclaimerAccepted')) {
      modal.classList.remove('hidden');
    }

    btnCloseModal.addEventListener('click', () => {
      localStorage.setItem('disclaimerAccepted', 'true');
      modal.classList.add('hidden');
    });

    btnAbout.addEventListener('click', () => {
      modal.classList.remove('hidden');
    });
  }
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

function applyDownloadOptions(data, incrementSeq, updateDates) {
  if (incrementSeq) {
    for (const key of Object.keys(data)) {
      if (key.endsWith('.ElctrncSeqNb') || key === 'Stmt.ElctrncSeqNb') {
        const val = parseInt(data[key], 10);
        if (!isNaN(val)) {
          data[key] = (val + 1).toString();
        }
      }
    }
  }

  if (updateDates) {
    const offsetMinutes = parseInt(document.getElementById('opt-date-offset')?.value || '0', 10);
    const now = new Date(Date.now() + offsetMinutes * 60000);
    const dtString = now.toISOString().slice(0, 19) + 'Z';
    const dString = dtString.slice(0, 10);

    const datePaths = new Set();
    const dateTimePaths = new Set();
    
    function collectPaths(nodes, currentPath) {
      for (const node of nodes) {
        const path = currentPath ? `${currentPath}.${node.tag}` : node.tag;
        if (node.type === 'DateTime') dateTimePaths.add(path);
        if (node.type === 'Date') datePaths.add(path);
        if (node.children) collectPaths(node.children, path);
      }
    }
    collectPaths(CAMT_SCHEMA, '');

    for (const key of Object.keys(data)) {
      if (!data[key]) continue; // Skip empty fields

      if (dateTimePaths.has(key)) {
        data[key] = dtString;
      } else if (datePaths.has(key)) {
        data[key] = dString;
      } else if (key.endsWith('.Dt') || key.endsWith('.FrDt') || key.endsWith('.ToDt')) {
        // Fallback checks
        data[key] = dString;
      } else if (key.endsWith('.DtTm') || key.endsWith('.CreDtTm')) {
        data[key] = dtString;
      }
    }
  }
}

// Boot
document.addEventListener('DOMContentLoaded', init);
