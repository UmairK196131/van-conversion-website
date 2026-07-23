import sanitizeHtml from 'sanitize-html';

export const LIMITS = {
  name: 100,
  email: 254,
  phone: 30,
  vehicleModel: 100,
  service: 200,
  budget: 50,
  message: 5000,
  title: 200,
  excerpt: 500,
  description: 5000,
  source: 50,
  password: 128,
};

function isControlChar(char) {
  const code = char.charCodeAt(0);
  return (
    (code >= 0 && code <= 8) ||
    code === 11 ||
    code === 12 ||
    (code >= 14 && code <= 31) ||
    code === 127
  );
}

function stripControlChars(value, { allowNewlines = false } = {}) {
  let result = '';

  for (const char of value) {
    if (!isControlChar(char)) {
      result += char;
      continue;
    }

    if (allowNewlines && (char === '\n' || char === '\r')) {
      result += char;
    }
  }

  return result;
}

export function sanitizePlainText(
  value,
  { maxLength = LIMITS.description, allowNewlines = false } = {}
) {
  if (typeof value !== 'string') return '';

  let text = stripControlChars(value, { allowNewlines });
  text = sanitizeHtml(text, { allowedTags: [], allowedAttributes: {} }).trim();

  if (!allowNewlines) {
    text = text.replace(/\s+/g, ' ');
  } else {
    text = text.replace(/\r\n/g, '\n');
  }

  if (maxLength > 0 && text.length > maxLength) {
    text = text.slice(0, maxLength);
  }

  return text;
}

export function sanitizeEmail(value) {
  const email = sanitizePlainText(value, { maxLength: LIMITS.email }).toLowerCase();
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email) ? email : '';
}

export function sanitizeUrl(value) {
  if (!value || typeof value !== 'string') return null;

  const trimmed = value.trim();
  if (!trimmed) return null;

  try {
    const url = new URL(trimmed);
    if (!['http:', 'https:'].includes(url.protocol)) return null;
    return url.toString();
  } catch {
    return null;
  }
}

export function sanitizeRichHtml(value, { maxLength = 50000 } = {}) {
  if (typeof value !== 'string') return '';

  const cleaned = sanitizeHtml(value, {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, 'img', 'h1', 'h2', 'figure', 'figcaption'],
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ['src', 'alt', 'width', 'height', 'loading'],
      a: ['href', 'name', 'target', 'rel'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer' }),
    },
  }).trim();

  if (maxLength > 0 && cleaned.length > maxLength) {
    return cleaned.slice(0, maxLength);
  }

  return cleaned;
}

export function validateInquiryInput(body) {
  const errors = {};
  const name = sanitizePlainText(body.name, { maxLength: LIMITS.name });
  const email = sanitizeEmail(body.email);
  const phone = sanitizePlainText(body.phone, { maxLength: LIMITS.phone });
  const vehicleModel = sanitizePlainText(body.vehicleModel, { maxLength: LIMITS.vehicleModel });
  const service = sanitizePlainText(body.service, { maxLength: LIMITS.service });
  const budget = sanitizePlainText(body.budget, { maxLength: LIMITS.budget });
  const message = sanitizePlainText(body.message, {
    maxLength: LIMITS.message,
    allowNewlines: true,
  });

  if (!name) errors.name = 'Name is required';
  if (!body.email?.trim()) errors.email = 'Email is required';
  else if (!email) errors.email = 'Please enter a valid email address';
  if (!service) errors.service = 'Required service is required';
  if (!message) errors.message = 'Message is required';

  return {
    errors,
    data: { name, email, phone, vehicleModel, service, budget, message },
  };
}

export function validateNewsletterEmail(body) {
  const errors = {};
  const email = sanitizeEmail(body.email);
  const source = sanitizePlainText(body.source, { maxLength: LIMITS.source }) || 'newsletter';

  if (!body.email?.trim()) errors.email = 'Email is required';
  else if (!email) errors.email = 'Please enter a valid email address';

  return { errors, data: { email, source } };
}
