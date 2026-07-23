const SITE_URL = typeof window !== 'undefined' ? window.location.origin : '';

function upsertMeta(selector, attributes) {
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

export function setPageMeta({ title, description, path = '/', image }) {
  document.title = title;

  upsertMeta('meta[name="description"]', { name: 'description', content: description });

  const url = `${SITE_URL}${path}`;
  const ogImage = image ?? `${SITE_URL}/favicon.svg`;

  upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title });
  upsertMeta('meta[property="og:description"]', {
    property: 'og:description',
    content: description,
  });
  upsertMeta('meta[property="og:url"]', { property: 'og:url', content: url });
  upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
  upsertMeta('meta[property="og:image"]', { property: 'og:image', content: ogImage });

  upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
  upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
  upsertMeta('meta[name="twitter:description"]', {
    name: 'twitter:description',
    content: description,
  });
}
