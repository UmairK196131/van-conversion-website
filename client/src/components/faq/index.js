import { fetchFaq } from '../../lib/api.js';
import { initPageAnimations, destroyPageAnimations } from '../../lib/animations.js';

const CATEGORY_ORDER = ['General', 'Pricing', 'Timeline', 'Customization'];

function groupByCategory(items) {
  const grouped = new Map();

  items.forEach((item) => {
    const category = item.category || 'General';
    if (!grouped.has(category)) grouped.set(category, []);
    grouped.get(category).push(item);
  });

  return CATEGORY_ORDER.filter((cat) => grouped.has(cat)).map((category) => ({
    category,
    items: grouped.get(category),
  }));
}

function renderPageHero() {
  return `<section class="page-hero page-hero--compact" data-hero data-animate-section>
    <div class="page-hero__bg" aria-hidden="true"></div>
    <div class="container page-hero__content">
      <p class="page-hero__eyebrow" data-hero-item>Help Center</p>
      <h1 class="page-hero__title" data-hero-item>Frequently Asked Questions</h1>
      <p class="page-hero__subtitle" data-hero-item>
        Answers about pricing, timelines, customization, and everything in between.
      </p>
    </div>
  </section>`;
}

function renderFaqSections(groups) {
  return groups
    .map(
      ({
        category,
        items,
      }) => `<section class="faq-category" data-animate-section aria-labelledby="faq-${category.toLowerCase()}">
        <h2 id="faq-${category.toLowerCase()}" class="faq-category__title" data-animate-item>${category}</h2>
        <div class="faq-accordion" data-faq-accordion>
          ${items
            .map(
              (item, index) => `<div class="faq-item" data-animate-item>
            <h3>
              <button
                type="button"
                class="faq-item__trigger"
                aria-expanded="false"
                aria-controls="faq-answer-${category}-${index}"
                id="faq-question-${category}-${index}"
              >
                <span class="faq-item__question">${item.question}</span>
                <span class="faq-item__icon" aria-hidden="true"></span>
              </button>
            </h3>
            <div
              class="faq-item__panel"
              id="faq-answer-${category}-${index}"
              role="region"
              aria-labelledby="faq-question-${category}-${index}"
            >
              <div class="faq-item__answer">
                <p>${item.answer}</p>
              </div>
            </div>
          </div>`
            )
            .join('')}
        </div>
      </section>`
    )
    .join('');
}

function renderContactCta() {
  return `<section class="static-section static-section--alt" data-animate-section>
    <div class="container">
      <div class="info-banner" data-animate-item>
        <h2 class="info-banner__title">Still Have Questions?</h2>
        <p class="info-banner__text">
          Our team is happy to help. Reach out and we will get back to you within one business day.
        </p>
        <a href="/contact" data-nav-link class="btn btn--primary">Contact Us</a>
      </div>
    </div>
  </section>`;
}

export async function renderFaqPage() {
  const items = await fetchFaq();
  const groups = groupByCategory(items);

  return `<div class="static-page">
    ${renderPageHero()}
    <div class="container faq-page__content">
      ${renderFaqSections(groups)}
    </div>
    ${renderContactCta()}
  </div>`;
}

function closeItem(item) {
  const trigger = item.querySelector('.faq-item__trigger');
  const panel = item.querySelector('.faq-item__panel');
  if (!trigger || !panel) return;

  trigger.setAttribute('aria-expanded', 'false');
  panel.setAttribute('aria-hidden', 'true');
  item.classList.remove('faq-item--open');
}

function openItem(item) {
  const trigger = item.querySelector('.faq-item__trigger');
  const panel = item.querySelector('.faq-item__panel');
  if (!trigger || !panel) return;

  trigger.setAttribute('aria-expanded', 'true');
  panel.setAttribute('aria-hidden', 'false');
  item.classList.add('faq-item--open');
}

export function bindFaqAccordion() {
  document.querySelectorAll('[data-faq-accordion]').forEach((accordion) => {
    accordion.querySelectorAll('.faq-item__panel').forEach((panel) => {
      panel.setAttribute('aria-hidden', 'true');
    });

    accordion.addEventListener('click', (event) => {
      const trigger = event.target.closest('.faq-item__trigger');
      if (!trigger) return;

      const item = trigger.closest('.faq-item');
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';

      accordion.querySelectorAll('.faq-item').forEach((sibling) => {
        if (sibling !== item) closeItem(sibling);
      });

      if (isOpen) {
        closeItem(item);
      } else {
        openItem(item);
      }
    });
  });
}

export function mountFaqPage() {
  destroyPageAnimations();
  bindFaqAccordion();
  requestAnimationFrame(() => initPageAnimations());
}
