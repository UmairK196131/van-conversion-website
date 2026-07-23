import { SITE } from '../../config/site.js';

export function renderContactSnippet() {
  return `<section class="home-section home-section--alt" data-animate-section aria-labelledby="contact-snippet-heading">
    <div class="container">
      <div class="contact-snippet">
        <div class="contact-snippet__info" data-animate-item>
          <p class="section-eyebrow">Get in Touch</p>
          <h2 id="contact-snippet-heading" class="section-title">Let's Talk About Your Van</h2>
          <p class="section-description section-description--left">
            Have a question or ready to start planning? Reach out and our team will respond within one business day.
          </p>
          <ul class="contact-snippet__details">
            <li>
              <strong>Email</strong>
              <a href="mailto:${SITE.email}" class="inline-link">${SITE.email}</a>
            </li>
            <li>
              <strong>Phone</strong>
              <a href="tel:${SITE.phone.replace(/\s/g, '')}" class="inline-link">${SITE.phone}</a>
            </li>
            <li>
              <strong>Workshop</strong>
              <span>${SITE.address}</span>
            </li>
          </ul>
        </div>
        <form class="contact-snippet__form" data-contact-snippet data-animate-item novalidate>
          <div class="form-field">
            <label for="contact-name">Name</label>
            <input type="text" id="contact-name" name="name" required autocomplete="name" placeholder="Your name" />
          </div>
          <div class="form-field">
            <label for="contact-email">Email</label>
            <input type="email" id="contact-email" name="email" required autocomplete="email" placeholder="you@example.com" />
          </div>
          <div class="form-field">
            <label for="contact-message">Message</label>
            <textarea id="contact-message" name="message" rows="4" required placeholder="Tell us about your project..."></textarea>
          </div>
          <button type="submit" class="btn btn--primary">Send Message</button>
          <p class="contact-snippet__note">Full inquiry form with budget and vehicle details on our <a href="/contact" data-nav-link class="inline-link">contact page</a>.</p>
        </form>
      </div>
    </div>
  </section>`;
}

export function bindContactSnippet(router) {
  const form = document.querySelector('[data-contact-snippet]');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = form.querySelector('#contact-name')?.value?.trim();
    const email = form.querySelector('#contact-email')?.value?.trim();
    const message = form.querySelector('#contact-message')?.value?.trim();

    if (!name || !email || !message) {
      form.classList.add('contact-snippet__form--error');
      return;
    }

    form.classList.remove('contact-snippet__form--error');
    sessionStorage.setItem('contactDraft', JSON.stringify({ name, email, message }));
    router?.navigate('/contact');
  });
}
