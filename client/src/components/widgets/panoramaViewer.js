import { SITE } from '../../config/site.js';

let pannellumLoaded = false;

function loadPannellum() {
  if (pannellumLoaded) return Promise.resolve();
  if (document.querySelector('[data-pannellum-css]')) {
    pannellumLoaded = true;
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css';
    link.dataset.pannellumCss = 'true';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js';
    script.async = true;
    script.onload = () => {
      pannellumLoaded = true;
      resolve();
    };
    script.onerror = () => reject(new Error('Failed to load panorama viewer'));
    document.head.appendChild(script);
  });
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
      <div class="panorama-viewer" data-panorama-viewer data-panorama-url="${SITE.panoramaUrl}" data-animate-item role="img" aria-label="360 degree panoramic view"></div>
    </div>
  </section>`;
}

export async function bindPanoramaViewer(root = document) {
  const container = root.querySelector('[data-panorama-viewer]');
  if (!container || container.dataset.panoramaBound) return;

  container.dataset.panoramaBound = 'true';

  try {
    await loadPannellum();

    if (!window.pannellum) return;

    window.pannellum.viewer(container, {
      type: 'equirectangular',
      panorama: container.dataset.panoramaUrl,
      autoLoad: true,
      showControls: true,
      compass: false,
    });
  } catch (error) {
    console.warn('[panorama]', error);
    container.innerHTML =
      '<p class="panorama-viewer__fallback">360° viewer is unavailable. Please try again later.</p>';
  }
}
