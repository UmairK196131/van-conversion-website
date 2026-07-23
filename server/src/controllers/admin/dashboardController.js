import { prisma } from '../lib/prisma.js';
import { logActivity } from '../lib/activityLog.js';

export async function getDashboardStats(_req, res, next) {
  try {
    const [totalInquiries, newInquiries, activeServices, recentPosts, recentActivity] =
      await Promise.all([
        prisma.inquiry.count(),
        prisma.inquiry.count({ where: { status: 'NEW' } }),
        prisma.service.count({ where: { isActive: true } }),
        prisma.blogPost.findMany({
          orderBy: { createdAt: 'desc' },
          take: 5,
          select: {
            id: true,
            title: true,
            slug: true,
            isPublished: true,
            createdAt: true,
          },
        }),
        prisma.activityLog.findMany({
          orderBy: { createdAt: 'desc' },
          take: 10,
          include: {
            user: { select: { email: true } },
          },
        }),
      ]);

    res.json({
      data: {
        totalInquiries,
        newInquiries,
        activeServices,
        recentPosts,
        recentActivity,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function listActivityLogs(req, res, next) {
  try {
    const limit = Math.min(Number(req.query.limit) || 50, 100);
    const logs = await prisma.activityLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: {
        user: { select: { email: true } },
      },
    });

    res.json({ data: logs });
  } catch (error) {
    next(error);
  }
}

export async function uploadImage(req, res, next) {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    const { processUpload } = await import('../lib/upload.js');
    const media = await processUpload(req.file);

    await logActivity(req.user.id, 'UPLOAD', 'media', media.id, {
      filename: media.filename,
    });

    res.status(201).json({ data: media });
  } catch (error) {
    next(error);
  }
}
