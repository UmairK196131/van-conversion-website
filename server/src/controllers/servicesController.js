import { prisma } from '../lib/prisma.js';

export async function listServices(_req, res, next) {
  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        imageUrl: true,
        sortOrder: true,
      },
    });

    res.json({ data: services });
  } catch (error) {
    next(error);
  }
}
