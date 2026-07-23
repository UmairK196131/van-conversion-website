import { Router } from 'express';
import { getHealth } from '../controllers/healthController.js';
import servicesRouter from './services.js';
import projectsRouter from './projects.js';
import testimonialsRouter from './testimonials.js';
import faqRouter from './faq.js';
import blogRouter from './blog.js';
import inquiriesRouter from './inquiries.js';
import authRouter from './auth.js';
import adminRouter from './admin/index.js';

const router = Router();

router.get('/health', getHealth);
router.use('/auth', authRouter);
router.use('/admin', adminRouter);
router.use('/services', servicesRouter);
router.use('/projects', projectsRouter);
router.use('/testimonials', testimonialsRouter);
router.use('/faq', faqRouter);
router.use('/blog', blogRouter);
router.use('/inquiries', inquiriesRouter);

export default router;
