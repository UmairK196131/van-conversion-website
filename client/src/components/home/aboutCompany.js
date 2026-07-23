const ABOUT_IMAGE =
  'https://images.unsplash.com/photo-1561361513-2d2a49cc0bcf?w=800&q=80&auto=format&fit=crop';

export function renderAboutCompany() {
  return `<section class="home-section home-section--alt" data-animate-section aria-labelledby="about-company-heading">
    <div class="container">
      <div class="split-layout">
        <div class="split-layout__media" data-animate-item>
          <img
            src="${ABOUT_IMAGE}"
            alt="Craftsperson working on a van conversion interior"
            class="split-layout__image"
            loading="lazy"
            width="800"
            height="600"
          />
        </div>
        <div class="split-layout__content" data-animate-item>
          <p class="section-eyebrow">About Us</p>
          <h2 id="about-company-heading" class="section-title">Built by Adventurers, for Adventurers</h2>
          <p class="section-description section-description--left">
            We are a team of van-life enthusiasts and master craftspeople based in the Pacific Northwest.
            Every conversion blends rugged engineering with refined design — so your vehicle is as capable
            off-grid as it is comfortable at camp.
          </p>
          <p class="section-description section-description--left">
            With over a decade of experience and dozens of completed builds, we turn your vision into a
            road-ready home you will love for years to come.
          </p>
          <a href="/about" data-nav-link class="btn btn--primary">Learn More</a>
        </div>
      </div>
    </div>
  </section>`;
}
