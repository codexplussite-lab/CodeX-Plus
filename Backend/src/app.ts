import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config/env';
import healthRoutes from './routes/health.routes';
import contactRoutes from './routes/contact.routes';
import bookingRoutes from './routes/booking.routes';
import teamRoutes from './routes/team.routes';
import servicesRoutes from './routes/services.routes';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler';

export const createApp = (): Application => {
  const app = express();

  // Security headers
  app.use(helmet());

  // CORS configuration
  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, or Postman)
        if (!origin) return callback(null, true);
        if (config.corsOrigins.includes('*') || config.corsOrigins.includes(origin)) {
          return callback(null, true);
        }
        return callback(null, true); // Dev-friendly fallback
      },
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    })
  );

  // Request parsing
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));

  // HTTP Request logger
  if (config.nodeEnv !== 'test') {
    app.use(morgan('dev'));
  }

  // Root welcome endpoint
  app.get('/', (_req, res) => {
    res.json({
      name: 'CODEXX PLUS API',
      status: 'active',
      docs: '/api/health',
      endpoints: {
        health: '/api/health',
        contact: '/api/contact',
        bookings: '/api/bookings',
        team: '/api/team',
        services: '/api/services',
      },
    });
  });

  // API Routes
  app.use('/api/health', healthRoutes);
  app.use('/api/contact', contactRoutes);
  app.use('/api/bookings', bookingRoutes);
  app.use('/api/team', teamRoutes);
  app.use('/api/services', servicesRoutes);

  // Fallback 404 & Error handlers
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
