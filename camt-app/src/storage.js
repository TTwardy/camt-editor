// localStorage persistence for CAMT editor form data

const STORAGE_KEY = 'camt053_editor_data';
const PAYMENT_TYPE_KEY = 'camt053_payment_type';
const FAVORITES_KEY = 'camt053_favorites';

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

export function saveFavorites(favorites) {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favorites]));
  } catch (e) {
    console.warn('Failed to save favorites:', e);
  }
}

export function loadFavorites() {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch (e) {
    return new Set();
  }
}
