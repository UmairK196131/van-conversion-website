import { prisma } from '../lib/prisma.js';
import { config } from '../config/env.js';
import { subscribeToExternalProvider } from '../lib/newsletterProviders.js';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function trim(value) {
  return typeof value === 'string' ? value.trim() : '';
}

export async function subscribeNewsletter(req, res, next) {
  try {
    const email = trim(req.body.email).toLowerCase();
    const source = trim(req.body.source) || 'newsletter';

    if (!email) {
      res.status(400).json({ error: 'Validation failed', errors: { email: 'Email is required' } });
      return;
    }

    if (!EMAIL_PATTERN.test(email)) {
      res.status(400).json({
        error: 'Validation failed',
        errors: { email: 'Please enter a valid email address' },
      });
      return;
    }

    const existing = await prisma.newsletterSubscriber.findUnique({ where: { email } });

    if (!existing) {
      await prisma.newsletterSubscriber.create({ data: { email, source } });
    }

    try {
      await subscribeToExternalProvider(email);
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
    const email = trim(req.body.email).toLowerCase();

    if (!email) {
      res.status(400).json({ error: 'Validation failed', errors: { email: 'Email is required' } });
      return;
    }

    if (!EMAIL_PATTERN.test(email)) {
      res.status(400).json({
        error: 'Validation failed',
        errors: { email: 'Please enter a valid email address' },
      });
      return;
    }

    const existing = await prisma.newsletterSubscriber.findUnique({ where: { email } });

    if (!existing) {
      await prisma.newsletterSubscriber.create({ data: { email, source: 'brochure' } });
    }

    try {
      await subscribeToExternalProvider(email);
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
