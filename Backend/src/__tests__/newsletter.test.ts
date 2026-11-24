import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from '../app';

describe('Newsletter API', () => {
  const app = createApp();
  it('POST /api/newsletter should register a new valid email', async () => {
    const email = `subscriber_${Date.now()}@enterprise.io`;
    const res = await request(app)
      .post('/api/newsletter')
      .send({ email });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.email).toBe(email);
  });

  it('POST /api/newsletter should handle duplicate email gracefully', async () => {
    const email = 'existing_lead@enterprise.io';
    await request(app).post('/api/newsletter').send({ email });

    const duplicateRes = await request(app)
      .post('/api/newsletter')
      .send({ email });

    expect(duplicateRes.status).toBe(200);
    expect(duplicateRes.body.success).toBe(true);
    expect(duplicateRes.body.message).toContain('Already subscribed');
  });

  it('POST /api/newsletter should reject invalid email format', async () => {
    const res = await request(app)
      .post('/api/newsletter')
      .send({ email: 'not-an-email' });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('GET /api/newsletter should retrieve subscriber list', async () => {
    const res = await request(app).get('/api/newsletter');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});
