import { fetchProducts } from './products.js';

const detailContainer = document.getElementById('product-detail');
const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const renderDetail = (product) => {
  if (!detailContainer) return;

  if (!product) {
    detailContainer.innerHTML = `
      <div class="inventory-empty">
        <p>We couldn\'t find the piano you\'re looking for.</p>
        <a class="btn btn-primary" href="inventory.html">Browse Inventory</a>
      </div>
    `;
    return;
  }

  detailContainer.innerHTML = `
    <article class="detail-card">
      <div class="detail-media" ${product.heroImage ? `style="background-image:url('${product.heroImage}')"` : ''}>
        ${!product.heroImage ? '<span class="placeholder">🎹</span>' : ''}
      </div>
      <div class="detail-body">
        <header>
          <p class="subhead">${product.type} Piano</p>
          <h1>${product.brand} ${product.model}</h1>
          <p class="price">${currencyFormatter.format(product.price)}</p>
          <p class="status">${product.status}</p>
        </header>
        <p class="description">${product.longDescription || product.description}</p>

        <div class="spec-grid">
          ${renderSpec('Finish', product.finish)}
          ${renderSpec('Serial Number', product.serial || 'Available on request')}
          ${renderSpec('Year', product.year || 'Restored')} 
          ${renderSpec('Dimensions', product.dimensions || 'See spec sheet')} 
          ${renderSpec('Warranty', product.warranty || '5-year parts & labor')}
        </div>

        <div class="cta">
          <a class="btn btn-primary" href="mailto:sales@bnn-piano.com?subject=${encodeURIComponent(
            product.brand + ' ' + product.model
          )}">Request Purchase Consultation</a>
          <a class="btn btn-outline" href="index.html#contact">Schedule Showroom Visit</a>
        </div>
      </div>
    </article>
  `;
};

const renderSpec = (label, value) => {
  return `
    <div class="spec">
      <span class="label">${label}</span>
      <span class="value">${value}</span>
    </div>
  `;
};

const enhanceStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    .detail-card {
      display: grid;
      grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
      gap: 3rem;
      background: #fff;
      border-radius: 16px;
      box-shadow: var(--shadow);
      overflow: hidden;
    }

    .detail-media {
      min-height: 420px;
      background: linear-gradient(135deg, rgba(169, 113, 66, 0.25), rgba(27, 31, 42, 0.9));
      background-size: cover;
      background-position: center;
      display: grid;
      place-items: center;
      color: #fff;
      font-size: 4rem;
    }

    .detail-media .placeholder {
      font-size: clamp(3rem, 10vw, 6rem);
    }

    .detail-body {
      padding: 3rem;
      display: grid;
      gap: 1.5rem;
    }

    .detail-body header {
      display: grid;
      gap: 0.5rem;
    }

    .detail-body h1 {
      font-family: 'Playfair Display', serif;
      font-size: clamp(2.5rem, 4vw, 3.25rem);
    }

    .detail-body .subhead {
      text-transform: uppercase;
      letter-spacing: 0.18em;
      font-weight: 600;
      color: #7c7f8f;
      font-size: 0.85rem;
    }

    .detail-body .price {
      font-weight: 700;
      font-size: 1.5rem;
      color: var(--color-primary);
    }

    .detail-body .status {
      font-weight: 500;
      color: #616473;
    }

    .detail-body .description {
      color: #414552;
    }

    .spec-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 1.25rem;
      padding: 1.5rem;
      border-radius: 12px;
      background: var(--color-light);
    }

    .spec {
      display: grid;
      gap: 0.35rem;
    }

    .spec .label {
      font-size: 0.85rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #7c7f8f;
    }

    .spec .value {
      font-weight: 500;
    }

    .cta {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }

    @media (max-width: 900px) {
      .detail-card {
        grid-template-columns: 1fr;
      }

      .detail-media {
        min-height: 320px;
      }

      .detail-body {
        padding: 2rem;
      }
    }
  `;
  document.head.appendChild(style);
};

enhanceStyles();

if (!productId) {
  renderDetail(null);
} else {
  fetchProducts()
    .then((products) => products.find((item) => item.id === productId))
    .then(renderDetail)
    .catch((error) => {
      console.error('Failed to load product detail', error);
      renderDetail(null);
    });
}