import { Router } from 'express';
import { handleBookingSubmit, getBookingsList, bookingSchema } from '../controllers/booking.controller';
import { validateBody } from '../middlewares/validate';

const router = Router();

// POST /api/bookings - Request a discovery call
router.post('/', validateBody(bookingSchema), handleBookingSubmit);

// GET /api/bookings - Retrieve booking requests
router.get('/', getBookingsList);

export default router;
