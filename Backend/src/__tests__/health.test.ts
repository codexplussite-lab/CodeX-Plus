import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from '../app';

describe('Health & Status API', () => {
  const app = createApp();

  it('GET / should return 200 with API status active', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('CODEXX PLUS API');
    expect(res.body.status).toBe('active');
  });

  it('GET /api/health should return system metrics', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('online');
    expect(res.body.uptimeSeconds).toBeDefined();
    expect(res.body.version).toBe('1.0.0');
  });
});
