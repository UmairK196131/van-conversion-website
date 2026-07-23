import { prisma } from '../../lib/prisma.js';
import { logActivity } from '../../lib/activityLog.js';

export async function listTestimonials(_req, res, next) {
  try {
    const testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' } });
    res.json({ data: testimonials });
  } catch (error) {
    next(error);
  }
}

export async function getTestimonial(req, res, next) {
  try {
    const testimonial = await prisma.testimonial.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!testimonial) {
      res.status(404).json({ error: 'Testimonial not found' });
      return;
    }

    res.json({ data: testimonial });
  } catch (error) {
    next(error);
  }
}

export async function createTestimonial(req, res, next) {
  try {
    const { clientName, quote, rating, imageUrl, isActive } = req.body;

    if (!clientName?.trim() || !quote?.trim()) {
      res.status(400).json({ error: 'Client name and quote are required' });
      return;
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        clientName: clientName.trim(),
        quote: quote.trim(),
        rating: Math.min(5, Math.max(1, Number(rating) || 5)),
        imageUrl: imageUrl || null,
        isActive: isActive !== false,
      },
    });

    await logActivity(req.user.id, 'CREATE', 'testimonial', testimonial.id, {
      clientName: testimonial.clientName,
    });

    res.status(201).json({ data: testimonial });
  } catch (error) {
    next(error);
  }
}

export async function updateTestimonial(req, res, next) {
  try {
    const id = Number(req.params.id);
    const { clientName, quote, rating, imageUrl, isActive } = req.body;

    const existing = await prisma.testimonial.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ error: 'Testimonial not found' });
      return;
    }

    const data = {};
    if (clientName !== undefined) data.clientName = clientName.trim();
    if (quote !== undefined) data.quote = quote.trim();
    if (rating !== undefined) data.rating = Math.min(5, Math.max(1, Number(rating)));
    if (imageUrl !== undefined) data.imageUrl = imageUrl || null;
    if (isActive !== undefined) data.isActive = Boolean(isActive);

    const testimonial = await prisma.testimonial.update({ where: { id }, data });

    await logActivity(req.user.id, 'UPDATE', 'testimonial', testimonial.id, {
      clientName: testimonial.clientName,
    });

    res.json({ data: testimonial });
  } catch (error) {
    next(error);
  }
}

export async function deleteTestimonial(req, res, next) {
  try {
    const id = Number(req.params.id);
    const existing = await prisma.testimonial.findUnique({ where: { id } });

    if (!existing) {
      res.status(404).json({ error: 'Testimonial not found' });
      return;
    }

    await prisma.testimonial.delete({ where: { id } });
    await logActivity(req.user.id, 'DELETE', 'testimonial', id, {
      clientName: existing.clientName,
    });

    res.json({ data: { id } });
  } catch (error) {
    next(error);
  }
}
