import { SITE } from '../config/site.js';
import { renderHomePage, mountHomePage } from '../components/home/index.js';
import { renderAboutPage, mountAboutPage } from '../components/about/index.js';
import { renderServicesPage, mountServicesPage } from '../components/services/index.js';
import { renderProcessPage, mountProcessPage } from '../components/process/index.js';
import { renderFaqPage, mountFaqPage } from '../components/faq/index.js';
import { renderPortfolioPage, mountPortfolioPage } from '../components/portfolio/index.js';
import { renderProjectDetailPage, mountProjectDetailPage } from '../components/portfolio/detail.js';
import { renderTestimonialsPage, mountTestimonialsPage } from '../components/testimonials/index.js';

function pageShell({ title, description, children = '' }) {
  return `<section class="page-placeholder">
    <div class="page-placeholder__inner">
      <p class="page-placeholder__eyebrow">Coming in a future sprint</p>
      <h1 class="page-placeholder__title">${title}</h1>
      <p class="page-placeholder__description">${description}</p>
      ${children}
    </div>
  </section>`;
}

const DEFAULT_DESCRIPTION = SITE.tagline;

export const pages = {
  home: {
    path: '/',
    title: `${SITE.name} | Premium Adventure Vehicles`,
    description:
      'Premium van conversion and camper customization — bespoke adventure vehicles built for the road ahead.',
    render: () => renderHomePage(),
    mount: (router) => mountHomePage(router),
  },
  about: {
    path: '/about',
    title: `About Us | ${SITE.name}`,
    description:
      'Meet the team behind our van conversions. Learn about our mission, values, and the craft behind every adventure vehicle we build.',
    render: () => renderAboutPage(),
    mount: () => mountAboutPage(),
  },
  services: {
    path: '/services',
    title: `Services | ${SITE.name}`,
    description:
      'Explore our van conversion services — full builds, interior fit-outs, electrical & solar, and more. Custom quotes for every project.',
    render: () => renderServicesPage(),
    mount: () => mountServicesPage(),
  },
  portfolio: {
    path: '/portfolio',
    title: `Portfolio | ${SITE.name}`,
    description: 'Browse completed van conversions and before/after showcases from our workshop.',
    render: () => renderPortfolioPage(),
    mount: () => mountPortfolioPage(),
  },
  projectDetail: {
    path: '/portfolio/:slug',
    title: `Project | ${SITE.name}`,
    description: 'View project details, gallery, and before/after comparison.',
    render: (params) => renderProjectDetailPage(params.slug),
    mount: () => mountProjectDetailPage(),
  },
  process: {
    path: '/process',
    title: `Our Process | ${SITE.name}`,
    description:
      'From consultation to delivery — understand our step-by-step van conversion process and what to expect at every stage.',
    render: () => renderProcessPage(),
    mount: () => mountProcessPage(),
  },
  testimonials: {
    path: '/testimonials',
    title: `Testimonials | ${SITE.name}`,
    description: 'Hear from adventurers who trusted us with their van conversion builds.',
    render: () => renderTestimonialsPage(),
    mount: () => mountTestimonialsPage(),
  },
  blog: {
    path: '/blog',
    title: `Blog | ${SITE.name}`,
    description:
      'Van life tips, build updates, and travel inspiration. Blog posts arrive in Sprint 5.',
    render: () =>
      pageShell({
        title: 'Blog',
        description:
          'Van life tips, build updates, and travel inspiration. Blog posts arrive in Sprint 5.',
      }),
  },
  faq: {
    path: '/faq',
    title: `FAQ | ${SITE.name}`,
    description:
      'Answers to common questions about van conversion pricing, timelines, customization options, and our build process.',
    render: () => renderFaqPage(),
    mount: () => mountFaqPage(),
  },
  contact: {
    path: '/contact',
    title: `Contact | ${SITE.name}`,
    description:
      'Ready to start your van conversion? Get in touch for a free consultation and custom quote.',
    render: () =>
      pageShell({
        title: 'Contact Us',
        description:
          'Ready to start your build? The inquiry form and map embed arrive in Sprint 5.',
        children: `<div class="page-placeholder__contact">
          <p><strong>Email:</strong> <a href="mailto:${SITE.email}" class="inline-link">${SITE.email}</a></p>
          <p><strong>Phone:</strong> <a href="tel:${SITE.phone.replace(/\s/g, '')}" class="inline-link">${SITE.phone}</a></p>
        </div>`,
      }),
  },
};

export const routes = Object.values(pages);

// Re-export for pages that need a fallback description
export { DEFAULT_DESCRIPTION };
