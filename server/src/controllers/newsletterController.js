import { prisma } from '../lib/prisma.js';
import { config } from '../config/env.js';
import { subscribeToExternalProvider } from '../lib/newsletterProviders.js';
import { validateNewsletterEmail } from '../lib/sanitize.js';

export async function subscribeNewsletter(req, res, next) {
  try {
    const { errors, data } = validateNewsletterEmail(req.body);

    if (Object.keys(errors).length > 0) {
      res.status(400).json({ error: 'Validation failed', errors });
      return;
    }

    const existing = await prisma.newsletterSubscriber.findUnique({ where: { email: data.email } });

    if (!existing) {
      await prisma.newsletterSubscriber.create({
        data: { email: data.email, source: data.source },
      });
    }

    try {
      await subscribeToExternalProvider(data.email);
    } catch (providerError) {
      console.error('[newsletter] External provider error:', providerError);
      if (config.isProduction && !existing) {
        res.status(502).json({
          error:
            'Subscription saved locally but could not sync with email provider. Please try again later.',
        });
        return;
      }
    }

    res.status(existing ? 200 : 201).json({
      data: {
        message: existing
          ? 'You are already subscribed. Thank you for your interest!'
          : 'Thanks for subscribing! You will receive our latest updates and build stories.',
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function requestBrochure(req, res, next) {
  try {
    const { errors, data } = validateNewsletterEmail({ ...req.body, source: 'brochure' });

    if (Object.keys(errors).length > 0) {
      res.status(400).json({ error: 'Validation failed', errors });
      return;
    }

    const existing = await prisma.newsletterSubscriber.findUnique({ where: { email: data.email } });

    if (!existing) {
      await prisma.newsletterSubscriber.create({
        data: { email: data.email, source: 'brochure' },
      });
    }

    try {
      await subscribeToExternalProvider(data.email);
    } catch (providerError) {
      console.error('[brochure] External provider error:', providerError);
    }

    res.json({
      data: {
        message: 'Your brochure is ready to download.',
        downloadUrl: config.brochureUrl,
      },
    });
  } catch (error) {
    next(error);
  }
}
