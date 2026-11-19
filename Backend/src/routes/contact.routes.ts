import { Router } from 'express';
import {
  handleContactSubmit,
  getInquiriesList,
  updateInquiryStatusHandler,
  deleteInquiryHandler,
  contactSchema,
} from '../controllers/contact.controller';
import { validateBody } from '../middlewares/validate';

const router = Router();

// POST /api/contact - Submit a new inquiry
router.post('/', validateBody(contactSchema), handleContactSubmit);

// GET /api/contact - Retrieve inquiries (internal/admin)
router.get('/', getInquiriesList);

// PATCH /api/contact/:id - Update status
router.patch('/:id', updateInquiryStatusHandler);

// DELETE /api/contact/:id - Delete inquiry
router.delete('/:id', deleteInquiryHandler);

export default router;
