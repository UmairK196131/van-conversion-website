import { prisma } from '../../lib/prisma.js';
import { logActivity } from '../../lib/activityLog.js';
import { slugify } from '../../utils/slugify.js';

export async function listProjects(_req, res, next) {
  try {
    const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
    res.json({ data: projects });
  } catch (error) {
    next(error);
  }
}

export async function getProject(req, res, next) {
  try {
    const project = await prisma.project.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }

    res.json({ data: project });
  } catch (error) {
    next(error);
  }
}

export async function createProject(req, res, next) {
  try {
    const { title, description, vehicleModel, beforeImage, afterImage, gallery, isFeatured } =
      req.body;

    if (!title?.trim() || !description?.trim() || !vehicleModel?.trim()) {
      res.status(400).json({ error: 'Title, description, and vehicle model are required' });
      return;
    }

    const project = await prisma.project.create({
      data: {
        title: title.trim(),
        slug: slugify(title),
        description: description.trim(),
        vehicleModel: vehicleModel.trim(),
        beforeImage: beforeImage || null,
        afterImage: afterImage || null,
        gallery: gallery || [],
        isFeatured: Boolean(isFeatured),
      },
    });

    await logActivity(req.user.id, 'CREATE', 'project', project.id, { title: project.title });

    res.status(201).json({ data: project });
  } catch (error) {
    if (error.code === 'P2002') {
      res.status(409).json({ error: 'A project with this slug already exists' });
      return;
    }
    next(error);
  }
}

export async function updateProject(req, res, next) {
  try {
    const id = Number(req.params.id);
    const { title, description, vehicleModel, beforeImage, afterImage, gallery, isFeatured } =
      req.body;

    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }

    const data = {};
    if (title !== undefined) {
      data.title = title.trim();
      data.slug = slugify(title);
    }
    if (description !== undefined) data.description = description.trim();
    if (vehicleModel !== undefined) data.vehicleModel = vehicleModel.trim();
    if (beforeImage !== undefined) data.beforeImage = beforeImage || null;
    if (afterImage !== undefined) data.afterImage = afterImage || null;
    if (gallery !== undefined) data.gallery = gallery;
    if (isFeatured !== undefined) data.isFeatured = Boolean(isFeatured);

    const project = await prisma.project.update({ where: { id }, data });

    await logActivity(req.user.id, 'UPDATE', 'project', project.id, { title: project.title });

    res.json({ data: project });
  } catch (error) {
    if (error.code === 'P2002') {
      res.status(409).json({ error: 'A project with this slug already exists' });
      return;
    }
    next(error);
  }
}

export async function deleteProject(req, res, next) {
  try {
    const id = Number(req.params.id);
    const existing = await prisma.project.findUnique({ where: { id } });

    if (!existing) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }

    await prisma.project.delete({ where: { id } });
    await logActivity(req.user.id, 'DELETE', 'project', id, { title: existing.title });

    res.json({ data: { id } });
  } catch (error) {
    next(error);
  }
}
