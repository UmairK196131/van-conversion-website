import { prisma } from '../lib/prisma.js';

export async function listTestimonials(_req, res, next) {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: {
        id: true,
        clientName: true,
        quote: true,
        rating: true,
        imageUrl: true,
      },
    });

    res.json({ data: testimonials });
  } catch (error) {
    next(error);
  }
}
