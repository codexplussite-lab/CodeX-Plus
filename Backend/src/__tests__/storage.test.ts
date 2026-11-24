import { describe, it, expect } from 'vitest';
import { storage } from '../db/storage';

describe('StorageEngine Unit Tests', () => {
  it('should manage contact inquiries in storage engine', async () => {
    const initialList = await storage.getInquiries();
    const initialCount = initialList.length;
    const inq = await storage.addInquiry({
      name: 'Test Lead',
      email: 'test@lead.io',
      company: 'Lead Corp',
      service: 'Full-Stack Architecture',
      budget: '$50,000+',
      message: 'Direct storage test message'
    });

    expect(inq.id).toBeDefined();
    expect(inq.status).toBe('new');
    const afterAdd = await storage.getInquiries();
    expect(afterAdd.length).toBe(initialCount + 1);

    const updated = await storage.updateInquiryStatus(inq.id, 'contacted');
    expect(updated?.status).toBe('contacted');

    const deleted = await storage.deleteInquiry(inq.id);
    expect(deleted).toBe(true);
    const afterDelete = await storage.getInquiries();
    expect(afterDelete.length).toBe(initialCount);
  });

  it('should manage discovery bookings in storage engine', async () => {
    const initialList = await storage.getBookings();
    const initialCount = initialList.length;
    const booking = await storage.addBooking({
      name: 'Booking Client',
      email: 'booking@client.io',
      company: 'Enterprise Inc',
      service: 'AI Systems',
      preferredDate: '2026-12-01',
      preferredTime: '14:00',
      notes: 'Initial strategy call'
    });

    expect(booking.id).toBeDefined();
    expect(booking.status).toBe('pending');
    const afterAdd = await storage.getBookings();
    expect(afterAdd.length).toBe(initialCount + 1);

    const updated = await storage.updateBookingStatus(booking.id, 'confirmed');
    expect(updated?.status).toBe('confirmed');

    const deleted = await storage.deleteBooking(booking.id);
    expect(deleted).toBe(true);
  });

  it('should persist and retrieve CMS content correctly', async () => {
    const customPayload = {
      brand: { siteName: 'CODEXX+ UNIT TEST' },
      hero: { titleHighlight: 'Verified Architecture' }
    };

    const updated = await storage.updateCmsContent(customPayload);
    expect(updated).toEqual(customPayload);

    const fetched = await storage.getCmsContent();
    expect(fetched).toEqual(customPayload);
  });
});
