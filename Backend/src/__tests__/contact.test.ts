import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from '../app';

describe('Contact Inquiries API', () => {
  const app = createApp();

  it('GET /api/contact should return list of inquiries', async () => {
    const res = await request(app).get('/api/contact');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('POST /api/contact should reject missing or invalid email with 400', async () => {
    const invalidPayload = {
      name: 'Test Client',
      email: 'not-an-email',
      message: 'Hello world',
    };

    const res = await request(app).post('/api/contact').send(invalidPayload);
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('POST /api/contact should create new inquiry with valid data', async () => {
    const validPayload = {
      name: 'Sophia Test',
      email: 'sophia@test-enterprise.io',
      company: 'Test Corp',
      service: 'Full-Stack Edge Infrastructure',
      budget: '$50k – $100k',
      message: 'Need high-throughput enterprise software architecture.',
    };

    const res = await request(app).post('/api/contact').send(validPayload);
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBeDefined();
  });

  it('POST /api/contact should silently drop bot inquiry when honeypot is populated', async () => {
    const botPayload = {
      name: 'Spam Bot',
      email: 'bot@spam.io',
      company: 'Bot Corp',
      service: 'Development',
      budget: '$25k – $50k',
      message: 'Cheap crypto links here',
      honeypot: 'http://spam.ru',
    };

    const res = await request(app).post('/api/contact').send(botPayload);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeUndefined();
  });
});
