import 'dotenv/config';

function parseCorsOrigins() {
  const raw = process.env.CORS_ORIGIN;
  if (!raw) {
    return ['http://localhost:5173', 'http://localhost:5174'];
  }
  return raw.split(',').map((o) => o.trim());
}

export const config = {
  port: Number(process.env.PORT) || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigins: parseCorsOrigins(),
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET || 'dev-secret-change-me',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',
  apiBaseUrl: process.env.API_BASE_URL || '',
  recaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY || '',
  adminEmail: process.env.ADMIN_EMAIL || 'admin@vanconversion.local',
  smtp: {
    host: process.env.SMTP_HOST || '',
    port: Number(process.env.SMTP_PORT) || 587,
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    from: process.env.SMTP_FROM || 'noreply@vanconversion.com',
  },
  isProduction: process.env.NODE_ENV === 'production',
};
