import { fetchServices } from '../../lib/api.js';
import { initPageAnimations, destroyPageAnimations } from '../../lib/animations.js';

const SERVICE_ICONS = ['🚐', '🛠️', '⚡', '🏕️', '🔧', '🌿'];

const PRICE_RANGES = {
  'full-van-conversion': 'From $65,000',
  'interior-fit-out': 'From $25,000',
  'electrical-solar': 'From $8,000',
  'pop-top-roof': 'From $12,000',
  'insulation-ventilation': 'From $4,500',
  'custom-upholstery': 'From $3,500',
};

function getPriceRange(service) {
  return PRICE_RANGES[service.slug] ?? 'Custom quote';
}

function serviceImage(service, index) {
  if (service.imageUrl) {
    return `<img src="${service.imageUrl}" alt="" class="service-detail-card__image" loading="lazy" />`;
  }

  const hue = 220 + index * 15;
  return `<div class="service-detail-card__placeholder" style="--hue: ${hue}" aria-hidden="true">
    <span>${SERVICE_ICONS[index % SERVICE_ICONS.length]}</span>
  </div>`;
}

function renderPageHero() {
  return `<section class="page-hero page-hero--compact" data-hero data-animate-section>
    <div class="page-hero__bg" aria-hidden="true"></div>
    <div class="container page-hero__content">
      <p class="page-hero__eyebrow" data-hero-item>What We Offer</p>
      <h1 class="page-hero__title" data-hero-item>Our Services</h1>
      <p class="page-hero__subtitle" data-hero-item>
        From full conversions to targeted upgrades — every service is tailored to how you travel.
      </p>
    </div>
  </section>`;
}

function renderServiceCards(services) {
  const cards = services
    .map(
      (service, index) => `<article class="service-detail-card" data-animate-item>
        ${serviceImage(service, index)}
        <div class="service-detail-card__body">
          <div class="service-detail-card__header">
            <h2 class="service-detail-card__title">${service.title}</h2>
            <span class="service-detail-card__price">${getPriceRange(service)}</span>
          </div>
          <p class="service-detail-card__description">${service.description}</p>
          <ul class="service-detail-card__features">
            <li>Custom design consultation included</li>
            <li>Premium materials &amp; proven components</li>
            <li>Workmanship warranty on all labour</li>
          </ul>
          <a href="/contact" data-nav-link class="btn btn--primary service-detail-card__cta">Get a Quote</a>
        </div>
      </article>`
    )
    .join('');

  return `<section class="static-section" data-animate-section aria-label="Service listings">
    <div class="container">
      <div class="service-detail-grid">${cards}</div>
    </div>
  </section>`;
}

function renderCta() {
  return `<section class="static-section static-section--alt" data-animate-section>
    <div class="container">
      <div class="info-banner" data-animate-item>
        <h2 class="info-banner__title">Not Sure Where to Start?</h2>
        <p class="info-banner__text">
          Book a free consultation and we will help you choose the right services for your build and budget.
        </p>
        <a href="/contact" data-nav-link class="btn btn--primary">Book a Consultation</a>
      </div>
    </div>
  </section>`;
}

export async function renderServicesPage() {
  const services = await fetchServices();

  return `<div class="static-page">
    ${renderPageHero()}
    ${renderServiceCards(services)}
    ${renderCta()}
  </div>`;
}

export function mountServicesPage() {
  destroyPageAnimations();
  requestAnimationFrame(() => initPageAnimations());
}
