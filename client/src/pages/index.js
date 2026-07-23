import { SITE } from '../config/site.js';
import { renderHomePage, mountHomePage } from '../components/home/index.js';
import { renderAboutPage, mountAboutPage } from '../components/about/index.js';
import { renderServicesPage, mountServicesPage } from '../components/services/index.js';
import { renderProcessPage, mountProcessPage } from '../components/process/index.js';
import { renderFaqPage, mountFaqPage } from '../components/faq/index.js';
import { renderPortfolioPage, mountPortfolioPage } from '../components/portfolio/index.js';
import { renderProjectDetailPage, mountProjectDetailPage } from '../components/portfolio/detail.js';
import { renderTestimonialsPage, mountTestimonialsPage } from '../components/testimonials/index.js';
import { renderBlogPage, mountBlogPage } from '../components/blog/index.js';
import { renderBlogDetailPage, mountBlogDetailPage } from '../components/blog/detail.js';
import { renderContactPage, mountContactPage } from '../components/contact/index.js';
import { renderEstimatorPage, mountEstimatorPage } from '../components/estimator/index.js';

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
      'Van life tips, build updates, and travel inspiration from our conversion workshop.',
    render: () => renderBlogPage(),
    mount: () => mountBlogPage(),
  },
  blogDetail: {
    path: '/blog/:slug',
    title: `Blog | ${SITE.name}`,
    description: 'Read van life tips, conversion guides, and travel inspiration.',
    render: (params) => renderBlogDetailPage(params.slug),
    mount: () => mountBlogDetailPage(),
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
    render: () => renderContactPage(),
    mount: () => mountContactPage(),
  },
  estimator: {
    path: '/estimator',
    title: `Cost Estimator | ${SITE.name}`,
    description:
      'Estimate your van conversion cost with our interactive tool — vehicle type, features, and finish level.',
    render: () => renderEstimatorPage(),
    mount: () => mountEstimatorPage(),
  },
};

export const routes = Object.values(pages);

// Re-export for pages that need a fallback description
export { DEFAULT_DESCRIPTION };
