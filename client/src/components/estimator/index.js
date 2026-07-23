import { initPageAnimations, destroyPageAnimations } from '../../lib/animations.js';

const VEHICLE_TYPES = [
  { id: 'sprinter', label: 'Mercedes Sprinter', base: 65000 },
  { id: 'transit', label: 'Ford Transit', base: 55000 },
  { id: 'promaster', label: 'Ram ProMaster', base: 50000 },
  { id: 'other', label: 'Other / Not sure', base: 45000 },
];

const FEATURES = [
  { id: 'kitchen', label: 'Full kitchen galley', cost: 12000 },
  { id: 'bathroom', label: 'Bathroom / shower', cost: 15000 },
  { id: 'solar', label: 'Solar & electrical system', cost: 8000 },
  { id: 'poptop', label: 'Pop-top roof', cost: 18000 },
  { id: 'fourByFour', label: '4x4 / AWD upgrade', cost: 10000 },
  { id: 'heating', label: 'Diesel / propane heating', cost: 3500 },
  { id: 'awning', label: 'Exterior awning & gear storage', cost: 4500 },
  { id: 'insulation', label: 'Premium insulation package', cost: 6000 },
];

const FINISH_LEVELS = [
  {
    id: 'standard',
    label: 'Standard',
    multiplier: 1,
    description: 'Quality materials and clean finishes',
  },
  {
    id: 'premium',
    label: 'Premium',
    multiplier: 1.2,
    description: 'Upgraded surfaces, hardware, and appliances',
  },
  {
    id: 'luxury',
    label: 'Luxury',
    multiplier: 1.45,
    description: 'Designer finishes and top-tier components',
  },
];

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

function calculateEstimate({ vehicle, features, finish }) {
  const vehicleType = VEHICLE_TYPES.find((item) => item.id === vehicle) || VEHICLE_TYPES[0];
  const finishLevel = FINISH_LEVELS.find((item) => item.id === finish) || FINISH_LEVELS[0];

  const featureCost = features.reduce((total, featureId) => {
    const feature = FEATURES.find((item) => item.id === featureId);
    return total + (feature?.cost || 0);
  }, 0);

  const subtotal = (vehicleType.base + featureCost) * finishLevel.multiplier;
  const low = Math.round((subtotal * 0.9) / 1000) * 1000;
  const high = Math.round((subtotal * 1.15) / 1000) * 1000;

  return { low, high, subtotal: Math.round(subtotal) };
}

function renderStepIndicator(currentStep) {
  const steps = ['Vehicle', 'Features', 'Finish', 'Estimate'];

  return `<ol class="estimator-steps" aria-label="Estimator progress">
    ${steps
      .map((label, index) => {
        const stepNumber = index + 1;
        const state =
          stepNumber < currentStep
            ? 'estimator-steps__item--complete'
            : stepNumber === currentStep
              ? 'estimator-steps__item--active'
              : '';
        return `<li class="estimator-steps__item ${state}" aria-current="${stepNumber === currentStep ? 'step' : 'false'}">
            <span class="estimator-steps__number">${stepNumber}</span>
            <span class="estimator-steps__label">${label}</span>
          </li>`;
      })
      .join('')}
  </ol>`;
}

function renderVehicleStep() {
  return `<fieldset class="estimator-panel" data-estimator-step="1">
    <legend class="estimator-panel__title">Choose your base vehicle</legend>
    <p class="estimator-panel__hint">Select the van platform you plan to convert or are considering.</p>
    <div class="estimator-options estimator-options--grid">
      ${VEHICLE_TYPES.map(
        (vehicle) => `<label class="estimator-option">
          <input type="radio" name="vehicle" value="${vehicle.id}" ${vehicle.id === 'sprinter' ? 'checked' : ''} />
          <span class="estimator-option__card">
            <span class="estimator-option__label">${vehicle.label}</span>
            <span class="estimator-option__meta">From ${formatCurrency(vehicle.base)}</span>
          </span>
        </label>`
      ).join('')}
    </div>
  </fieldset>`;
}

function renderFeaturesStep() {
  return `<fieldset class="estimator-panel estimator-panel--hidden" data-estimator-step="2">
    <legend class="estimator-panel__title">Select features</legend>
    <p class="estimator-panel__hint">Pick the systems and upgrades you want included in your build.</p>
    <div class="estimator-options estimator-options--list">
      ${FEATURES.map(
        (feature) => `<label class="estimator-option estimator-option--checkbox">
          <input type="checkbox" name="features" value="${feature.id}" />
          <span class="estimator-option__card">
            <span class="estimator-option__label">${feature.label}</span>
            <span class="estimator-option__meta">+${formatCurrency(feature.cost)}</span>
          </span>
        </label>`
      ).join('')}
    </div>
  </fieldset>`;
}

function renderFinishStep() {
  return `<fieldset class="estimator-panel estimator-panel--hidden" data-estimator-step="3">
    <legend class="estimator-panel__title">Choose your finish level</legend>
    <p class="estimator-panel__hint">Finish level affects materials, appliances, and overall fit-and-finish.</p>
    <div class="estimator-options estimator-options--grid">
      ${FINISH_LEVELS.map(
        (level, index) => `<label class="estimator-option">
          <input type="radio" name="finish" value="${level.id}" ${index === 1 ? 'checked' : ''} />
          <span class="estimator-option__card">
            <span class="estimator-option__label">${level.label}</span>
            <span class="estimator-option__meta">${level.description}</span>
          </span>
        </label>`
      ).join('')}
    </div>
  </fieldset>`;
}

function renderResultStep() {
  return `<div class="estimator-panel estimator-panel--hidden" data-estimator-step="4">
    <h2 class="estimator-panel__title">Your estimated range</h2>
    <p class="estimator-panel__hint">This is a ballpark figure based on typical builds. Final pricing depends on layout, materials, and base vehicle condition.</p>
    <div class="estimator-result" data-estimator-result>
      <p class="estimator-result__range" data-estimator-range>—</p>
      <p class="estimator-result__note">Includes design, labour, and standard project management.</p>
    </div>
    <div class="estimator-result__actions">
      <a href="/contact" data-nav-link class="btn btn--primary">Get a Detailed Quote</a>
      <button type="button" class="btn btn--secondary" data-estimator-restart>Start Over</button>
    </div>
  </div>`;
}

export function renderEstimatorPage() {
  return `<div class="static-page">
    <section class="page-hero page-hero--compact" data-hero data-animate-section>
      <div class="page-hero__bg" aria-hidden="true"></div>
      <div class="container page-hero__content">
        <p class="page-hero__eyebrow" data-hero-item>Plan Your Budget</p>
        <h1 class="page-hero__title" data-hero-item>Cost Estimator</h1>
        <p class="page-hero__subtitle" data-hero-item>
          Get a quick ballpark for your dream van conversion in under a minute.
        </p>
      </div>
    </section>

    <section class="static-section" data-animate-section aria-label="Conversion cost estimator">
      <div class="container estimator">
        <div class="estimator__card" data-animate-item>
          <div data-estimator-steps>${renderStepIndicator(1)}</div>
          <form class="estimator-form" data-estimator-form novalidate>
            ${renderVehicleStep()}
            ${renderFeaturesStep()}
            ${renderFinishStep()}
            ${renderResultStep()}
            <div class="estimator-form__nav" data-estimator-nav>
              <button type="button" class="btn btn--secondary" data-estimator-back hidden>Back</button>
              <button type="button" class="btn btn--primary" data-estimator-next>Next</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>`;
}

function getFormState(form) {
  const vehicle = form.querySelector('[name="vehicle"]:checked')?.value || 'sprinter';
  const features = [...form.querySelectorAll('[name="features"]:checked')].map(
    (input) => input.value
  );
  const finish = form.querySelector('[name="finish"]:checked')?.value || 'premium';
  return { vehicle, features, finish };
}

function showStep(form, step) {
  form.querySelectorAll('[data-estimator-step]').forEach((panel) => {
    const panelStep = Number(panel.dataset.estimatorStep);
    panel.classList.toggle('estimator-panel--hidden', panelStep !== step);
  });

  const stepsContainer = document.querySelector('[data-estimator-steps]');
  if (stepsContainer) {
    stepsContainer.innerHTML = renderStepIndicator(step);
  }

  const backButton = form.querySelector('[data-estimator-back]');
  const nextButton = form.querySelector('[data-estimator-next]');
  const nav = form.querySelector('[data-estimator-nav]');

  if (backButton) backButton.hidden = step === 1;
  if (nextButton) nextButton.textContent = step === 3 ? 'See Estimate' : step === 4 ? '' : 'Next';
  if (nextButton) nextButton.hidden = step === 4;
  if (nav) nav.hidden = step === 4;

  if (step === 4) {
    const state = getFormState(form);
    const estimate = calculateEstimate(state);
    const rangeEl = form.querySelector('[data-estimator-range]');
    if (rangeEl) {
      rangeEl.textContent = `${formatCurrency(estimate.low)} – ${formatCurrency(estimate.high)}`;
    }
  }
}

export function mountEstimatorPage() {
  destroyPageAnimations();

  const form = document.querySelector('[data-estimator-form]');
  if (!form) {
    requestAnimationFrame(() => initPageAnimations());
    return;
  }

  let currentStep = 1;

  form.querySelector('[data-estimator-next]')?.addEventListener('click', () => {
    if (currentStep < 4) {
      currentStep += 1;
      showStep(form, currentStep);
    }
  });

  form.querySelector('[data-estimator-back]')?.addEventListener('click', () => {
    if (currentStep > 1) {
      currentStep -= 1;
      showStep(form, currentStep);
    }
  });

  form.querySelector('[data-estimator-restart]')?.addEventListener('click', () => {
    form.reset();
    const premiumFinish = form.querySelector('[name="finish"][value="premium"]');
    if (premiumFinish) premiumFinish.checked = true;
    currentStep = 1;
    showStep(form, currentStep);
  });

  showStep(form, currentStep);
  requestAnimationFrame(() => initPageAnimations());
}

export { calculateEstimate, formatCurrency };
