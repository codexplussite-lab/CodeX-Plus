import dotenv from 'dotenv';
import path from 'path';

// Load from current working directory or Backend root .env
dotenv.config();
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigins: (
    process.env.CORS_ORIGIN ||
    'https://codexplus.site,https://www.codexplus.site,http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173'
  )
    .split(',')
    .map((origin) => origin.trim()),
  adminEmail: process.env.ADMIN_EMAIL || 'Info@codexplus.site',
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
  rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    name: process.env.DB_NAME || 'codexplus',
    user: process.env.DB_USER || 'codexplus',
    password: process.env.DB_PASSWORD || 'M5mTthm3JwCwLbiz',
    ssl: process.env.DB_SSL === 'true',
    url: process.env.DATABASE_URL || '',
  },
};
