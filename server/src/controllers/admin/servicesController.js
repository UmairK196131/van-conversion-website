import { prisma } from '../../lib/prisma.js';
import { logActivity } from '../../lib/activityLog.js';
import { slugify } from '../../utils/slugify.js';

export async function listServices(_req, res, next) {
  try {
    const services = await prisma.service.findMany({ orderBy: { sortOrder: 'asc' } });
    res.json({ data: services });
  } catch (error) {
    next(error);
  }
}

export async function getService(req, res, next) {
  try {
    const service = await prisma.service.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!service) {
      res.status(404).json({ error: 'Service not found' });
      return;
    }

    res.json({ data: service });
  } catch (error) {
    next(error);
  }
}

export async function createService(req, res, next) {
  try {
    const { title, description, imageUrl, sortOrder, isActive } = req.body;

    if (!title?.trim() || !description?.trim()) {
      res.status(400).json({ error: 'Title and description are required' });
      return;
    }

    const slug = slugify(title);

    const service = await prisma.service.create({
      data: {
        title: title.trim(),
        slug,
        description: description.trim(),
        imageUrl: imageUrl || null,
        sortOrder: Number(sortOrder) || 0,
        isActive: isActive !== false,
      },
    });

    await logActivity(req.user.id, 'CREATE', 'service', service.id, { title: service.title });

    res.status(201).json({ data: service });
  } catch (error) {
    if (error.code === 'P2002') {
      res.status(409).json({ error: 'A service with this slug already exists' });
      return;
    }
    next(error);
  }
}

export async function updateService(req, res, next) {
  try {
    const id = Number(req.params.id);
    const { title, description, imageUrl, sortOrder, isActive } = req.body;

    const existing = await prisma.service.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ error: 'Service not found' });
      return;
    }

    const data = {};
    if (title !== undefined) {
      data.title = title.trim();
      data.slug = slugify(title);
    }
    if (description !== undefined) data.description = description.trim();
    if (imageUrl !== undefined) data.imageUrl = imageUrl || null;
    if (sortOrder !== undefined) data.sortOrder = Number(sortOrder);
    if (isActive !== undefined) data.isActive = Boolean(isActive);

    const service = await prisma.service.update({ where: { id }, data });

    await logActivity(req.user.id, 'UPDATE', 'service', service.id, { title: service.title });

    res.json({ data: service });
  } catch (error) {
    if (error.code === 'P2002') {
      res.status(409).json({ error: 'A service with this slug already exists' });
      return;
    }
    next(error);
  }
}

export async function deleteService(req, res, next) {
  try {
    const id = Number(req.params.id);
    const existing = await prisma.service.findUnique({ where: { id } });

    if (!existing) {
      res.status(404).json({ error: 'Service not found' });
      return;
    }

    await prisma.service.delete({ where: { id } });
    await logActivity(req.user.id, 'DELETE', 'service', id, { title: existing.title });

    res.json({ data: { id } });
  } catch (error) {
    next(error);
  }
}
