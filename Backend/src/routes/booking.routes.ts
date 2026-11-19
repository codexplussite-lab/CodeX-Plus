import { Router } from 'express';
import {
  handleBookingSubmit,
  getBookingsList,
  updateBookingStatusHandler,
  deleteBookingHandler,
  bookingSchema,
} from '../controllers/booking.controller';
import { validateBody } from '../middlewares/validate';

const router = Router();

// POST /api/bookings - Request a discovery call
router.post('/', validateBody(bookingSchema), handleBookingSubmit);

// GET /api/bookings - Retrieve booking requests
router.get('/', getBookingsList);

// PATCH /api/bookings/:id - Update booking status
router.patch('/:id', updateBookingStatusHandler);

// DELETE /api/bookings/:id - Delete booking
router.delete('/:id', deleteBookingHandler);

export default router;
