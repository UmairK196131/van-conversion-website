import { subscribeNewsletter, requestBrochure } from '../../lib/api.js';

function setNewsletterStatus(form, message, type) {
  const status = form.querySelector('[data-newsletter-status]');
  if (!status) return;

  status.textContent = message;
  status.classList.remove(
    'newsletter-form__status--hidden',
    'newsletter-form__status--success',
    'newsletter-form__status--error'
  );
  status.classList.add(`newsletter-form__status--${type}`);
}

function hideNewsletterStatus(form) {
  const status = form.querySelector('[data-newsletter-status]');
  if (!status) return;
  status.textContent = '';
  status.classList.add('newsletter-form__status--hidden');
  status.classList.remove('newsletter-form__status--success', 'newsletter-form__status--error');
}

export function renderNewsletterForm({ idPrefix = 'newsletter', compact = false } = {}) {
  const emailId = `${idPrefix}-email`;
  const formClass = compact ? 'newsletter-form newsletter-form--compact' : 'newsletter-form';

  return `<form class="${formClass}" data-newsletter-form novalidate>
    <div class="newsletter-form__status newsletter-form__status--hidden" data-newsletter-status role="status" aria-live="polite"></div>
    <label class="sr-only" for="${emailId}">Email address</label>
    <div class="newsletter-form__fields">
      <input
        type="email"
        id="${emailId}"
        name="email"
        required
        autocomplete="email"
        placeholder="Enter your email"
        class="newsletter-form__input"
      />
      <button type="submit" class="btn btn--primary newsletter-form__submit" data-newsletter-submit>
        Subscribe
      </button>
    </div>
  </form>`;
}

export function bindNewsletterForm(root = document) {
  const forms = root.querySelectorAll('[data-newsletter-form]');

  forms.forEach((form) => {
    if (form.dataset.newsletterBound) return;
    form.dataset.newsletterBound = 'true';

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      hideNewsletterStatus(form);

      const submitButton = form.querySelector('[data-newsletter-submit]');
      const emailInput = form.querySelector('[name="email"]');
      const email = emailInput?.value?.trim();

      if (!email) {
        setNewsletterStatus(form, 'Please enter your email address.', 'error');
        emailInput?.focus();
        return;
      }

      submitButton.disabled = true;
      const originalLabel = submitButton.textContent;
      submitButton.textContent = 'Subscribing…';

      try {
        const result = await subscribeNewsletter({ email, source: 'footer' });
        form.reset();
        setNewsletterStatus(form, result.message, 'success');
      } catch (error) {
        const fieldMessage = error.fieldErrors?.email;
        setNewsletterStatus(
          form,
          fieldMessage || error.message || 'Something went wrong. Please try again.',
          'error'
        );
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = originalLabel;
      }
    });
  });
}

export function renderBrochureModal() {
  return `<dialog class="brochure-modal" data-brochure-modal aria-labelledby="brochure-modal-title">
    <div class="brochure-modal__inner">
      <button type="button" class="brochure-modal__close" data-brochure-close aria-label="Close brochure form">&times;</button>
      <h2 id="brochure-modal-title" class="brochure-modal__title">Download Our Brochure</h2>
      <p class="brochure-modal__text">Enter your email to receive our company brochure with build examples, pricing guidance, and process overview.</p>
      <form class="brochure-form" data-brochure-form novalidate>
        <div class="brochure-form__status brochure-form__status--hidden" data-brochure-status role="status" aria-live="polite"></div>
        <div class="form-field">
          <label for="brochure-email">Email <span aria-hidden="true">*</span></label>
          <input type="email" id="brochure-email" name="email" required autocomplete="email" placeholder="you@example.com" />
        </div>
        <button type="submit" class="btn btn--primary brochure-form__submit" data-brochure-submit>
          Get Brochure
        </button>
      </form>
    </div>
  </dialog>`;
}

function setBrochureStatus(form, message, type) {
  const status = form.querySelector('[data-brochure-status]');
  if (!status) return;

  status.textContent = message;
  status.classList.remove(
    'brochure-form__status--hidden',
    'brochure-form__status--success',
    'brochure-form__status--error'
  );
  status.classList.add(`brochure-form__status--${type}`);
}

export function bindBrochureModal() {
  const modal = document.querySelector('[data-brochure-modal]');
  if (!modal) return;

  const form = modal.querySelector('[data-brochure-form]');
  const closeButton = modal.querySelector('[data-brochure-close]');

  document.querySelectorAll('[data-brochure-trigger]').forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      modal.showModal();
      modal.querySelector('#brochure-email')?.focus();
    });
  });

  closeButton?.addEventListener('click', () => modal.close());

  modal.addEventListener('click', (event) => {
    if (event.target === modal) modal.close();
  });

  form?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const submitButton = form.querySelector('[data-brochure-submit]');
    const email = form.querySelector('[name="email"]')?.value?.trim();

    if (!email) {
      setBrochureStatus(form, 'Please enter your email address.', 'error');
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = 'Preparing…';

    try {
      const result = await requestBrochure({ email });
      setBrochureStatus(form, result.message, 'success');

      if (result.downloadUrl) {
        const link = document.createElement('a');
        link.href = result.downloadUrl;
        link.download = '';
        link.rel = 'noopener';
        document.body.appendChild(link);
        link.click();
        link.remove();
      }

      setTimeout(() => modal.close(), 1500);
    } catch (error) {
      const fieldMessage = error.fieldErrors?.email;
      setBrochureStatus(
        form,
        fieldMessage || error.message || 'Something went wrong. Please try again.',
        'error'
      );
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Get Brochure';
    }
  });
}
