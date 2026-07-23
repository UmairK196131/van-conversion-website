import { config } from './env.js';

const INSECURE_JWT_SECRETS = new Set(['dev-secret-change-me', 'change-me-in-production']);

export function validateProductionEnv() {
  if (!config.isProduction) return;

  const issues = [];

  if (!config.databaseUrl) issues.push('DATABASE_URL is required');
  if (!config.jwtSecret || INSECURE_JWT_SECRETS.has(config.jwtSecret)) {
    issues.push('JWT_SECRET must be set to a strong unique value');
  }
  if (!config.recaptchaSecretKey) {
    issues.push('RECAPTCHA_SECRET_KEY is required in production');
  }
  if (config.corsOrigins.some((origin) => /localhost|127\.0\.0\.1/i.test(origin))) {
    console.warn(
      '[security] CORS_ORIGIN includes a localhost origin in production — verify this is intentional'
    );
  }

  if (issues.length > 0) {
    console.error(
      '[security] Production environment validation failed:\n  - ' + issues.join('\n  - ')
    );
    process.exit(1);
  }
}
