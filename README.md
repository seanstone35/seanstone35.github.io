# seanstone35.github.io

# BNN Piano Website

Static marketing and inventory site for BNN Piano, inspired by high-end piano showroom experiences. The site includes a homepage, inventory filters, product detail views, and a JSON generator to simplify adding new listings.

## Structure

- `index.html` – Homepage with featured inventory, services, testimonials, and contact forms.
- `inventory.html` – Full inventory browser with the same filters as the homepage.
- `product.html` – Dynamic product detail template driven by query parameters and `data/products.json`.
- `admin.html` – Generates JSON snippets for new listings that can be appended to `data/products.json`.
- `privacy.html` – Privacy policy stub page.
- `assets/css/` – Global and admin-specific styles.
- `assets/js/` – Modular JavaScript for navigation, inventory rendering, product details, and admin helpers.
- `data/products.json` – Structured data source for all inventory entries.
- `data/site.json` – Centralized business profile used to populate contact details, SEO metadata, and branding assets.
- `images/` – Placeholder directory for product and hero images (add your own assets here). Default SVG placeholders are provided to avoid broken image requests.

## Adding Products

1. Open `admin.html` in a browser (e.g., `http://localhost:4000/admin.html` when using a static server).
2. Fill out the form and click **Generate Listing**.
3. Copy the JSON snippet and paste it into the array within `data/products.json`.
4. Commit and deploy to publish the new listing.

Alternatively, manually add objects to `data/products.json` using the same schema.

## Updating Branding & Contact Information

All repeating business information (address, phone, social links, SEO copy, and default media) is stored in `data/site.json`.

1. Update the JSON values to match your official details from bnpiano.com (logo path, address, phone, etc.).
2. Replace `images/logo-placeholder.svg` and other placeholder artwork with your production assets, keeping filenames consistent or updating `data/site.json` to match.
3. Reload the site—navigation, footer, contact forms, and meta tags will reflect the new configuration automatically.

## Local Development

Use any static file server to preview the site. For example:

```bash
# From the repository root
python -m http.server 4000
```

Then visit `http://localhost:4000/` in your browser.

## Publishing to GitHub Pages

If this repository is named `username.github.io` (replace `username` with your GitHub handle), GitHub automatically serves
the `main` branch on your personal Pages domain. To publish the current site:

1. Make sure all changes are committed locally.
2. Add the repository as a remote if it is not already:
   ```bash
   git remote add origin git@github.com:username/username.github.io.git
   ```
   Use the HTTPS URL if you prefer: `https://github.com/username/username.github.io.git`.
3. Push the branch to GitHub:
   ```bash
   git push -u origin main
   ```
4. Open the repository on GitHub, go to **Settings → Pages**, and confirm that the source is set to the `main` branch.

After a few minutes, the site will be available at `https://username.github.io/`.

### Quick publish script (for this repo)

To publish this site specifically to `seanstone35.github.io`, run:

```bash
./publish.sh
```

The script ensures your working tree is clean, adds the `origin` remote pointing to
`https://github.com/seanstone35/seanstone35.github.io.git` if it doesn't exist yet, and pushes
the current branch to the `main` branch on GitHub. When pushing over HTTPS, Git will prompt
you for your GitHub username and a personal access token (PAT). You can create a PAT by
visiting <https://github.com/settings/tokens?type=beta> and enabling the **repo** scope.
After the push completes, visit <https://github.com/seanstone35/seanstone35.github.io/settings/pages>
and confirm Pages is enabled.

If you are deploying to a project site (any repo name other than `username.github.io`), enable GitHub Pages on that
repository and ensure assets are referenced with relative paths. The public URL will be `https://username.github.io/repo/`.

## Forms

Contact and newsletter forms are configured with [Formspree](https://formspree.io/) endpoints. Replace the endpoints with your own if desired.
