export function renderCtaBanner() {
  return `<section class="cta-banner" data-animate-section aria-labelledby="cta-banner-heading">
    <div class="cta-banner__bg" aria-hidden="true"></div>
    <div class="container cta-banner__content">
      <h2 id="cta-banner-heading" class="cta-banner__title" data-animate-item>Ready to Start Your Build?</h2>
      <p class="cta-banner__text" data-animate-item>
        Tell us about your dream van and we will guide you from concept to keys in hand.
      </p>
      <a href="/contact" data-nav-link class="btn btn--primary btn--lg" data-animate-item>Start Your Build</a>
    </div>
  </section>`;
}
