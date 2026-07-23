import { Router } from 'express';
import { createInquiry } from '../controllers/inquiriesController.js';
import { inquiryRateLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/', inquiryRateLimiter, createInquiry);

export default router;
