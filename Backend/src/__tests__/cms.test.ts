import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from '../app';

describe('CMS Content API', () => {
  const app = createApp();

  it('GET /api/cms should return published CMS content', async () => {
    const res = await request(app).get('/api/cms');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
  });

  it('PUT /api/cms should update and publish CMS content', async () => {
    const payload = {
      hero: {
        headline: 'Automated Test Pipeline Execution',
      },
    };

    const res = await request(app).put('/api/cms').send(payload);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toContain('published');
  });

  it('PUT /api/cms should reject invalid payload with 400', async () => {
    const res = await request(app)
      .put('/api/cms')
      .set('Content-Type', 'text/plain')
      .send('Invalid plain text');

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });
});
