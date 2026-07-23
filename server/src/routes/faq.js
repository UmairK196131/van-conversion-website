import { Router } from 'express';
import { listFaq } from '../controllers/faqController.js';

const router = Router();

router.get('/', listFaq);

export default router;
