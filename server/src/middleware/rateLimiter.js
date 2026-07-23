import rateLimit from 'express-rate-limit';

export const inquiryRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many inquiry submissions. Please try again in 15 minutes.',
  },
});
