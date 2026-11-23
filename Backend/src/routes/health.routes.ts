import { Router, Request, Response } from 'express';
import { storage } from '../db/storage';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'online',
    platform: 'CODEXX PLUS Enterprise API Gateway',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    environment: process.env.NODE_ENV || 'development',
    database: storage.getEngineType(),
  });
});

export default router;
