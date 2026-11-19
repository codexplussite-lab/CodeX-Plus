import { Request, Response } from 'express';
import { z } from 'zod';
import { storage } from '../db/storage';
import { BookingRequest } from '../types';

export const bookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  service: z.string().min(2, 'Please select a service'),
  preferredDate: z.string().optional(),
  notes: z.string().max(1000).optional(),
});

export const handleBookingSubmit = async (req: Request, res: Response): Promise<void> => {
  const { name, email, service, preferredDate, notes } = req.body;
  const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '';

  const booking = storage.addBooking({
    name,
    email,
    service,
    preferredDate,
    notes,
    ipAddress,
  });

  console.log(`[Discovery Booking] Requested by ${name} <${email}> for ${service}`);

  res.status(201).json({
    success: true,
    message: 'Discovery strategy call request received. Calendar invitation dispatched.',
    data: {
      id: booking.id,
      createdAt: booking.createdAt,
      status: booking.status,
    },
  });
};

export const getBookingsList = async (_req: Request, res: Response): Promise<void> => {
  const list = storage.getBookings();
  res.status(200).json({
    success: true,
    count: list.length,
    data: list,
  });
};

export const updateBookingStatusHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { status } = req.body as { status: BookingRequest['status'] };

  if (!status || !['pending', 'confirmed', 'rescheduled', 'completed'].includes(status)) {
    res.status(400).json({
      success: false,
      message: 'Invalid status. Must be one of: pending, confirmed, rescheduled, completed',
    });
    return;
  }

  const updated = storage.updateBookingStatus(id, status);
  if (!updated) {
    res.status(404).json({
      success: false,
      message: `Booking with ID '${id}' not found`,
    });
    return;
  }

  res.status(200).json({
    success: true,
    message: `Booking status updated to ${status}`,
    data: updated,
  });
};

export const deleteBookingHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const deleted = storage.deleteBooking(id);

  if (!deleted) {
    res.status(404).json({
      success: false,
      message: `Booking with ID '${id}' not found`,
    });
    return;
  }

  res.status(200).json({
    success: true,
    message: `Booking '${id}' deleted successfully`,
  });
};
