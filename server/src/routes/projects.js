import { Router } from 'express';
import {
  getProjectBySlug,
  listFeaturedProjects,
  listProjects,
} from '../controllers/projectsController.js';

const router = Router();

router.get('/featured', listFeaturedProjects);
router.get('/', listProjects);
router.get('/:slug', getProjectBySlug);

export default router;
