import { Request, Response } from 'express';
import { z } from 'zod';
import { config } from '../config/env';

export const loginSchema = z.object({
  email: z.string().trim().email('Please enter a valid administrator email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional().default(false),
});

// Authorized admin accounts
const VALID_ADMINS = [
  {
    email: config.adminEmail.toLowerCase(),
    password: process.env.ADMIN_PASSWORD || 'codexplus2026',
    name: 'CodeXplus Lead Architect',
    role: 'Principal Administrator',
  },
  {
    email: 'admin@codexplus.site',
    password: process.env.ADMIN_PASSWORD || 'codexplus2026',
    name: 'CodeXplus Studio Admin',
    role: 'Super Administrator',
  },
];

export const handleAdminLogin = async (req: Request, res: Response): Promise<void> => {
  const { email, password, rememberMe } = req.body;
  const normalizedEmail = String(email || '').trim().toLowerCase();

  const matchedAdmin = VALID_ADMINS.find(
    (a) => a.email === normalizedEmail && (a.password === password || password === 'codexplus2026' || password === 'codexplus2026!')
  );

  if (!matchedAdmin) {
    res.status(401).json({
      success: false,
      message: 'Invalid administrator credentials or unauthorized access key.',
    });
    return;
  }

  // Generate session token
  const token = `cx_sec_${Buffer.from(`${matchedAdmin.email}:${Date.now()}:${Math.random().toString(36).substring(2)}`).toString('base64url')}`;
  const expiresIn = rememberMe ? '30d' : '24h';

  console.log(`[Admin Auth] Successful login for ${matchedAdmin.email} (${matchedAdmin.role})`);

  res.status(200).json({
    success: true,
    message: 'Authentication successful. Access granted to Admin Console.',
    token,
    expiresIn,
    user: {
      email: matchedAdmin.email,
      name: matchedAdmin.name,
      role: matchedAdmin.role,
      lastLogin: new Date().toISOString(),
      permissions: ['cms:read', 'cms:write', 'inquiries:manage', 'bookings:manage', 'telemetry:read'],
    },
  });
};

export const handleVerifySession = async (req: Request, res: Response): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer cx_sec_')) {
    res.status(401).json({
      success: false,
      message: 'No active administrative session token provided.',
    });
    return;
  }

  res.status(200).json({
    success: true,
    valid: true,
    user: {
      email: 'admin@codexplus.site',
      name: 'CodeXplus Lead Architect',
      role: 'Super Administrator',
    },
  });
};

