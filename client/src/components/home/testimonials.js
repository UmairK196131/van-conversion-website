function renderStars(rating) {
  return Array.from({ length: 5 }, (_, i) =>
    i < rating
      ? '<span class="testimonial-card__star testimonial-card__star--filled" aria-hidden="true">★</span>'
      : '<span class="testimonial-card__star" aria-hidden="true">★</span>'
  ).join('');
}

function renderSlide(testimonial, index) {
  return `<blockquote class="testimonial-card" data-testimonial-slide data-index="${index}" ${index > 0 ? 'hidden' : ''}>
    <div class="testimonial-card__rating" aria-label="${testimonial.rating} out of 5 stars">
      ${renderStars(testimonial.rating)}
    </div>
    <p class="testimonial-card__quote">"${testimonial.quote}"</p>
    <footer class="testimonial-card__author">
      <cite class="testimonial-card__name">${testimonial.clientName}</cite>
    </footer>
  </blockquote>`;
}

export function renderTestimonials(testimonials) {
  const slides = testimonials
    .map((testimonial, index) => renderSlide(testimonial, index))
    .join('');

  const dots = testimonials
    .map(
      (_, index) =>
        `<button type="button" class="testimonials__dot${index === 0 ? ' testimonials__dot--active' : ''}" data-testimonial-dot="${index}" aria-label="Go to testimonial ${index + 1}"></button>`
    )
    .join('');

  return `<section class="home-section" data-animate-section aria-labelledby="testimonials-heading">
    <div class="container">
      <div class="section-header" data-animate-item>
        <p class="section-eyebrow">Client Stories</p>
        <h2 id="testimonials-heading" class="section-title">What Our Clients Say</h2>
      </div>
      <div class="testimonials" data-testimonials data-animate-item>
        <div class="testimonials__track">${slides}</div>
        <div class="testimonials__controls">
          <button type="button" class="testimonials__nav" data-testimonial-prev aria-label="Previous testimonial">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <div class="testimonials__dots">${dots}</div>
          <button type="button" class="testimonials__nav" data-testimonial-next aria-label="Next testimonial">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      </div>
      <div class="section-footer" data-animate-item>
        <a href="/testimonials" data-nav-link class="btn btn--secondary">Read More Reviews</a>
      </div>
    </div>
  </section>`;
}

export function bindTestimonialsCarousel() {
  const container = document.querySelector('[data-testimonials]');
  if (!container) return;

  const slides = [...container.querySelectorAll('[data-testimonial-slide]')];
  const dots = [...container.querySelectorAll('[data-testimonial-dot]')];
  const prevBtn = container.querySelector('[data-testimonial-prev]');
  const nextBtn = container.querySelector('[data-testimonial-next]');

  if (slides.length <= 1) return;

  let current = 0;
  let intervalId = null;

  function goTo(index) {
    slides[current].hidden = true;
    dots[current]?.classList.remove('testimonials__dot--active');
    current = (index + slides.length) % slides.length;
    slides[current].hidden = false;
    dots[current]?.classList.add('testimonials__dot--active');
  }

  function startAutoplay() {
    stopAutoplay();
    intervalId = setInterval(() => goTo(current + 1), 6000);
  }

  function stopAutoplay() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  prevBtn?.addEventListener('click', () => {
    goTo(current - 1);
    startAutoplay();
  });

  nextBtn?.addEventListener('click', () => {
    goTo(current + 1);
    startAutoplay();
  });

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      goTo(Number(dot.dataset.testimonialDot));
      startAutoplay();
    });
  });

  container.addEventListener('mouseenter', stopAutoplay);
  container.addEventListener('mouseleave', startAutoplay);

  startAutoplay();
}
