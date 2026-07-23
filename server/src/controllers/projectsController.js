import { prisma } from '../lib/prisma.js';

export async function listFeaturedProjects(_req, res, next) {
  try {
    const projects = await prisma.project.findMany({
      where: { isFeatured: true },
      orderBy: { createdAt: 'desc' },
      take: 6,
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        vehicleModel: true,
        afterImage: true,
        gallery: true,
      },
    });

    res.json({ data: projects });
  } catch (error) {
    next(error);
  }
}
