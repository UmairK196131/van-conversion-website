import { prisma } from '../lib/prisma.js';
import { verifyRecaptcha } from '../lib/recaptcha.js';
import { sendInquiryNotification } from '../lib/mail.js';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function trim(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function validateInquiry(body) {
  const errors = {};
  const name = trim(body.name);
  const email = trim(body.email);
  const phone = trim(body.phone);
  const vehicleModel = trim(body.vehicleModel);
  const service = trim(body.service);
  const budget = trim(body.budget);
  const message = trim(body.message);

  if (!name) errors.name = 'Name is required';
  if (!email) errors.email = 'Email is required';
  else if (!EMAIL_PATTERN.test(email)) errors.email = 'Please enter a valid email address';
  if (!service) errors.service = 'Required service is required';
  if (!message) errors.message = 'Message is required';

  return {
    errors,
    data: { name, email, phone, vehicleModel, service, budget, message },
  };
}

export async function createInquiry(req, res, next) {
  try {
    const { errors, data } = validateInquiry(req.body);

    if (Object.keys(errors).length > 0) {
      res.status(400).json({ error: 'Validation failed', errors });
      return;
    }

    const recaptcha = await verifyRecaptcha(req.body.recaptchaToken, req.ip);
    if (!recaptcha.success) {
      res.status(400).json({ error: recaptcha.error || 'reCAPTCHA verification failed' });
      return;
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        vehicleModel: data.vehicleModel || null,
        service: data.service,
        budget: data.budget || null,
        message: data.message,
      },
    });

    try {
      await sendInquiryNotification(inquiry);
    } catch (mailError) {
      console.error('[mail] Failed to send inquiry notification:', mailError);
      if (process.env.NODE_ENV === 'production') {
        res.status(502).json({
          error:
            'Your inquiry was saved but we could not send the notification email. Our team has been alerted.',
        });
        return;
      }
    }

    res.status(201).json({
      data: {
        id: inquiry.id,
        message:
          'Thank you! Your inquiry has been submitted. We will be in touch within one business day.',
      },
    });
  } catch (error) {
    next(error);
  }
}
