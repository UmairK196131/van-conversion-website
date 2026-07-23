import { SITE } from '../../config/site.js';
import { initPageAnimations, destroyPageAnimations } from '../../lib/animations.js';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1561361513-2d2a49cc0bcf?w=1200&q=80&auto=format&fit=crop';

const STATS = [
  { value: '10+', label: 'Years Experience' },
  { value: '80+', label: 'Builds Completed' },
  { value: '4.9', label: 'Average Rating' },
  { value: '100%', label: 'Custom Designs' },
];

const VALUES = [
  {
    icon: '🎯',
    title: 'Purpose-Driven Design',
    description:
      'Every layout starts with how you travel — solo, as a couple, or with family — so nothing feels wasted.',
  },
  {
    icon: '🔧',
    title: 'Craftsmanship First',
    description:
      'We build with marine-grade materials and proven techniques that hold up on rough roads and long seasons.',
  },
  {
    icon: '🌿',
    title: 'Sustainable Choices',
    description:
      'Solar-first electrical systems and efficient insulation reduce your footprint without sacrificing comfort.',
  },
  {
    icon: '🤝',
    title: 'Partnership Mindset',
    description:
      'You stay involved at every milestone. Clear communication and honest timelines are non-negotiable.',
  },
];

const TEAM = [
  {
    name: 'Alex Morgan',
    role: 'Founder & Lead Builder',
    bio: 'Former overland racer with 12 years of custom van builds across North America.',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop',
  },
  {
    name: 'Jordan Lee',
    role: 'Design Director',
    bio: 'Interior architect specializing in compact living spaces and ergonomic van layouts.',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&auto=format&fit=crop',
  },
  {
    name: 'Sam Rivera',
    role: 'Electrical Systems Lead',
    bio: 'Certified solar installer who designs off-grid power for true independence on the road.',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80&auto=format&fit=crop',
  },
  {
    name: 'Casey Walsh',
    role: 'Project Manager',
    bio: 'Keeps every build on schedule with weekly updates and transparent milestone tracking.',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80&auto=format&fit=crop',
  },
];

const MILESTONES = [
  {
    year: '2014',
    title: 'The First Build',
    description: 'Started in a garage with one Sprinter and a passion for van life.',
  },
  {
    year: '2017',
    title: 'Workshop Expansion',
    description: 'Moved to a dedicated 5,000 sq ft facility in Portland.',
  },
  {
    year: '2020',
    title: '80 Builds Milestone',
    description: 'Celebrated our 80th completed conversion with a community open house.',
  },
  {
    year: '2024',
    title: 'Electrical Lab',
    description: 'Opened an in-house solar and lithium battery testing lab.',
  },
];

function renderPageHero() {
  return `<section class="page-hero" data-hero data-animate-section>
    <div class="page-hero__media" aria-hidden="true">
      <img src="${HERO_IMAGE}" alt="" class="page-hero__image" />
      <div class="page-hero__overlay"></div>
    </div>
    <div class="container page-hero__content">
      <p class="page-hero__eyebrow" data-hero-item>About ${SITE.name}</p>
      <h1 class="page-hero__title" data-hero-item>Built by Adventurers, for Adventurers</h1>
      <p class="page-hero__subtitle" data-hero-item>
        We are a team of van-life enthusiasts and master craftspeople turning dream vehicles into road-ready homes.
      </p>
    </div>
  </section>`;
}

function renderStory() {
  return `<section class="static-section" data-animate-section aria-labelledby="about-story-heading">
    <div class="container">
      <div class="split-layout">
        <div data-animate-item>
          <p class="section-eyebrow">Our Story</p>
          <h2 id="about-story-heading" class="section-title">From Garage Project to Full-Service Workshop</h2>
          <p class="section-description section-description--left">
            What began as a personal Sprinter conversion in 2014 grew into a full workshop serving adventurers
            across the Pacific Northwest and beyond. We saw a gap between cookie-cutter RV builds and
            truly custom adventure vehicles — and set out to fill it.
          </p>
          <p class="section-description section-description--left">
            Today, our team of builders, designers, and electricians work collaboratively on every project.
            Whether you need a weekend warrior or a full-time mobile home, we bring the same rigor and care
            to every square inch of your build.
          </p>
        </div>
        <div data-animate-item>
          <div class="mission-card">
            <h3 class="mission-card__title">Our Mission</h3>
            <p class="mission-card__text">
              To craft adventure vehicles that empower people to explore further, live lighter, and
              experience the freedom of the open road — without compromising comfort or reliability.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

function renderStats() {
  const items = STATS.map(
    (stat) => `<div class="stat-card" data-animate-item>
      <span class="stat-card__value">${stat.value}</span>
      <span class="stat-card__label">${stat.label}</span>
    </div>`
  ).join('');

  return `<section class="static-section static-section--alt" data-animate-section aria-label="Company statistics">
    <div class="container">
      <div class="stat-grid">${items}</div>
    </div>
  </section>`;
}

function renderValues() {
  const items = VALUES.map(
    (value) => `<div class="feature-card" data-animate-item>
      <span class="feature-card__icon" aria-hidden="true">${value.icon}</span>
      <h3 class="feature-card__title">${value.title}</h3>
      <p class="feature-card__description">${value.description}</p>
    </div>`
  ).join('');

  return `<section class="static-section" data-animate-section aria-labelledby="about-values-heading">
    <div class="container">
      <div class="section-header" data-animate-item>
        <p class="section-eyebrow">What We Stand For</p>
        <h2 id="about-values-heading" class="section-title">Our Values</h2>
      </div>
      <div class="feature-grid">${items}</div>
    </div>
  </section>`;
}

function renderTeam() {
  const members = TEAM.map(
    (member) => `<article class="team-card" data-animate-item>
      <img src="${member.image}" alt="${member.name}" class="team-card__image" loading="lazy" width="400" height="400" />
      <div class="team-card__body">
        <h3 class="team-card__name">${member.name}</h3>
        <p class="team-card__role">${member.role}</p>
        <p class="team-card__bio">${member.bio}</p>
      </div>
    </article>`
  ).join('');

  return `<section class="static-section static-section--alt" data-animate-section aria-labelledby="about-team-heading">
    <div class="container">
      <div class="section-header" data-animate-item>
        <p class="section-eyebrow">The Crew</p>
        <h2 id="about-team-heading" class="section-title">Meet the Team</h2>
        <p class="section-description">
          Passionate builders and designers who live the van-life lifestyle they help create.
        </p>
      </div>
      <div class="team-grid">${members}</div>
    </div>
  </section>`;
}

function renderTimeline() {
  const items = MILESTONES.map(
    (item) => `<div class="timeline-item" data-animate-item>
      <span class="timeline-item__year">${item.year}</span>
      <div class="timeline-item__content">
        <h3 class="timeline-item__title">${item.title}</h3>
        <p class="timeline-item__description">${item.description}</p>
      </div>
    </div>`
  ).join('');

  return `<section class="static-section" data-animate-section aria-labelledby="about-timeline-heading">
    <div class="container">
      <div class="section-header" data-animate-item>
        <p class="section-eyebrow">Our Journey</p>
        <h2 id="about-timeline-heading" class="section-title">Company Timeline</h2>
      </div>
      <div class="about-timeline">${items}</div>
    </div>
  </section>`;
}

function renderCta() {
  return `<section class="cta-banner" data-animate-section aria-labelledby="about-cta-heading">
    <div class="cta-banner__bg" aria-hidden="true"></div>
    <div class="container cta-banner__content">
      <h2 id="about-cta-heading" class="cta-banner__title" data-animate-item>Ready to Work Together?</h2>
      <p class="cta-banner__text" data-animate-item>
        Tell us about your vision and let us bring it to life.
      </p>
      <a href="/contact" data-nav-link class="btn btn--primary btn--lg" data-animate-item>Get in Touch</a>
    </div>
  </section>`;
}

export function renderAboutPage() {
  return `<div class="static-page">
    ${renderPageHero()}
    ${renderStory()}
    ${renderStats()}
    ${renderValues()}
    ${renderTeam()}
    ${renderTimeline()}
    ${renderCta()}
  </div>`;
}

export function mountAboutPage() {
  destroyPageAnimations();
  requestAnimationFrame(() => initPageAnimations());
}
