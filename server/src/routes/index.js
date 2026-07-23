import { Router } from 'express';
import { getHealth } from '../controllers/healthController.js';
import servicesRouter from './services.js';

const router = Router();

router.get('/health', getHealth);
router.use('/services', servicesRouter);

export default router;
