import { Router } from 'express';
import { authRateLimiter } from '../middleware/authRateLimiter.js';
import { requireAuth } from '../middleware/auth.js';
import { login, getMe } from '../controllers/authController.js';

const router = Router();

router.post('/login', authRateLimiter, login);
router.get('/me', requireAuth, getMe);

export default router;
