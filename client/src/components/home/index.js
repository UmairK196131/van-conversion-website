import { fetchServices, fetchFeaturedProjects, fetchTestimonials } from '../../lib/api.js';
import { initHomeAnimations, destroyHomeAnimations } from '../../lib/animations.js';
import { renderHero, bindHero } from './hero.js';
import { renderFeaturedServices } from './featuredServices.js';
import { renderAboutCompany } from './aboutCompany.js';
import { renderWhyChooseUs } from './whyChooseUs.js';
import { renderPortfolioPreview } from './portfolioPreview.js';
import { renderTestimonials, bindTestimonialsCarousel } from './testimonials.js';
import { renderCtaBanner } from './ctaBanner.js';
import { renderContactSnippet, bindContactSnippet } from './contactSnippet.js';
import { renderPanoramaViewer, bindPanoramaViewer } from '../widgets/panoramaViewer.js';

export async function renderHomePage() {
  const [services, projects, testimonials] = await Promise.all([
    fetchServices(),
    fetchFeaturedProjects(),
    fetchTestimonials(),
  ]);

  return `<div class="home-page">
    ${renderHero()}
    ${renderFeaturedServices(services)}
    ${renderAboutCompany()}
    ${renderWhyChooseUs()}
    ${renderPortfolioPreview(projects)}
    ${renderTestimonials(testimonials)}
    ${renderCtaBanner()}
    ${renderPanoramaViewer()}
    ${renderContactSnippet()}
  </div>`;
}

export function mountHomePage(router) {
  destroyHomeAnimations();
  bindHero();
  bindTestimonialsCarousel();
  bindContactSnippet(router);
  bindPanoramaViewer();
  requestAnimationFrame(() => initHomeAnimations());
}
