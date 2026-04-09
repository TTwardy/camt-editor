// Favorites Panel — pinned fields for quick access
// Renders a compact bar above the editor with live-synced inputs.

import { saveFavorites, loadFavorites } from './storage.js';

let favorites = loadFavorites();        // Set<path>
let formData = {};
let onChangeCallback = null;
let panelEl = null;

const STAR_FILLED = `<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
const STAR_EMPTY  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;

/**
 * Initialize the favorites system.
 * @param {Function} onChange  called with updated formData when a favorite input changes
 */
export function initFavorites(onChange) {
  onChangeCallback = onChange;
  panelEl = document.getElementById('favorites-panel');
  render();
}

/** Call this whenever formData changes so inputs stay in sync */
export function updateFavoritesData(data) {
  formData = data;
  // Sync input values without a full re-render
  if (!panelEl) return;
  panelEl.querySelectorAll('.fav-input[data-path]').forEach(input => {
    const path = input.dataset.path;
    const newVal = data[path] ?? '';
    if (input.value !== newVal) input.value = newVal;
  });
}

/** Returns whether a given path is currently favorited */
export function isFavorite(path) {
  return favorites.has(path);
}

/**
 * Toggle favorite state for `path`.
 * Returns the new state (true = now favorited).
 */
export function toggleFavorite(path, data) {
  formData = data;
  if (favorites.has(path)) {
    favorites.delete(path);
  } else {
    favorites.add(path);
  }
  saveFavorites(favorites);
  render();
  return favorites.has(path);
}

// ─── Rendering ────────────────────────────────────────────────────────────────

function render() {
  if (!panelEl) return;
  panelEl.innerHTML = '';

  if (favorites.size === 0) {
    panelEl.classList.add('hidden');
    return;
  }

  panelEl.classList.remove('hidden');

  const header = document.createElement('div');
  header.className = 'fav-header';
  header.innerHTML = `
    <svg class="fav-header-icon" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
    <span>Pinned Fields</span>
  `;
  panelEl.appendChild(header);

  const grid = document.createElement('div');
  grid.className = 'fav-list';

  for (const path of favorites) {
    const card = buildFavCard(path);
    grid.appendChild(card);
  }

  panelEl.appendChild(grid);
}

function buildFavCard(path) {
  const card = document.createElement('div');
  card.className = 'fav-card';
  card.dataset.path = path;

  // Derive a short label from the path (last segment, formatted)
  const segments = path.split('.');
  const tag = segments[segments.length - 1];
  const parentTag = segments.length > 1 ? segments[segments.length - 2] : '';
  const label = formatLabel(tag);
  const breadcrumb = segments.slice(0, -1).map(formatLabel).join(' › ');

  const currentVal = formData[path] ?? '';

  card.innerHTML = `
    <div class="fav-card-header">
      <div class="fav-card-label" title="${path}">
        <span class="fav-breadcrumb">${breadcrumb}</span>
        <span class="fav-field-name">${label}</span>
      </div>
      <button class="fav-unpin-btn" title="Unpin field" data-path="${path}">
        ${STAR_FILLED}
      </button>
    </div>
    <input class="fav-input field-input" type="text" data-path="${path}" value="${escapeAttr(currentVal)}" placeholder="—" />
  `;

  // Unpin button
  card.querySelector('.fav-unpin-btn').addEventListener('click', () => {
    favorites.delete(path);
    saveFavorites(favorites);
    // Update star in main form if visible
    const starBtn = document.querySelector(`.star-btn[data-path="${path}"]`);
    if (starBtn) {
      starBtn.classList.remove('active');
      starBtn.innerHTML = STAR_EMPTY;
    }
    render();
  });

  // Input change → propagate to formData
  card.querySelector('.fav-input').addEventListener('input', (e) => {
    const val = e.target.value.trim();
    if (val) {
      formData[path] = val;
    } else {
      delete formData[path];
    }
    // Mirror change to the main form input if it exists
    const mainInput = document.getElementById(`field-${path.replace(/\./g, '-')}`);
    if (mainInput && mainInput.value !== e.target.value) {
      mainInput.value = e.target.value;
    }
    if (onChangeCallback) onChangeCallback({ ...formData });
  });

  return card;
}

function formatLabel(tag) {
  return tag.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2');
}

function escapeAttr(str) {
  return String(str).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
