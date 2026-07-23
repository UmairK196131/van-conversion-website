import { SITE } from '../../config/site.js';

let tawkLoaded = false;

export function initLiveChat() {
  if (tawkLoaded || !SITE.tawkPropertyId || !SITE.tawkWidgetId) return;

  tawkLoaded = true;

  window.Tawk_API = window.Tawk_API || {};
  window.Tawk_LoadStart = new Date();

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://embed.tawk.to/${SITE.tawkPropertyId}/${SITE.tawkWidgetId}`;
  script.charset = 'UTF-8';
  script.setAttribute('crossorigin', '*');
  document.head.appendChild(script);
}
