import { prisma } from '../lib/prisma.js';
import { verifyRecaptcha } from '../lib/recaptcha.js';
import { sendInquiryNotification } from '../lib/mail.js';
import { validateInquiryInput } from '../lib/sanitize.js';

export async function createInquiry(req, res, next) {
  try {
    const { errors, data } = validateInquiryInput(req.body);

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
