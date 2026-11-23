import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';
import { config } from './config/env';
import healthRoutes from './routes/health.routes';
import contactRoutes from './routes/contact.routes';
import bookingRoutes from './routes/booking.routes';
import teamRoutes from './routes/team.routes';
import servicesRoutes from './routes/services.routes';
import cmsRoutes from './routes/cms.routes';
import authRoutes from './routes/auth.routes';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler';

export const createApp = (): Application => {
  const app = express();

  // Security headers
  app.use(
    helmet({
      contentSecurityPolicy: false, // Allow inline styles & scripts for WebGL/OGL frontend if served directly
    })
  );

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
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    })
  );

  // Request parsing
  app.use(express.json({ limit: '5mb' }));
  app.use(express.urlencoded({ extended: true, limit: '5mb' }));

  // HTTP Request logger
  if (config.nodeEnv !== 'test') {
    app.use(morgan('dev'));
  }

  // Root welcome endpoint
  app.get('/', (req, res, next) => {
    // In production/browser requests, serve SPA index.html when HTML is requested
    const acceptsHtml = req.headers.accept && req.headers.accept.includes('text/html');
    if (config.nodeEnv !== 'test' && acceptsHtml) {
      const frontendDistPath = path.resolve(__dirname, '../../Frontend/dist');
      if (fs.existsSync(frontendDistPath)) {
        return res.sendFile(path.join(frontendDistPath, 'index.html'));
      }
    }

    res.json({
      name: 'CODEXX PLUS API',
      status: 'active',
      docs: '/api/health',
      domain: 'codexplus.site',
      endpoints: {
        health: '/api/health',
        contact: '/api/contact',
        bookings: '/api/bookings',
        team: '/api/team',
        services: '/api/services',
        cms: '/api/cms',
      },
    });
  });

  // API Routes
  app.use('/api/health', healthRoutes);
  app.use('/api/contact', contactRoutes);
  app.use('/api/bookings', bookingRoutes);
  app.use('/api/team', teamRoutes);
  app.use('/api/services', servicesRoutes);
  app.use('/api/cms', cmsRoutes);
  app.use('/api/auth', authRoutes);

  // Serve static Frontend build in non-test environments if present
  if (config.nodeEnv !== 'test') {
    const frontendDistPath = path.resolve(__dirname, '../../Frontend/dist');
    if (fs.existsSync(frontendDistPath)) {
      app.use(express.static(frontendDistPath));
      app.get('*', (req, res, next) => {
        if (req.path.startsWith('/api')) {
          return next();
        }
        res.sendFile(path.join(frontendDistPath, 'index.html'));
      });
    }
  }

  // Fallback 404 & Error handlers
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
