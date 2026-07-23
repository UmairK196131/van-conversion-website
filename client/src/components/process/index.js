import { initPageAnimations, destroyPageAnimations } from '../../lib/animations.js';

const STEPS = [
  {
    number: '01',
    title: 'Consultation',
    description:
      'We start with a deep-dive into your travel style, must-haves, and budget. Whether in person or virtual, this session shapes everything that follows.',
    details: ['Needs assessment', 'Budget planning', 'Vehicle evaluation'],
    icon: '💬',
  },
  {
    number: '02',
    title: 'Design',
    description:
      'Our design team creates detailed 3D layouts, electrical schematics, and material selections. You review and refine until every detail is right.',
    details: ['3D layout renderings', 'Material selection', 'Electrical planning'],
    icon: '✏️',
  },
  {
    number: '03',
    title: 'Build',
    description:
      'Skilled craftspeople bring your design to life in our workshop. You receive weekly photo updates and can visit at any milestone.',
    details: ['Weekly progress updates', 'Quality checkpoints', 'Workshop visits welcome'],
    icon: '🔨',
  },
  {
    number: '04',
    title: 'Delivery',
    description:
      'We walk you through every system, provide a full owner manual, and send you off with confidence. Post-delivery support is always available.',
    details: ['Systems walkthrough', 'Owner manual & warranty', 'Ongoing support'],
    icon: '🗝️',
  },
];

function renderPageHero() {
  return `<section class="page-hero page-hero--compact" data-hero data-animate-section>
    <div class="page-hero__bg" aria-hidden="true"></div>
    <div class="container page-hero__content">
      <p class="page-hero__eyebrow" data-hero-item>How It Works</p>
      <h1 class="page-hero__title" data-hero-item>Our Process</h1>
      <p class="page-hero__subtitle" data-hero-item>
        A transparent, collaborative journey from first conversation to keys in hand.
      </p>
    </div>
  </section>`;
}

function renderTimeline() {
  const steps = STEPS.map(
    (step, index) => `<div class="process-step" data-animate-item data-step="${index + 1}">
      <div class="process-step__marker" aria-hidden="true">
        <span class="process-step__icon">${step.icon}</span>
        <span class="process-step__number">${step.number}</span>
      </div>
      <div class="process-step__content">
        <h2 class="process-step__title">${step.title}</h2>
        <p class="process-step__description">${step.description}</p>
        <ul class="process-step__details">
          ${step.details.map((detail) => `<li>${detail}</li>`).join('')}
        </ul>
      </div>
    </div>`
  ).join('');

  return `<section class="static-section" data-animate-section aria-label="Conversion process steps">
    <div class="container">
      <div class="process-timeline">${steps}</div>
    </div>
  </section>`;
}

function renderHighlights() {
  return `<section class="static-section static-section--alt" data-animate-section aria-labelledby="process-highlights-heading">
    <div class="container">
      <div class="section-header" data-animate-item>
        <p class="section-eyebrow">What to Expect</p>
        <h2 id="process-highlights-heading" class="section-title">Built on Transparency</h2>
      </div>
      <div class="feature-grid">
        <div class="feature-card" data-animate-item>
          <span class="feature-card__icon" aria-hidden="true">📅</span>
          <h3 class="feature-card__title">Clear Timelines</h3>
          <p class="feature-card__description">
            Every project gets a detailed schedule with milestone dates you can count on.
          </p>
        </div>
        <div class="feature-card" data-animate-item>
          <span class="feature-card__icon" aria-hidden="true">📸</span>
          <h3 class="feature-card__title">Regular Updates</h3>
          <p class="feature-card__description">
            Weekly photo and video updates keep you connected to your build from anywhere.
          </p>
        </div>
        <div class="feature-card" data-animate-item>
          <span class="feature-card__icon" aria-hidden="true">💰</span>
          <h3 class="feature-card__title">No Surprises</h3>
          <p class="feature-card__description">
            Fixed-price contracts with itemised breakdowns — changes are always discussed upfront.
          </p>
        </div>
      </div>
    </div>
  </section>`;
}

function renderCta() {
  return `<section class="cta-banner" data-animate-section aria-labelledby="process-cta-heading">
    <div class="cta-banner__bg" aria-hidden="true"></div>
    <div class="container cta-banner__content">
      <h2 id="process-cta-heading" class="cta-banner__title" data-animate-item>Start with a Conversation</h2>
      <p class="cta-banner__text" data-animate-item>
        The first step is easy — tell us about your dream build and we will take it from there.
      </p>
      <a href="/contact" data-nav-link class="btn btn--primary btn--lg" data-animate-item>Book Consultation</a>
    </div>
  </section>`;
}

export function renderProcessPage() {
  return `<div class="static-page">
    ${renderPageHero()}
    ${renderTimeline()}
    ${renderHighlights()}
    ${renderCta()}
  </div>`;
}

export function mountProcessPage() {
  destroyPageAnimations();
  requestAnimationFrame(() => initPageAnimations());
}
