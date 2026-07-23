import { prisma } from './prisma.js';

export async function logActivity(userId, action, entity, entityId = null, details = null) {
  try {
    await prisma.activityLog.create({
      data: {
        userId,
        action,
        entity,
        entityId,
        details: details || undefined,
      },
    });
  } catch (error) {
    console.error('[activityLog] Failed to log activity:', error);
  }
}
