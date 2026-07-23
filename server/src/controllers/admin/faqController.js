import { prisma } from '../../lib/prisma.js';
import { logActivity } from '../../lib/activityLog.js';

export async function listFaqItems(_req, res, next) {
  try {
    const items = await prisma.faqItem.findMany({
      orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }],
    });
    res.json({ data: items });
  } catch (error) {
    next(error);
  }
}

export async function getFaqItem(req, res, next) {
  try {
    const item = await prisma.faqItem.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!item) {
      res.status(404).json({ error: 'FAQ item not found' });
      return;
    }

    res.json({ data: item });
  } catch (error) {
    next(error);
  }
}

export async function createFaqItem(req, res, next) {
  try {
    const { question, answer, category, sortOrder } = req.body;

    if (!question?.trim() || !answer?.trim()) {
      res.status(400).json({ error: 'Question and answer are required' });
      return;
    }

    const item = await prisma.faqItem.create({
      data: {
        question: question.trim(),
        answer: answer.trim(),
        category: category?.trim() || null,
        sortOrder: Number(sortOrder) || 0,
      },
    });

    await logActivity(req.user.id, 'CREATE', 'faq', item.id, { question: item.question });

    res.status(201).json({ data: item });
  } catch (error) {
    next(error);
  }
}

export async function updateFaqItem(req, res, next) {
  try {
    const id = Number(req.params.id);
    const { question, answer, category, sortOrder } = req.body;

    const existing = await prisma.faqItem.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ error: 'FAQ item not found' });
      return;
    }

    const data = {};
    if (question !== undefined) data.question = question.trim();
    if (answer !== undefined) data.answer = answer.trim();
    if (category !== undefined) data.category = category?.trim() || null;
    if (sortOrder !== undefined) data.sortOrder = Number(sortOrder);

    const item = await prisma.faqItem.update({ where: { id }, data });

    await logActivity(req.user.id, 'UPDATE', 'faq', item.id, { question: item.question });

    res.json({ data: item });
  } catch (error) {
    next(error);
  }
}

export async function deleteFaqItem(req, res, next) {
  try {
    const id = Number(req.params.id);
    const existing = await prisma.faqItem.findUnique({ where: { id } });

    if (!existing) {
      res.status(404).json({ error: 'FAQ item not found' });
      return;
    }

    await prisma.faqItem.delete({ where: { id } });
    await logActivity(req.user.id, 'DELETE', 'faq', id, { question: existing.question });

    res.json({ data: { id } });
  } catch (error) {
    next(error);
  }
}
