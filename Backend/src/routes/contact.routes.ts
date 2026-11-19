import { Router } from 'express';
import { handleContactSubmit, getInquiriesList, contactSchema } from '../controllers/contact.controller';
import { validateBody } from '../middlewares/validate';

const router = Router();

// POST /api/contact - Submit a new inquiry
router.post('/', validateBody(contactSchema), handleContactSubmit);

// GET /api/contact - Retrieve inquiries (internal/admin)
router.get('/', getInquiriesList);

export default router;
