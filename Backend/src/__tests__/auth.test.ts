import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from '../app';

const app = createApp();

describe('Admin Authentication API', () => {
  it('POST /api/auth/login should reject invalid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'attacker@unknown.io',
        password: 'wrongpassword123',
      });

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(/Invalid administrator credentials/i);
  });

  it('POST /api/auth/login should reject malformed input', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'not-an-email',
        password: 'short',
      });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('POST /api/auth/login should authenticate valid admin credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@codexplus.site',
        password: 'codexplus2026',
        rememberMe: true,
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe('admin@codexplus.site');
  });

  it('GET /api/auth/verify should validate active token', async () => {
    const res = await request(app)
      .get('/api/auth/verify')
      .set('Authorization', 'Bearer cx_sec_testtoken');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.valid).toBe(true);
  });
});

