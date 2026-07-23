const SERVICE_ICONS = ['🚐', '🛠️', '⚡', '🏕️', '🔧', '🌿'];

function serviceImage(service, index) {
  if (service.imageUrl) {
    return `<img src="${service.imageUrl}" alt="" class="service-card__image" loading="lazy" />`;
  }

  const hue = 220 + index * 15;
  return `<div class="service-card__placeholder" style="--hue: ${hue}" aria-hidden="true">
    <span>${SERVICE_ICONS[index % SERVICE_ICONS.length]}</span>
  </div>`;
}

export function renderFeaturedServices(services) {
  const cards = services
    .map(
      (service, index) => `<article class="service-card" data-animate-item>
        ${serviceImage(service, index)}
        <div class="service-card__body">
          <h3 class="service-card__title">${service.title}</h3>
          <p class="service-card__description">${service.description}</p>
          <a href="/services" data-nav-link class="service-card__link">Learn more →</a>
        </div>
      </article>`
    )
    .join('');

  return `<section class="home-section" data-animate-section aria-labelledby="featured-services-heading">
    <div class="container">
      <div class="section-header" data-animate-item>
        <p class="section-eyebrow">What We Do</p>
        <h2 id="featured-services-heading" class="section-title">Featured Services</h2>
        <p class="section-description">
          From full conversions to targeted upgrades — every build is tailored to how you travel.
        </p>
      </div>
      <div class="service-grid">${cards}</div>
      <div class="section-footer" data-animate-item>
        <a href="/services" data-nav-link class="btn btn--secondary">View All Services</a>
      </div>
    </div>
  </section>`;
}
