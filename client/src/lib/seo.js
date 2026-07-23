import { SITE, SOCIAL_LINKS } from '../config/site.js';

const JSON_LD_SELECTOR = 'script[data-seo-jsonld]';

export function getSiteUrl() {
  if (SITE.siteUrl) return SITE.siteUrl.replace(/\/+$/, '');
  if (typeof window !== 'undefined' && window.location.origin) {
    return window.location.origin;
  }
  return '';
}

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

function upsertLink(rel, href) {
  let element = document.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

export function setPageMeta({ title, description, path = '/', image }) {
  document.title = title;

  upsertMeta('meta[name="description"]', { name: 'description', content: description });

  const siteUrl = getSiteUrl();
  const url = `${siteUrl}${path}`;
  const ogImage = image ?? `${siteUrl}/favicon.svg`;

  upsertLink('canonical', url);

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

function absoluteUrl(path) {
  const siteUrl = getSiteUrl();
  if (!path) return siteUrl;
  if (/^https?:\/\//i.test(path)) return path;
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

export function buildOrganizationSchema() {
  const siteUrl = getSiteUrl();
  const sameAs = SOCIAL_LINKS.map((link) => link.href).filter(Boolean);

  return {
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: SITE.name,
    url: siteUrl,
    logo: absoluteUrl(SITE.logoUrl),
    email: SITE.email,
    telephone: SITE.phone,
    sameAs,
  };
}

export function buildLocalBusinessSchema() {
  const siteUrl = getSiteUrl();
  const { street, city, region, postalCode, country } = SITE.addressStructured;

  return {
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}/#localbusiness`,
    name: SITE.name,
    description: SITE.tagline,
    url: siteUrl,
    image: absoluteUrl(SITE.logoUrl),
    email: SITE.email,
    telephone: SITE.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: street,
      addressLocality: city,
      addressRegion: region,
      postalCode,
      addressCountry: country,
    },
    openingHoursSpecification: SITE.openingHours.map((hours) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: hours.dayOfWeek,
      opens: hours.opens,
      closes: hours.closes,
    })),
    parentOrganization: { '@id': `${siteUrl}/#organization` },
  };
}

export function buildSiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@graph': [buildOrganizationSchema(), buildLocalBusinessSchema()],
  };
}

export function buildBlogPostingSchema(post, coverImage) {
  const siteUrl = getSiteUrl();

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: coverImage,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${post.slug}`,
    },
    author: {
      '@type': 'Person',
      name: post.authorName || 'Van Conversion Team',
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: SITE.name,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl(SITE.logoUrl),
      },
    },
  };
}

export function buildCreativeWorkSchema(project, coverImage) {
  const siteUrl = getSiteUrl();

  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    image: coverImage,
    url: `${siteUrl}/portfolio/${project.slug}`,
    creator: {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: SITE.name,
    },
  };
}

export function setStructuredData(schemas = []) {
  document.querySelectorAll(JSON_LD_SELECTOR).forEach((node) => node.remove());

  const payload = [buildSiteStructuredData(), ...schemas].filter(Boolean);
  payload.forEach((data, index) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.seoJsonld = String(index);
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  });
}
