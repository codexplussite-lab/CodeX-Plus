import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from '../app';

describe('Team API', () => {
  const app = createApp();
  it('GET /api/team should return lead architects', async () => {
    const res = await request(app).get('/api/team');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThanOrEqual(4);

    const founder = res.body.data.find((m: any) => m.name === 'Alexander Reid');
    expect(founder).toBeDefined();
    expect(founder.role).toBe('Founder & Managing Partner');
  });
});
