import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from '../app';

describe('Stats API', () => {
  const app = createApp();
  it('GET /api/stats should return real-time studio telemetry', async () => {
    const res = await request(app).get('/api/stats');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('inquiriesCount');
    expect(res.body.data).toHaveProperty('bookingsCount');
    expect(res.body.data).toHaveProperty('servicesCount');
    expect(res.body.data).toHaveProperty('teamCount');
    expect(typeof res.body.data.inquiriesCount).toBe('number');
  });
});
