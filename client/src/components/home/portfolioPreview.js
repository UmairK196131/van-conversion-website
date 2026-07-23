import { projectCoverImage, renderLazyImage } from '../../lib/images.js';

export function renderPortfolioPreview(projects) {
  const cards = projects
    .map(
      (project) => `<article class="portfolio-card" data-animate-item>
        <a href="/portfolio/${project.slug}" data-nav-link class="portfolio-card__link">
          <div class="portfolio-card__media">
            ${renderLazyImage({
              src: projectCoverImage(project),
              alt: project.title,
              className: 'portfolio-card__image',
              width: 800,
              height: 600,
            })}
            <div class="portfolio-card__overlay">
              <span class="portfolio-card__cta">View Project</span>
            </div>
          </div>
          <div class="portfolio-card__body">
            <p class="portfolio-card__vehicle">${project.vehicleModel}</p>
            <h3 class="portfolio-card__title">${project.title}</h3>
            <p class="portfolio-card__description">${project.description}</p>
          </div>
        </a>
      </article>`
    )
    .join('');

  return `<section class="home-section home-section--alt" data-animate-section aria-labelledby="portfolio-preview-heading">
    <div class="container">
      <div class="section-header" data-animate-item>
        <p class="section-eyebrow">Our Work</p>
        <h2 id="portfolio-preview-heading" class="section-title">Featured Builds</h2>
        <p class="section-description">
          Explore recent conversions showcasing our range of styles, vehicles, and capabilities.
        </p>
      </div>
      <div class="portfolio-grid">${cards}</div>
      <div class="section-footer" data-animate-item>
        <a href="/portfolio" data-nav-link class="btn btn--secondary">View Full Portfolio</a>
      </div>
    </div>
  </section>`;
}
