const PRODUCTS_ENDPOINT = 'data/products.json';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export async function fetchProducts({ limit } = {}) {
  const response = await fetch(PRODUCTS_ENDPOINT);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const data = await response.json();
  if (!Array.isArray(data)) {
    throw new Error('Products payload must be an array');
  }

  const sorted = data.sort((a, b) => (b.featured === true) - (a.featured === true));
  return typeof limit === 'number' ? sorted.slice(0, limit) : sorted;
}

export function filterProducts(products, { search, type, price }) {
  return products.filter((product) => {
    const matchesSearch = search
      ? `${product.brand} ${product.model} ${product.type}`
          .toLowerCase()
          .includes(search.toLowerCase())
      : true;

    const matchesType = type === 'all' ? true : product.type === type;

    const matchesPrice = (() => {
      if (price === 'all') return true;
      if (price === '50000') return Number(product.price) >= 50000;
      const [min, max] = price.split('-').map(Number);
      return Number(product.price) >= min && Number(product.price) <= max;
    })();

    return matchesSearch && matchesType && matchesPrice;
  });
}

export function renderProducts(container, products) {
  if (!container) return;
  container.innerHTML = products
    .map((product) => createProductCard(product))
    .join('');
}

function createProductCard(product) {
  const {
    id,
    brand,
    model,
    type,
    finish,
    price,
    status,
    description,
    thumbnail,
  } = product;

  const detailUrl = `product.html?id=${encodeURIComponent(id)}`;
  const imageStyle = thumbnail
    ? `style="background-image:url('${thumbnail}')"`
    : '';

  return `
    <article class="inventory-card">
      <a class="thumb" href="${detailUrl}" ${imageStyle} aria-label="View ${brand} ${model}">
        ${!thumbnail ? '<span>🎹</span>' : ''}
      </a>
      <div class="content">
        <h3>${brand} ${model}</h3>
        <p class="meta">${type} &bull; ${finish}</p>
        <p class="meta">${status}</p>
        <p>${description}</p>
        <p class="price">${currencyFormatter.format(price)}</p>
        <div class="actions">
          <a class="btn btn-primary" href="mailto:sales@bnn-piano.com?subject=${encodeURIComponent(
            brand + ' ' + model
          )}">Request Hold</a>
          <a class="btn btn-outline" href="${detailUrl}">View Details</a>
        </div>
      </div>
    </article>
  `;
}