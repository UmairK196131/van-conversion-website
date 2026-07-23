import { prisma } from '../lib/prisma.js';

const PROJECT_LIST_SELECT = {
  id: true,
  title: true,
  slug: true,
  description: true,
  vehicleModel: true,
  beforeImage: true,
  afterImage: true,
  gallery: true,
  isFeatured: true,
  createdAt: true,
};

const VEHICLE_FILTERS = {
  sprinter: 'sprinter',
  transit: 'transit',
  promaster: 'promaster',
};

function buildVehicleFilter(vehicle) {
  const key = vehicle?.toLowerCase();
  const term = VEHICLE_FILTERS[key];
  if (!term) return {};

  return {
    vehicleModel: { contains: term },
  };
}

export async function listFeaturedProjects(_req, res, next) {
  try {
    const projects = await prisma.project.findMany({
      where: { isFeatured: true },
      orderBy: { createdAt: 'desc' },
      take: 6,
      select: PROJECT_LIST_SELECT,
    });

    res.json({ data: projects });
  } catch (error) {
    next(error);
  }
}

export async function listProjects(req, res, next) {
  try {
    const projects = await prisma.project.findMany({
      where: buildVehicleFilter(req.query.vehicle),
      orderBy: { createdAt: 'desc' },
      select: PROJECT_LIST_SELECT,
    });

    res.json({ data: projects });
  } catch (error) {
    next(error);
  }
}

export async function getProjectBySlug(req, res, next) {
  try {
    const project = await prisma.project.findUnique({
      where: { slug: req.params.slug },
      select: {
        ...PROJECT_LIST_SELECT,
        updatedAt: true,
      },
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
