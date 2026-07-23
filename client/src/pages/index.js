import { SITE } from '../config/site.js';
import { renderHomePage, mountHomePage } from '../components/home/index.js';

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

export const pages = {
  home: {
    path: '/',
    title: `${SITE.name} | Premium Adventure Vehicles`,
    render: () => renderHomePage(),
    mount: (router) => mountHomePage(router),
  },
  about: {
    path: '/about',
    title: `About Us | ${SITE.name}`,
    render: () =>
      pageShell({
        title: 'About Us',
        description:
          'Learn about our team, mission, and the craft behind every conversion. Full content arrives in Sprint 3.',
      }),
  },
  services: {
    path: '/services',
    title: `Services | ${SITE.name}`,
    render: () =>
      pageShell({
        title: 'Our Services',
        description:
          'From full builds to electrical and interior upgrades — service listings arrive in Sprint 3.',
      }),
  },
  portfolio: {
    path: '/portfolio',
    title: `Portfolio | ${SITE.name}`,
    render: () =>
      pageShell({
        title: 'Portfolio',
        description:
          'Browse completed van conversions and before/after showcases. Gallery arrives in Sprint 4.',
      }),
  },
  process: {
    path: '/process',
    title: `Our Process | ${SITE.name}`,
    render: () =>
      pageShell({
        title: 'Our Process',
        description:
          'Consultation, design, build, and delivery — the step-by-step timeline arrives in Sprint 3.',
      }),
  },
  testimonials: {
    path: '/testimonials',
    title: `Testimonials | ${SITE.name}`,
    render: () =>
      pageShell({
        title: 'Testimonials',
        description:
          'Hear from adventurers who trusted us with their builds. Full testimonials arrive in Sprint 4.',
      }),
  },
  blog: {
    path: '/blog',
    title: `Blog | ${SITE.name}`,
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
    render: () =>
      pageShell({
        title: 'Frequently Asked Questions',
        description:
          'Answers about pricing, timelines, and customization. FAQ accordion arrives in Sprint 3.',
      }),
  },
  contact: {
    path: '/contact',
    title: `Contact | ${SITE.name}`,
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
