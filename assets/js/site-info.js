async function loadSiteInfo() {
  try {
    const response = await fetch('data/site.json', { cache: 'no-store' });
    if (!response.ok) throw new Error(`Failed to load site info: ${response.status}`);
    const data = await response.json();
    applySiteInfo(data);
  } catch (error) {
    console.error(error);
  }
}

function applySiteInfo(config) {
  if (!config || typeof config !== 'object') return;

  const businessNameEls = document.querySelectorAll('[data-site="business-name"]');
  businessNameEls.forEach((el) => {
    el.textContent = config.businessName;
  });

  const businessHtmlEls = document.querySelectorAll('[data-site="business-html"]');
  businessHtmlEls.forEach((el) => {
    el.innerHTML = config.contact.addressHtml;
  });

  const businessInlineEls = document.querySelectorAll('[data-site="business-inline"]');
  businessInlineEls.forEach((el) => {
    const inlineValue = config.contact.addressInline || el.textContent;
    el.textContent = inlineValue;
  });

  const taglineEl = document.querySelector('[data-site="tagline"]');
  if (taglineEl && config.tagline) {
    taglineEl.textContent = config.tagline;
  }

  const descriptionEl = document.querySelector('[data-site="description"]');
  if (descriptionEl && config.description) {
    descriptionEl.textContent = config.description;
  }

  if (config?.logo?.src) {
    const logoImages = document.querySelectorAll('img[data-site="logo"]');
    logoImages.forEach((img) => {
      img.src = config.logo.src;
      img.alt = config.logo.alt || `${config.businessName} logo`;
      if (config.logo.width) img.width = config.logo.width;
      if (config.logo.height) img.height = config.logo.height;
    });
  }

  if (config?.primaryPhoto?.src) {
    const heroImg = document.querySelector('img[data-site="primary-photo"]');
    if (heroImg) {
      heroImg.src = config.primaryPhoto.src;
      heroImg.alt = config.primaryPhoto.alt || `${config.businessName} showroom photo`;
    }
  }

  if (config?.contact?.phone) {
    const phoneLinkEls = document.querySelectorAll('a[data-site="phone-link"]');
    phoneLinkEls.forEach((link) => {
      link.href = config.contact.phone.href;
      link.textContent = config.contact.phone.display;
    });
  }

  const emailEls = document.querySelectorAll('[data-site="email-link"]');
  emailEls.forEach((link) => {
    link.href = `mailto:${config.contact.email}`;
    link.textContent = config.contact.email;
  });

  const hoursEl = document.querySelector('[data-site="hours"]');
  if (hoursEl && config.contact.hours) {
    hoursEl.textContent = config.contact.hours;
  }

  const mapFrame = document.querySelector('iframe[data-site="map"]');
  if (mapFrame && config.contact.mapEmbedUrl) {
    mapFrame.src = config.contact.mapEmbedUrl;
  }

  if (config.social) {
    const socialMap = {
      facebook: 'a[data-site="facebook"]',
      instagram: 'a[data-site="instagram"]',
      youtube: 'a[data-site="youtube"]',
      tiktok: 'a[data-site="tiktok"]'
    };

    Object.entries(socialMap).forEach(([key, selector]) => {
      const href = config.social[key];
      if (!href) return;
      document.querySelectorAll(selector).forEach((anchor) => {
        anchor.href = href;
      });
    });
  }

  if (config.seo) {
    const titleBase = config.seo.title || config.businessName;
    if (document.title) {
      if (document.title.includes('|')) {
        const [, ...rest] = document.title.split('|');
        const suffix = rest.join('|').trim();
        document.title = suffix ? `${titleBase} | ${suffix}` : titleBase;
      } else {
        document.title = titleBase;
      }
    }
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && config.seo.metaDescription) {
      metaDescription.setAttribute('content', config.seo.metaDescription);
    }
    const keywords = document.querySelector('meta[name="keywords"]');
    if (keywords && config.seo.keywords) {
      keywords.setAttribute('content', config.seo.keywords);
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', titleBase);
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription && config.seo.metaDescription) {
      ogDescription.setAttribute('content', config.seo.metaDescription);
    }
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl && config.domain) {
      ogUrl.setAttribute('content', config.domain);
    }
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage && config.seo.ogImage) {
      ogImage.setAttribute('content', config.seo.ogImage);
    }
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', titleBase);
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription && config.seo.metaDescription) {
      twitterDescription.setAttribute('content', config.seo.metaDescription);
    }
    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (twitterImage && config.seo.ogImage) {
      twitterImage.setAttribute('content', config.seo.ogImage);
    }
  }
}

document.addEventListener('DOMContentLoaded', loadSiteInfo);