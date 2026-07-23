import helmet from 'helmet';
import { config } from '../config/env.js';

export const securityMiddleware = helmet({
  // JSON API — CSP is enforced on the static site host, not here.
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  frameguard: { action: 'deny' },
  hsts: config.isProduction
    ? {
        maxAge: 31_536_000,
        includeSubDomains: true,
        preload: false,
      }
    : false,
});
