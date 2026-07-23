import { SITE } from '../../config/site.js';

let pannellumLoaded = false;
let pannellumLoading = null;

function loadPannellum() {
  if (window.pannellum) {
    pannellumLoaded = true;
    return Promise.resolve();
  }

  if (pannellumLoading) return pannellumLoading;

  pannellumLoading = new Promise((resolve, reject) => {
    if (!document.querySelector('[data-pannellum-css]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css';
      link.dataset.pannellumCss = 'true';
      document.head.appendChild(link);
    }

    const existingScript = document.querySelector('[data-pannellum-script]');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve());
      existingScript.addEventListener('error', () =>
        reject(new Error('Failed to load panorama viewer'))
      );
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js';
    script.async = true;
    script.dataset.pannellumScript = 'true';
    script.onload = () => {
      pannellumLoaded = true;
      resolve();
    };
    script.onerror = () => reject(new Error('Failed to load panorama viewer'));
    document.head.appendChild(script);
  });

  return pannellumLoading;
}

function showViewerMessage(container, message) {
  container.innerHTML = `<p class="panorama-viewer__fallback">${message}</p>`;
}

export function renderPanoramaViewer({ title = '360° Van Tour' } = {}) {
  if (!SITE.panoramaUrl) return '';

  return `<section class="panorama-section" data-animate-section aria-label="${title}">
    <div class="container">
      <div class="section-header" data-animate-item>
        <p class="section-eyebrow">Immersive View</p>
        <h2 class="section-title">${title}</h2>
        <p class="section-description">Drag to look around and explore the interior from every angle.</p>
      </div>
      <div
        class="panorama-viewer"
        data-panorama-viewer
        data-panorama-url="${SITE.panoramaUrl}"
        role="img"
        aria-label="360 degree panoramic view"
      >
        <p class="panorama-viewer__fallback">Loading 360° view…</p>
      </div>
    </div>
  </section>`;
}

async function initViewer(container) {
  const panoramaUrl = container.dataset.panoramaUrl;
  if (!panoramaUrl) return;

  container.innerHTML = '<p class="panorama-viewer__fallback">Loading 360° view…</p>';

  try {
    await loadPannellum();

    if (!window.pannellum) {
      showViewerMessage(
        container,
        '360° viewer could not be loaded. Check your internet connection.'
      );
      return;
    }

    container.innerHTML = '';

    const viewer = window.pannellum.viewer(container, {
      type: 'equirectangular',
      panorama: panoramaUrl,
      autoLoad: true,
      showControls: true,
      compass: false,
      hfov: 100,
    });

    viewer.on('load', () => {
      viewer.resize();
    });

    viewer.on('error', (message) => {
      console.warn('[panorama]', message);
      showViewerMessage(
        container,
        'Could not load the panorama image. Check VITE_PANORAMA_URL in your .env file.'
      );
    });

    requestAnimationFrame(() => viewer.resize());
  } catch (error) {
    console.warn('[panorama]', error);
    showViewerMessage(container, '360° viewer is unavailable. Please try again later.');
  }
}

export function bindPanoramaViewer(root = document) {
  const container = root.querySelector('[data-panorama-viewer]');
  if (!container || container.dataset.panoramaBound) return;

  container.dataset.panoramaBound = 'true';

  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (!entry?.isIntersecting) return;

      observer.disconnect();
      initViewer(container);
    },
    { rootMargin: '120px 0px', threshold: 0.1 }
  );

  observer.observe(container);
}
