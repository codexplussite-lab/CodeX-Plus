import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from '../app';

describe('Bookings API', () => {
  const app = createApp();

  it('GET /api/bookings should return list of booking requests', async () => {
    const res = await request(app).get('/api/bookings');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('POST /api/bookings should accept valid discovery call submission', async () => {
    const validBooking = {
      name: 'Julian Croft',
      email: 'julian@swarms-ai.com',
      service: 'AI Innovation & Development',
      preferredDate: '2026-12-01',
      preferredTime: '14:00',
      notes: 'Initial roadmap sync',
    };

    const res = await request(app).post('/api/bookings').send(validBooking);
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBeDefined();
  });

  it('POST /api/bookings should reject payload without required fields', async () => {
    const invalidBooking = {
      notes: 'Incomplete',
    };

    const res = await request(app).post('/api/bookings').send(invalidBooking);
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });
});
