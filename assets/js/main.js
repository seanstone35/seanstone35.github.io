import { fetchProducts, filterProducts, renderProducts } from './products.js';

const state = {
  products: [],
  filtered: [],
};

const inventoryGrid = document.getElementById('inventory-grid');
const emptyState = document.getElementById('inventory-empty');
const searchInput = document.getElementById('search');
const typeFilter = document.getElementById('type-filter');
const priceFilter = document.getElementById('price-filter');

const initInventory = async () => {
  if (!inventoryGrid) return;

  try {
    state.products = await fetchProducts({ limit: 6 });
    state.filtered = state.products;
    renderProducts(inventoryGrid, state.filtered);
    toggleEmptyState();
  } catch (error) {
    console.error('Failed to load inventory', error);
    showErrorMessage('We\'re tuning things up. Please try again later.');
  }
};

const toggleEmptyState = () => {
  if (!emptyState) return;
  if (state.filtered.length === 0) {
    emptyState.classList.remove('hidden');
    inventoryGrid?.classList.add('hidden');
  } else {
    emptyState.classList.add('hidden');
    inventoryGrid?.classList.remove('hidden');
  }
};

const showErrorMessage = (message) => {
  if (!emptyState) return;
  emptyState.textContent = message;
  emptyState.classList.remove('hidden');
  inventoryGrid?.classList.add('hidden');
};

const handleFilterChange = () => {
  state.filtered = filterProducts(state.products, {
    search: searchInput?.value || '',
    type: typeFilter?.value || 'all',
    price: priceFilter?.value || 'all',
  });
  renderProducts(inventoryGrid, state.filtered);
  toggleEmptyState();
};

const setCurrentYear = () => {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
};

setCurrentYear();
initInventory();

[searchInput, typeFilter, priceFilter]
  .filter(Boolean)
  .forEach((control) => control.addEventListener('input', handleFilterChange));