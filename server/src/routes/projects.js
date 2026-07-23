import { Router } from 'express';
import { listFeaturedProjects } from '../controllers/projectsController.js';

const router = Router();

router.get('/featured', listFeaturedProjects);

export default router;
