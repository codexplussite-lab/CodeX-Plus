import fs from 'fs';
import path from 'path';
import { ContactInquiry, BookingRequest, NewsletterSubscription } from '../types';
import {
  isPostgresConnected,
  pgAddInquiry,
  pgGetInquiries,
  pgUpdateInquiryStatus,
  pgDeleteInquiry,
  pgAddBooking,
  pgGetBookings,
  pgUpdateBookingStatus,
  pgDeleteBooking,
  pgGetCmsContent,
  pgUpdateCmsContent,
  pgAddSubscription,
} from './postgres';

interface DatabaseSchema {
  inquiries: ContactInquiry[];
  bookings: BookingRequest[];
  subscriptions: NewsletterSubscription[];
  cmsContent?: Record<string, unknown>;
}

const DB_DIR = path.resolve(__dirname, '../../data');
const DB_FILE = path.join(DB_DIR, 'db.json');

const INITIAL_SEED_INQUIRIES: ContactInquiry[] = [
  {
    id: 'inq_demo_1',
    name: 'Julian Mercer',
    email: 'julian@northstarcloud.io',
    company: 'Northstar Cloud',
    service: 'Full-Stack Platform',
    budget: '$50k – $100k',
    message: 'Seeking end-to-end dark-luxury platform re-architecture with distributed multi-agent LLM pipelines.',
    status: 'new',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    ipAddress: '198.51.100.24',
  },
  {
    id: 'inq_demo_2',
    name: 'Elena Rostova',
    email: 'elena@owl-systems.com',
    company: 'OWL Systems',
    service: 'AI & Autonomous Systems',
    budget: '$100k+',
    message: 'Need high-throughput agent workflows for automated regulatory reporting and custom model inference.',
    status: 'in_review',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    ipAddress: '203.0.113.19',
  },
  {
    id: 'inq_demo_3',
    name: 'Marcus Vance',
    email: 'marcus@morhemetech.com',
    company: 'Morheme Tech',
    service: 'Motion & 3D WebGL',
    budget: '$25k – $50k',
    message: 'Looking to commission interactive 3D WebGL hero scene and spatial product viewer for our series A launch.',
    status: 'contacted',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    ipAddress: '192.0.2.88',
  },
];

const INITIAL_SEED_BOOKINGS: BookingRequest[] = [
  {
    id: 'book_demo_1',
    name: 'David Chen',
    email: 'david@luminalabs.ai',
    service: 'Full-Stack Platform',
    preferredDate: '2026-11-24',
    notes: 'Discussing enterprise cloud architecture sprint.',
    status: 'confirmed',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    ipAddress: '198.51.100.12',
  },
  {
    id: 'book_demo_2',
    name: 'Nadia Karim',
    email: 'nadia@zainabbees.org',
    service: 'Dark Luxury UI/UX',
    preferredDate: '2026-11-26',
    notes: 'Brand guidelines & typography token overhaul.',
    status: 'pending',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    ipAddress: '203.0.113.44',
  },
];

class StorageEngine {
  private data: DatabaseSchema;

  constructor() {
    this.ensureDatabase();
    this.data = this.readFromDisk();
    this.seedIfEmpty();
  }

  private ensureDatabase(): void {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      const defaultState: DatabaseSchema = {
        inquiries: INITIAL_SEED_INQUIRIES,
        bookings: INITIAL_SEED_BOOKINGS,
        subscriptions: [],
      };
      fs.writeFileSync(DB_FILE, JSON.stringify(defaultState, null, 2), 'utf-8');
    }
  }

  private seedIfEmpty(): void {
    let changed = false;
    if (this.data.inquiries.length === 0) {
      this.data.inquiries = INITIAL_SEED_INQUIRIES;
      changed = true;
    }
    if (this.data.bookings.length === 0) {
      this.data.bookings = INITIAL_SEED_BOOKINGS;
      changed = true;
    }
    if (changed) {
      this.flushToDisk();
    }
  }

  private readFromDisk(): DatabaseSchema {
    try {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(raw);
    } catch {
      return {
        inquiries: INITIAL_SEED_INQUIRIES,
        bookings: INITIAL_SEED_BOOKINGS,
        subscriptions: [],
      };
    }
  }

  private flushToDisk(): void {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to flush storage to disk:', err);
    }
  }

  public getEngineType(): 'postgresql' | 'json_file' {
    return isPostgresConnected() ? 'postgresql' : 'json_file';
  }

  // --- Inquiries ---
  public async addInquiry(
    inquiry: Omit<ContactInquiry, 'id' | 'createdAt' | 'status'>
  ): Promise<ContactInquiry> {
    if (isPostgresConnected()) {
      try {
        return await pgAddInquiry(inquiry);
      } catch (err) {
        console.error('[PostgreSQL Error: addInquiry] falling back to disk:', err);
      }
    }

    const record: ContactInquiry = {
      ...inquiry,
      status: 'new',
      id: `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
    };
    this.data.inquiries.unshift(record);
    this.flushToDisk();
    return record;
  }

  public async getInquiries(): Promise<ContactInquiry[]> {
    if (isPostgresConnected()) {
      try {
        return await pgGetInquiries();
      } catch (err) {
        console.error('[PostgreSQL Error: getInquiries] falling back to disk:', err);
      }
    }
    return this.data.inquiries;
  }

  public async updateInquiryStatus(
    id: string,
    status: ContactInquiry['status']
  ): Promise<ContactInquiry | null> {
    if (isPostgresConnected()) {
      try {
        return await pgUpdateInquiryStatus(id, status);
      } catch (err) {
        console.error('[PostgreSQL Error: updateInquiryStatus] falling back to disk:', err);
      }
    }

    const inquiry = this.data.inquiries.find((inq) => inq.id === id);
    if (!inquiry) return null;
    inquiry.status = status;
    this.flushToDisk();
    return inquiry;
  }

  public async deleteInquiry(id: string): Promise<boolean> {
    if (isPostgresConnected()) {
      try {
        return await pgDeleteInquiry(id);
      } catch (err) {
        console.error('[PostgreSQL Error: deleteInquiry] falling back to disk:', err);
      }
    }

    const index = this.data.inquiries.findIndex((inq) => inq.id === id);
    if (index === -1) return false;
    this.data.inquiries.splice(index, 1);
    this.flushToDisk();
    return true;
  }

  // --- Bookings ---
  public async addBooking(
    booking: Omit<BookingRequest, 'id' | 'createdAt' | 'status'>
  ): Promise<BookingRequest> {
    if (isPostgresConnected()) {
      try {
        return await pgAddBooking(booking);
      } catch (err) {
        console.error('[PostgreSQL Error: addBooking] falling back to disk:', err);
      }
    }

    const record: BookingRequest = {
      ...booking,
      status: 'pending',
      id: `book_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
    };
    this.data.bookings.unshift(record);
    this.flushToDisk();
    return record;
  }

  public async getBookings(): Promise<BookingRequest[]> {
    if (isPostgresConnected()) {
      try {
        return await pgGetBookings();
      } catch (err) {
        console.error('[PostgreSQL Error: getBookings] falling back to disk:', err);
      }
    }
    return this.data.bookings;
  }

  public async updateBookingStatus(
    id: string,
    status: BookingRequest['status']
  ): Promise<BookingRequest | null> {
    if (isPostgresConnected()) {
      try {
        return await pgUpdateBookingStatus(id, status);
      } catch (err) {
        console.error('[PostgreSQL Error: updateBookingStatus] falling back to disk:', err);
      }
    }

    const booking = this.data.bookings.find((b) => b.id === id);
    if (!booking) return null;
    booking.status = status;
    this.flushToDisk();
    return booking;
  }

  public async deleteBooking(id: string): Promise<boolean> {
    if (isPostgresConnected()) {
      try {
        return await pgDeleteBooking(id);
      } catch (err) {
        console.error('[PostgreSQL Error: deleteBooking] falling back to disk:', err);
      }
    }

    const index = this.data.bookings.findIndex((b) => b.id === id);
    if (index === -1) return false;
    this.data.bookings.splice(index, 1);
    this.flushToDisk();
    return true;
  }

  // --- CMS Content ---
  public async getCmsContent(): Promise<Record<string, unknown> | null> {
    if (isPostgresConnected()) {
      try {
        return await pgGetCmsContent();
      } catch (err) {
        console.error('[PostgreSQL Error: getCmsContent] falling back to disk:', err);
      }
    }
    return this.data.cmsContent || null;
  }

  public async updateCmsContent(content: Record<string, unknown>): Promise<Record<string, unknown>> {
    if (isPostgresConnected()) {
      try {
        return await pgUpdateCmsContent(content);
      } catch (err) {
        console.error('[PostgreSQL Error: updateCmsContent] falling back to disk:', err);
      }
    }
    this.data.cmsContent = content;
    this.flushToDisk();
    return this.data.cmsContent;
  }

  // --- Newsletter ---
  public async addSubscription(
    email: string
  ): Promise<{ subscription: NewsletterSubscription; isNew: boolean }> {
    if (isPostgresConnected()) {
      try {
        return await pgAddSubscription(email);
      } catch (err) {
        console.error('[PostgreSQL Error: addSubscription] falling back to disk:', err);
      }
    }

    const normalized = email.toLowerCase().trim();
    const existing = this.data.subscriptions.find((s) => s.email.toLowerCase() === normalized);
    if (existing) {
      return { subscription: existing, isNew: false };
    }
    const record: NewsletterSubscription = {
      id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      email: normalized,
      subscribedAt: new Date().toISOString(),
    };
    this.data.subscriptions.unshift(record);
    this.flushToDisk();
    return { subscription: record, isNew: true };
  }

  public async getSubscriptions(): Promise<NewsletterSubscription[]> {
    return this.data.subscriptions || [];
  }

  public async deleteSubscription(id: string): Promise<boolean> {
    const idx = this.data.subscriptions.findIndex((s) => s.id === id);
    if (idx !== -1) {
      this.data.subscriptions.splice(idx, 1);
      this.flushToDisk();
      return true;
    }
    return false;
  }
}

export const storage = new StorageEngine();
