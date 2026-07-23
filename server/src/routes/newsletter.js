import { Router } from 'express';
import { subscribeNewsletter, requestBrochure } from '../controllers/newsletterController.js';
import { newsletterRateLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/', newsletterRateLimiter, subscribeNewsletter);
router.post('/brochure', newsletterRateLimiter, requestBrochure);

export default router;
