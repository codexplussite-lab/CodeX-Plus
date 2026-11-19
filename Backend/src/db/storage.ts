import fs from 'fs';
import path from 'path';
import { ContactInquiry, BookingRequest, NewsletterSubscription } from '../types';

interface DatabaseSchema {
  inquiries: ContactInquiry[];
  bookings: BookingRequest[];
  subscriptions: NewsletterSubscription[];
}

const DB_DIR = path.resolve(__dirname, '../../data');
const DB_FILE = path.join(DB_DIR, 'db.json');

const DEFAULT_DB: DatabaseSchema = {
  inquiries: [],
  bookings: [],
  subscriptions: [],
};

class StorageEngine {
  private data: DatabaseSchema;

  constructor() {
    this.ensureDatabase();
    this.data = this.readFromDisk();
  }

  private ensureDatabase(): void {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(DEFAULT_DB, null, 2), 'utf-8');
    }
  }

  private readFromDisk(): DatabaseSchema {
    try {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(raw);
    } catch {
      return DEFAULT_DB;
    }
  }

  private flushToDisk(): void {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to flush storage to disk:', err);
    }
  }

  // --- Inquiries ---
  public addInquiry(inquiry: Omit<ContactInquiry, 'id' | 'createdAt'>): ContactInquiry {
    const record: ContactInquiry = {
      ...inquiry,
      id: `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
    };
    this.data.inquiries.unshift(record);
    this.flushToDisk();
    return record;
  }

  public getInquiries(): ContactInquiry[] {
    return this.data.inquiries;
  }

  // --- Bookings ---
  public addBooking(booking: Omit<BookingRequest, 'id' | 'createdAt'>): BookingRequest {
    const record: BookingRequest = {
      ...booking,
      id: `book_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
    };
    this.data.bookings.unshift(record);
    this.flushToDisk();
    return record;
  }

  public getBookings(): BookingRequest[] {
    return this.data.bookings;
  }

  // --- Newsletter ---
  public addSubscription(email: string): { subscription: NewsletterSubscription; isNew: boolean } {
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
}

export const storage = new StorageEngine();
