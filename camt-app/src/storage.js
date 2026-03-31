// localStorage persistence for CAMT editor form data

const STORAGE_KEY = 'camt053_editor_data';
const PAYMENT_TYPE_KEY = 'camt053_payment_type';

let saveTimeout = null;

export function saveFormData(data) {
  // Debounced save
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('Failed to save form data:', e);
    }
  }, 300);
}

export function loadFormData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.warn('Failed to load form data:', e);
    return null;
  }
}

export function clearFormData() {
  localStorage.removeItem(STORAGE_KEY);
}

export function savePaymentType(type) {
  localStorage.setItem(PAYMENT_TYPE_KEY, type);
}

export function loadPaymentType() {
  return localStorage.getItem(PAYMENT_TYPE_KEY) || 'sepa';
}
