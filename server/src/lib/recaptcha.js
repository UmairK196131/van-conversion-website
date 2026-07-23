import { config } from '../config/env.js';

const VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';
const MIN_SCORE = 0.5;

export async function verifyRecaptcha(token, remoteIp) {
  if (!config.recaptchaSecretKey) {
    if (config.isProduction) {
      return { success: false, error: 'reCAPTCHA is not configured' };
    }

    console.warn('[recaptcha] RECAPTCHA_SECRET_KEY not set — skipping verification in development');
    return { success: true, score: 1 };
  }

  if (!token) {
    return { success: false, error: 'reCAPTCHA token is required' };
  }

  const body = new URLSearchParams({
    secret: config.recaptchaSecretKey,
    response: token,
  });

  if (remoteIp) {
    body.set('remoteip', remoteIp);
  }

  const response = await fetch(VERIFY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  if (!response.ok) {
    return { success: false, error: 'reCAPTCHA verification failed' };
  }

  const result = await response.json();

  if (!result.success) {
    return { success: false, error: 'reCAPTCHA verification failed' };
  }

  if (typeof result.score === 'number' && result.score < MIN_SCORE) {
    return { success: false, error: 'reCAPTCHA score too low' };
  }

  return { success: true, score: result.score };
}
