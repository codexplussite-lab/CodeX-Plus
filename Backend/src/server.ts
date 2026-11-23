import { createApp } from './app';
import { config } from './config/env';
import { initPostgres } from './db/postgres';

const start = async () => {
  // Initialize PostgreSQL database connection and tables
  await initPostgres();

  const app = createApp();

  const server = app.listen(config.port, () => {
    console.log('----------------------------------------------------');
    console.log(`[CODEXX PLUS] Server running at http://localhost:${config.port}`);
    console.log(`[Live Domain] https://codexplus.site`);
    console.log(`[Environment] ${config.nodeEnv}`);
    console.log(`[Health Endpoint] http://localhost:${config.port}/api/health`);
    console.log(`[Inquiries API]  http://localhost:${config.port}/api/contact`);
    console.log(`[Bookings API]   http://localhost:${config.port}/api/bookings`);
    console.log('----------------------------------------------------');
  });

  // Graceful shutdown
  const shutdown = (signal: string) => {
    console.log(`\n[CODEXX PLUS] Received ${signal}. Shutting down server gracefully...`);
    server.close(() => {
      console.log('[CODEXX PLUS] Closed active connections. Process terminated.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
};

void start();
