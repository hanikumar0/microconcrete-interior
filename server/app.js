import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import { apiLimiter, leadLimiter } from './middleware/rateLimit.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import leadRoutes from './routes/leads.routes.js';
import projectRoutes from './routes/projects.routes.js';

dotenv.config();

const app = express();

app.set('trust proxy', 1);
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: false
  })
);
app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ extended: false, limit: '20kb' }));
app.use(mongoSanitize());
app.use(apiLimiter);

app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: 'API healthy', data: { service: 'microconcrete-api' } });
});

app.use('/api/projects', projectRoutes);
app.use('/api/leads', leadLimiter, leadRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
