import { Router } from 'express';
import { handleAdminLogin, handleVerifySession, loginSchema } from '../controllers/auth.controller';
import { validateBody } from '../middlewares/validate';

const router = Router();

// POST /api/auth/login - Authenticate administrator credentials
router.post('/login', validateBody(loginSchema), handleAdminLogin);

// GET /api/auth/verify - Validate session token
router.get('/verify', handleVerifySession);

export default router;
