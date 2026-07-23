import { prisma } from '../lib/prisma.js';

export async function listFaq(_req, res, next) {
  try {
    const items = await prisma.faqItem.findMany({
      orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }],
      select: {
        id: true,
        question: true,
        answer: true,
        category: true,
        sortOrder: true,
      },
    });

    res.json({ data: items });
  } catch (error) {
    next(error);
  }
}
