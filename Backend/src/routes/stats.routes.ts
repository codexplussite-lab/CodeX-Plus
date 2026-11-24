import { Router, Request, Response } from 'express';
import { storage } from '../db/storage';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const rawInquiries = storage.getInquiries();
    const inquiries = rawInquiries instanceof Promise ? await rawInquiries : rawInquiries;

    const rawBookings = storage.getBookings();
    const bookings = rawBookings instanceof Promise ? await rawBookings : rawBookings;

    const rawSubs = typeof (storage as any).getSubscriptions === 'function'
      ? (storage as any).getSubscriptions()
      : ((storage as any).data?.subscriptions || []);
    const subscriptions = rawSubs instanceof Promise ? await rawSubs : rawSubs;

    res.status(200).json({
      success: true,
      data: {
        inquiriesCount: Array.isArray(inquiries) ? inquiries.length : 0,
        pendingInquiries: Array.isArray(inquiries)
          ? inquiries.filter((i) => i.status === 'new' || i.status === 'in_review').length
          : 0,
        bookingsCount: Array.isArray(bookings) ? bookings.length : 0,
        pendingBookings: Array.isArray(bookings)
          ? bookings.filter((b) => b.status === 'pending').length
          : 0,
        subscribersCount: Array.isArray(subscriptions) ? subscriptions.length : 0,
        servicesCount: 5,
        projectsCount: 6,
        teamCount: 8,
        testimonialsCount: 5,
        blogsCount: 3,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve platform statistics',
    });
  }
});

export default router;

