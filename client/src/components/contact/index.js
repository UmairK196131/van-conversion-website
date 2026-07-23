import { SITE } from '../../config/site.js';
import { fetchServices, submitInquiry } from '../../lib/api.js';
import { getRecaptchaToken } from '../../lib/recaptcha.js';
import { initPageAnimations, destroyPageAnimations } from '../../lib/animations.js';

const BUDGET_OPTIONS = [
  { value: '', label: 'Select a budget range' },
  { value: 'under-50k', label: 'Under $50,000' },
  { value: '50k-80k', label: '$50,000 – $80,000' },
  { value: '80k-120k', label: '$80,000 – $120,000' },
  { value: '120k-plus', label: '$120,000+' },
  { value: 'not-sure', label: 'Not sure yet' },
];

function renderBudgetOptions() {
  return BUDGET_OPTIONS.map(
    (option) => `<option value="${option.value}">${option.label}</option>`
  ).join('');
}

function renderServiceOptions(services) {
  const options = [
    '<option value="">Select a service</option>',
    ...services.map((service) => `<option value="${service.title}">${service.title}</option>`),
    '<option value="Other">Other / Not sure</option>',
  ];
  return options.join('');
}

function renderCalendlyEmbed() {
  if (!SITE.calendlyUrl) return '';

  return `<section class="static-section static-section--alt" data-animate-section aria-label="Book an appointment">
    <div class="container">
      <div class="section-header" data-animate-item>
        <p class="section-eyebrow">Schedule a Call</p>
        <h2 class="section-title">Book a Consultation</h2>
        <p class="section-description">Pick a time that works for you — we will walk through your ideas and answer your questions.</p>
      </div>
      <div class="calendly-embed" data-animate-item>
        <iframe
          src="${SITE.calendlyUrl}?hide_gdpr_banner=1"
          title="Book a consultation with ${SITE.name}"
          class="calendly-embed__iframe"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  </section>`;
}
function renderContactInfo() {
  return `<div class="contact-info" data-animate-item>
    <h2 class="contact-info__title">Visit Our Workshop</h2>
    <ul class="contact-info__list">
      <li>
        <strong>Address</strong>
        <span>${SITE.address}</span>
      </li>
      <li>
        <strong>Phone</strong>
        <a href="tel:${SITE.phone.replace(/\s/g, '')}" class="inline-link">${SITE.phone}</a>
      </li>
      <li>
        <strong>Email</strong>
        <a href="mailto:${SITE.email}" class="inline-link">${SITE.email}</a>
      </li>
      <li>
        <strong>Hours</strong>
        <span>${SITE.hours}</span>
      </li>
    </ul>
    <div class="contact-map">
      <iframe
        title="Workshop location on Google Maps"
        src="${SITE.mapEmbedUrl}"
        width="100%"
        height="280"
        style="border:0;"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        class="contact-map__iframe"
      ></iframe>
    </div>
  </div>`;
}

function renderInquiryForm(services) {
  return `<form class="inquiry-form" data-inquiry-form novalidate>
    <div class="inquiry-form__status inquiry-form__status--hidden" data-inquiry-status role="status" aria-live="polite"></div>
    <div class="form-field">
      <label for="inquiry-name">Name <span aria-hidden="true">*</span></label>
      <input type="text" id="inquiry-name" name="name" required autocomplete="name" placeholder="Your full name" />
      <p class="form-field__error" data-field-error="name" hidden></p>
    </div>
    <div class="form-field">
      <label for="inquiry-email">Email <span aria-hidden="true">*</span></label>
      <input type="email" id="inquiry-email" name="email" required autocomplete="email" placeholder="you@example.com" />
      <p class="form-field__error" data-field-error="email" hidden></p>
    </div>
    <div class="form-field">
      <label for="inquiry-phone">Phone</label>
      <input type="tel" id="inquiry-phone" name="phone" autocomplete="tel" placeholder="+1 (555) 123-4567" />
    </div>
    <div class="form-field">
      <label for="inquiry-vehicle">Vehicle Model</label>
      <input type="text" id="inquiry-vehicle" name="vehicleModel" placeholder="e.g. Mercedes Sprinter 170" />
    </div>
    <div class="form-field">
      <label for="inquiry-service">Required Service <span aria-hidden="true">*</span></label>
      <select id="inquiry-service" name="service" required>
        ${renderServiceOptions(services)}
      </select>
      <p class="form-field__error" data-field-error="service" hidden></p>
    </div>
    <div class="form-field">
      <label for="inquiry-budget">Budget</label>
      <select id="inquiry-budget" name="budget">
        ${renderBudgetOptions()}
      </select>
    </div>
    <div class="form-field">
      <label for="inquiry-message">Message <span aria-hidden="true">*</span></label>
      <textarea id="inquiry-message" name="message" rows="5" required placeholder="Tell us about your dream build, timeline, and must-have features..."></textarea>
      <p class="form-field__error" data-field-error="message" hidden></p>
    </div>
    <button type="submit" class="btn btn--primary inquiry-form__submit" data-inquiry-submit>
      Send Inquiry
    </button>
    <p class="inquiry-form__privacy">This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" class="inline-link">Privacy Policy</a> and <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" class="inline-link">Terms of Service</a> apply.</p>
  </form>`;
}

export async function renderContactPage() {
  const services = await fetchServices();

  return `<div class="static-page">
    <section class="page-hero page-hero--compact" data-hero data-animate-section>
      <div class="page-hero__bg" aria-hidden="true"></div>
      <div class="container page-hero__content">
        <p class="page-hero__eyebrow" data-hero-item>Start Your Build</p>
        <h1 class="page-hero__title" data-hero-item>Contact Us</h1>
        <p class="page-hero__subtitle" data-hero-item>
          Tell us about your van and vision — we'll respond within one business day with next steps.
        </p>
      </div>
    </section>
    <section class="static-section" data-animate-section aria-label="Contact form and details">
      <div class="container contact-page">
        <div class="contact-page__form" data-animate-item>
          <h2 class="contact-page__form-title">Send an Inquiry</h2>
          ${renderInquiryForm(services)}
        </div>
        ${renderContactInfo()}
      </div>
    </section>
    ${renderCalendlyEmbed()}
  </div>`;
}

function readDraft() {
  try {
    const raw = sessionStorage.getItem('contactDraft');
    if (!raw) return null;
    sessionStorage.removeItem('contactDraft');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function setFieldError(form, field, message) {
  const input = form.querySelector(`[name="${field}"]`);
  const error = form.querySelector(`[data-field-error="${field}"]`);
  if (input) input.setAttribute('aria-invalid', message ? 'true' : 'false');
  if (error) {
    error.textContent = message || '';
    error.hidden = !message;
  }
}

function clearFieldErrors(form) {
  form.querySelectorAll('[data-field-error]').forEach((el) => {
    el.textContent = '';
    el.hidden = true;
  });
  form.querySelectorAll('[aria-invalid]').forEach((el) => el.removeAttribute('aria-invalid'));
}

function showFormStatus(form, message, type) {
  const status = form.querySelector('[data-inquiry-status]');
  if (!status) return;

  status.textContent = message;
  status.classList.remove(
    'inquiry-form__status--hidden',
    'inquiry-form__status--success',
    'inquiry-form__status--error'
  );
  status.classList.add(`inquiry-form__status--${type}`);
}

function hideFormStatus(form) {
  const status = form.querySelector('[data-inquiry-status]');
  if (!status) return;
  status.textContent = '';
  status.classList.add('inquiry-form__status--hidden');
  status.classList.remove('inquiry-form__status--success', 'inquiry-form__status--error');
}

export function mountContactPage() {
  destroyPageAnimations();

  const form = document.querySelector('[data-inquiry-form]');
  if (!form) {
    requestAnimationFrame(() => initPageAnimations());
    return;
  }

  const draft = readDraft();
  if (draft) {
    if (draft.name) form.querySelector('#inquiry-name').value = draft.name;
    if (draft.email) form.querySelector('#inquiry-email').value = draft.email;
    if (draft.message) form.querySelector('#inquiry-message').value = draft.message;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearFieldErrors(form);
    hideFormStatus(form);

    const submitButton = form.querySelector('[data-inquiry-submit]');
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    submitButton.disabled = true;
    submitButton.textContent = 'Sending…';

    try {
      const recaptchaToken = await getRecaptchaToken('inquiry_submit');
      const result = await submitInquiry({ ...payload, recaptchaToken });

      form.reset();
      showFormStatus(form, result.message, 'success');
    } catch (error) {
      if (error.fieldErrors) {
        Object.entries(error.fieldErrors).forEach(([field, message]) => {
          setFieldError(form, field, message);
        });
      }

      showFormStatus(
        form,
        error.message || 'Something went wrong. Please try again or email us directly.',
        'error'
      );
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Send Inquiry';
    }
  });

  requestAnimationFrame(() => initPageAnimations());
}
