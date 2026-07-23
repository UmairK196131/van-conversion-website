const DIFFERENTIATORS = [
  {
    icon: '✦',
    title: 'Bespoke Design',
    description: 'Every layout is custom-designed around your travel style, budget, and base vehicle.',
  },
  {
    icon: '⚙',
    title: 'Expert Craftsmanship',
    description: 'Skilled builders with years of van conversion experience and meticulous attention to detail.',
  },
  {
    icon: '☀',
    title: 'Off-Grid Ready',
    description: 'Solar, lithium, and water systems engineered for true independence on the road.',
  },
  {
    icon: '🛡',
    title: 'Quality Materials',
    description: 'Marine-grade plywood, premium fabrics, and proven components built to last.',
  },
  {
    icon: '🤝',
    title: 'Transparent Process',
    description: 'Regular updates, clear timelines, and no surprises from consultation to handover.',
  },
  {
    icon: '🏆',
    title: 'Warranty Backed',
    description: 'Comprehensive workmanship warranty for peace of mind on every build.',
  },
];

export function renderWhyChooseUs() {
  const items = DIFFERENTIATORS.map(
    (item) => `<div class="feature-card" data-animate-item>
      <span class="feature-card__icon" aria-hidden="true">${item.icon}</span>
      <h3 class="feature-card__title">${item.title}</h3>
      <p class="feature-card__description">${item.description}</p>
    </div>`
  ).join('');

  return `<section class="home-section" data-animate-section aria-labelledby="why-choose-us-heading">
    <div class="container">
      <div class="section-header" data-animate-item>
        <p class="section-eyebrow">Why Choose Us</p>
        <h2 id="why-choose-us-heading" class="section-title">The Van Conversion Difference</h2>
        <p class="section-description">
          We combine adventure-tested engineering with boutique-level finishes on every project.
        </p>
      </div>
      <div class="feature-grid">${items}</div>
    </div>
  </section>`;
}
