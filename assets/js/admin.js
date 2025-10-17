const form = document.getElementById('product-form');
const output = document.getElementById('output');
const copyButton = document.getElementById('copy');

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

const formatJSON = (data) => {
  return JSON.stringify(data, null, 2);
};

const handleSubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  data.featured = formData.get('featured') === 'on';
  data.price = Number(data.price);
  data.year = data.year ? Number(data.year) : undefined;

  const idBase = `${data.brand || ''}-${data.model || ''}`.trim();
  data.id = slugify(idBase || 'new-piano');

  // Clean empty strings
  Object.keys(data).forEach((key) => {
    if (data[key] === '' || data[key] === undefined || Number.isNaN(data[key])) {
      delete data[key];
    }
  });

  output.textContent = formatJSON(data);
};

const handleCopy = async () => {
  if (!navigator.clipboard) {
    window.alert('Clipboard access is not available in this browser.');
    return;
  }

  try {
    await navigator.clipboard.writeText(output.textContent);
    copyButton.textContent = 'Copied!';
    setTimeout(() => {
      copyButton.textContent = 'Copy to Clipboard';
    }, 2000);
  } catch (error) {
    console.error('Failed to copy JSON', error);
    window.alert('Unable to copy. Please copy manually.');
  }
};

form?.addEventListener('submit', handleSubmit);
copyButton?.addEventListener('click', handleCopy);