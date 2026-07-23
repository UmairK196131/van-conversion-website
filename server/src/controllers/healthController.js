import { prisma } from '../lib/prisma.js';

export async function getHealth(_req, res) {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok', database: 'connected' });
  } catch {
    res.json({ status: 'ok', database: 'disconnected' });
  }
}
