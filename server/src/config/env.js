import 'dotenv/config';

export const config = {
  port: Number(process.env.PORT) || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET || 'dev-secret-change-me',
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
