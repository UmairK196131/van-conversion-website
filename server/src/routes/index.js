import { Router } from 'express';
import { getHealth } from '../controllers/healthController.js';
import servicesRouter from './services.js';
import projectsRouter from './projects.js';
import testimonialsRouter from './testimonials.js';

const router = Router();

router.get('/health', getHealth);
router.use('/services', servicesRouter);
router.use('/projects', projectsRouter);
router.use('/testimonials', testimonialsRouter);

export default router;
