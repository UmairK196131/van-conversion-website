import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from './config/env.js';
import { validateProductionEnv } from './config/validateEnv.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { securityMiddleware } from './middleware/security.js';
import routes from './routes/index.js';

validateProductionEnv();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

if (config.isProduction) {
  app.set('trust proxy', 1);
}

app.use(securityMiddleware);
app.use(
  cors({
    origin: config.corsOrigins,
    credentials: true,
  })
);
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api', routes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
});

export default app;
