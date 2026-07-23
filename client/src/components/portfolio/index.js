import { fetchProjects } from '../../lib/api.js';
import { initPageAnimations, destroyPageAnimations } from '../../lib/animations.js';
import { projectCoverImage, renderLazyImage, IMAGE_SIZES } from '../../lib/images.js';

export const PORTFOLIO_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'sprinter', label: 'Sprinter' },
  { id: 'transit', label: 'Transit' },
  { id: 'promaster', label: 'ProMaster' },
];

function renderPageHero() {
  return `<section class="page-hero page-hero--compact" data-hero data-animate-section>
    <div class="page-hero__bg" aria-hidden="true"></div>
    <div class="container page-hero__content">
      <p class="page-hero__eyebrow" data-hero-item>Our Work</p>
      <h1 class="page-hero__title" data-hero-item>Portfolio</h1>
      <p class="page-hero__subtitle" data-hero-item>
        Browse completed conversions — filter by vehicle type to find builds like yours.
      </p>
    </div>
  </section>`;
}

function renderFilterTabs(activeFilter) {
  const tabs = PORTFOLIO_FILTERS.map(
    (filter) => `<button
      type="button"
      class="filter-tabs__tab${filter.id === activeFilter ? ' filter-tabs__tab--active' : ''}"
      data-portfolio-filter="${filter.id}"
      aria-pressed="${filter.id === activeFilter}"
    >${filter.label}</button>`
  ).join('');

  return `<div class="filter-tabs" data-portfolio-filters role="tablist" aria-label="Filter portfolio by vehicle type">
    ${tabs}
  </div>`;
}

function renderProjectCard(project) {
  const cover = projectCoverImage(project);

  return `<article class="portfolio-card" data-portfolio-card data-animate-item>
    <a href="/portfolio/${project.slug}" data-nav-link class="portfolio-card__link">
      <div class="portfolio-card__media">
        ${renderLazyImage({
          src: cover,
          alt: project.title,
          className: 'portfolio-card__image',
          width: 800,
          height: 600,
          sizes: IMAGE_SIZES.card,
        })}
        <div class="portfolio-card__overlay">
          <span class="portfolio-card__cta">View Project</span>
        </div>
      </div>
      <div class="portfolio-card__body">
        <p class="portfolio-card__vehicle">${project.vehicleModel}</p>
        <h2 class="portfolio-card__title">${project.title}</h2>
        <p class="portfolio-card__description">${project.description}</p>
      </div>
    </a>
  </article>`;
}

function renderProjectGrid(projects) {
  if (!projects.length) {
    return `<div class="portfolio-empty" data-portfolio-empty>
      <p>No projects match this filter yet. Check back soon or <a href="/contact" data-nav-link class="inline-link">contact us</a> about your build.</p>
    </div>`;
  }

  return `<div class="portfolio-grid" data-portfolio-grid>${projects.map(renderProjectCard).join('')}</div>`;
}

export async function renderPortfolioPage(activeFilter = 'all') {
  const projects = await fetchProjects(activeFilter === 'all' ? undefined : activeFilter);

  return `<div class="static-page">
    ${renderPageHero()}
    <section class="static-section" data-animate-section aria-label="Portfolio projects">
      <div class="container">
        ${renderFilterTabs(activeFilter)}
        ${renderProjectGrid(projects)}
      </div>
    </section>
  </div>`;
}

async function loadFilteredProjects(filter) {
  const projects = await fetchProjects(filter === 'all' ? undefined : filter);
  const grid = document.querySelector('[data-portfolio-grid]');
  const empty = document.querySelector('[data-portfolio-empty]');

  const markup = projects.length
    ? `<div class="portfolio-grid" data-portfolio-grid>${projects.map(renderProjectCard).join('')}</div>`
    : `<div class="portfolio-empty" data-portfolio-empty>
        <p>No projects match this filter yet. Check back soon or <a href="/contact" data-nav-link class="inline-link">contact us</a> about your build.</p>
      </div>`;

  if (grid) {
    grid.outerHTML = markup;
  } else if (empty) {
    empty.outerHTML = markup;
  }

  requestAnimationFrame(() => initPageAnimations());
}

export function mountPortfolioPage() {
  destroyPageAnimations();

  document.querySelector('[data-portfolio-filters]')?.addEventListener('click', async (event) => {
    const tab = event.target.closest('[data-portfolio-filter]');
    if (!tab) return;

    const filter = tab.dataset.portfolioFilter;
    document.querySelectorAll('[data-portfolio-filter]').forEach((button) => {
      const isActive = button.dataset.portfolioFilter === filter;
      button.classList.toggle('filter-tabs__tab--active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });

    await loadFilteredProjects(filter);
  });

  requestAnimationFrame(() => initPageAnimations());
}
