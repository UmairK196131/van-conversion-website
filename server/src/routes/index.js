import { Router } from 'express';
import { getHealth } from '../controllers/healthController.js';
import servicesRouter from './services.js';
import projectsRouter from './projects.js';
import testimonialsRouter from './testimonials.js';
import faqRouter from './faq.js';

const router = Router();

router.get('/health', getHealth);
router.use('/services', servicesRouter);
router.use('/projects', projectsRouter);
router.use('/testimonials', testimonialsRouter);
router.use('/faq', faqRouter);

export default router;
