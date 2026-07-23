import { prisma } from '../../lib/prisma.js';
import { logActivity } from '../../lib/activityLog.js';

const VALID_STATUSES = ['NEW', 'RESPONDED', 'ARCHIVED'];

export async function listInquiries(req, res, next) {
  try {
    const where = {};
    if (req.query.status && VALID_STATUSES.includes(req.query.status.toUpperCase())) {
      where.status = req.query.status.toUpperCase();
    }

    const inquiries = await prisma.inquiry.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    res.json({ data: inquiries });
  } catch (error) {
    next(error);
  }
}

export async function getInquiry(req, res, next) {
  try {
    const inquiry = await prisma.inquiry.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!inquiry) {
      res.status(404).json({ error: 'Inquiry not found' });
      return;
    }

    res.json({ data: inquiry });
  } catch (error) {
    next(error);
  }
}

export async function updateInquiryStatus(req, res, next) {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;

    if (!status || !VALID_STATUSES.includes(status.toUpperCase())) {
      res.status(400).json({ error: 'Valid status is required (NEW, RESPONDED, ARCHIVED)' });
      return;
    }

    const existing = await prisma.inquiry.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ error: 'Inquiry not found' });
      return;
    }

    const inquiry = await prisma.inquiry.update({
      where: { id },
      data: { status: status.toUpperCase() },
    });

    await logActivity(req.user.id, 'UPDATE_STATUS', 'inquiry', inquiry.id, {
      status: inquiry.status,
      name: inquiry.name,
    });

    res.json({ data: inquiry });
  } catch (error) {
    next(error);
  }
}
