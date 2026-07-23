export const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '';

let scriptPromise = null;

function loadRecaptchaScript() {
  if (!RECAPTCHA_SITE_KEY) return Promise.resolve(null);
  if (window.grecaptcha) return Promise.resolve(window.grecaptcha);
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.onload = () => resolve(window.grecaptcha);
    script.onerror = () => reject(new Error('Failed to load reCAPTCHA'));
    document.head.appendChild(script);
  });

  return scriptPromise;
}

export async function getRecaptchaToken(action = 'inquiry_submit') {
  if (!RECAPTCHA_SITE_KEY) {
    if (import.meta.env.PROD) {
      throw new Error('reCAPTCHA is not configured');
    }
    return '';
  }

  const grecaptcha = await loadRecaptchaScript();
  await new Promise((resolve) => {
    grecaptcha.ready(resolve);
  });

  return grecaptcha.execute(RECAPTCHA_SITE_KEY, { action });
}
