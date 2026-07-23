import { fetchTestimonials } from '../../lib/api.js';
import { initPageAnimations, destroyPageAnimations } from '../../lib/animations.js';
import { renderLazyImage } from '../../lib/images.js';

function renderStars(rating) {
  return Array.from({ length: 5 }, (_, index) =>
    index < rating
      ? '<span class="testimonial-card__star testimonial-card__star--filled" aria-hidden="true">★</span>'
      : '<span class="testimonial-card__star" aria-hidden="true">★</span>'
  ).join('');
}

function renderAvatar(testimonial) {
  if (testimonial.imageUrl) {
    return renderLazyImage({
      src: testimonial.imageUrl,
      alt: '',
      className: 'testimonials-grid__avatar',
      width: 64,
      height: 64,
    });
  }

  const initials = testimonial.clientName
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return `<div class="testimonials-grid__avatar testimonials-grid__avatar--placeholder" aria-hidden="true">${initials}</div>`;
}

function renderTestimonialCard(testimonial) {
  return `<article class="testimonials-grid__card" data-animate-item>
    <div class="testimonials-grid__rating" aria-label="${testimonial.rating} out of 5 stars">
      ${renderStars(testimonial.rating)}
    </div>
    <blockquote class="testimonials-grid__quote">"${testimonial.quote}"</blockquote>
    <footer class="testimonials-grid__author">
      ${renderAvatar(testimonial)}
      <cite class="testimonials-grid__name">${testimonial.clientName}</cite>
    </footer>
  </article>`;
}

function renderPageHero() {
  return `<section class="page-hero page-hero--compact" data-hero data-animate-section>
    <div class="page-hero__bg" aria-hidden="true"></div>
    <div class="container page-hero__content">
      <p class="page-hero__eyebrow" data-hero-item>Client Stories</p>
      <h1 class="page-hero__title" data-hero-item>Testimonials</h1>
      <p class="page-hero__subtitle" data-hero-item>
        Hear from adventurers who trusted us with their builds.
      </p>
    </div>
  </section>`;
}

function renderCta() {
  return `<section class="static-section static-section--alt" data-animate-section>
    <div class="container">
      <div class="info-banner" data-animate-item>
        <h2 class="info-banner__title">Ready to Join Them?</h2>
        <p class="info-banner__text">
          Book a free consultation and tell us about your dream build.
        </p>
        <a href="/contact" data-nav-link class="btn btn--primary">Get Started</a>
      </div>
    </div>
  </section>`;
}

export async function renderTestimonialsPage() {
  const testimonials = await fetchTestimonials();

  return `<div class="static-page">
    ${renderPageHero()}
    <section class="static-section" data-animate-section aria-label="Customer testimonials">
      <div class="container">
        <div class="testimonials-grid">
          ${testimonials.map(renderTestimonialCard).join('')}
        </div>
      </div>
    </section>
    ${renderCta()}
  </div>`;
}

export function mountTestimonialsPage() {
  destroyPageAnimations();
  requestAnimationFrame(() => initPageAnimations());
}
