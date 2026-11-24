import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from '../app';

describe('Services API', () => {
  const app = createApp();
  it('GET /api/services should return all 5 studio disciplines', async () => {
    const res = await request(app).get('/api/services');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThanOrEqual(5);

    const first = res.body.data[0];
    expect(first).toHaveProperty('id');
    expect(first).toHaveProperty('title');
    expect(first).toHaveProperty('description');
    expect(first).toHaveProperty('tag');
  });

  it('GET /api/services/:id should return single discipline details', async () => {
    const res = await request(app).get('/api/services/development');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBe('development');
    expect(res.body.data.title).toContain('Full-Stack');
  });

  it('GET /api/services/:id should return 404 for nonexistent discipline', async () => {
    const res = await request(app).get('/api/services/nonexistent-discipline');
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });
});
