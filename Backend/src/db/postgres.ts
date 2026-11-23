import { Pool, PoolConfig } from 'pg';
import { config } from '../config/env';
import { ContactInquiry, BookingRequest, NewsletterSubscription } from '../types';

let pool: Pool | null = null;
let isPostgresReady = false;

export const getPgPool = (): Pool => {
  if (!pool) {
    const poolConfig: PoolConfig = config.db.url
      ? { connectionString: config.db.url }
      : {
          host: config.db.host,
          port: config.db.port,
          database: config.db.name,
          user: config.db.user,
          password: config.db.password,
          ssl: config.db.ssl ? { rejectUnauthorized: false } : false,
        };

    pool = new Pool({
      ...poolConfig,
      connectionTimeoutMillis: 4000,
      idleTimeoutMillis: 30000,
      max: 10,
    });

    pool.on('error', (err: Error) => {
      console.error('[PostgreSQL] Unexpected client pool error:', err.message);
    });
  }
  return pool;
};

export const initPostgres = async (): Promise<boolean> => {
  const p = getPgPool();
  try {
    const client = await p.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS inquiries (
          id VARCHAR(100) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          company VARCHAR(255) DEFAULT '',
          service VARCHAR(255) NOT NULL,
          budget VARCHAR(100) NOT NULL,
          message TEXT NOT NULL,
          status VARCHAR(50) DEFAULT 'new',
          ip_address VARCHAR(100) DEFAULT '',
          created_at TIMESTAMPTZ DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS bookings (
          id VARCHAR(100) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          service VARCHAR(255) NOT NULL,
          preferred_date VARCHAR(100) DEFAULT '',
          notes TEXT DEFAULT '',
          status VARCHAR(50) DEFAULT 'pending',
          ip_address VARCHAR(100) DEFAULT '',
          created_at TIMESTAMPTZ DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS subscriptions (
          id VARCHAR(100) PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          subscribed_at TIMESTAMPTZ DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS cms_content (
          id VARCHAR(50) PRIMARY KEY,
          content JSONB NOT NULL,
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );
      `);
      isPostgresReady = true;
      console.log(`[PostgreSQL] Connected and schema verified on database: ${config.db.name}`);
      return true;
    } finally {
      client.release();
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.warn(`[PostgreSQL] Connection warning (${message}). Operating with local fallback.`);
    isPostgresReady = false;
    return false;
  }
};

export const isPostgresConnected = (): boolean => isPostgresReady;

// --- Inquiries ---
export const pgAddInquiry = async (
  inquiry: Omit<ContactInquiry, 'id' | 'createdAt' | 'status'>
): Promise<ContactInquiry> => {
  const p = getPgPool();
  const id = `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const status: ContactInquiry['status'] = 'new';
  const createdAt = new Date().toISOString();

  const query = `
    INSERT INTO inquiries (id, name, email, company, service, budget, message, status, ip_address, created_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING id, name, email, company, service, budget, message, status, ip_address AS "ipAddress", created_at AS "createdAt";
  `;

  const values = [
    id,
    inquiry.name,
    inquiry.email,
    inquiry.company || '',
    inquiry.service,
    inquiry.budget,
    inquiry.message,
    status,
    inquiry.ipAddress || '',
    createdAt,
  ];

  const result = await p.query(query, values);
  return result.rows[0];
};

export const pgGetInquiries = async (): Promise<ContactInquiry[]> => {
  const p = getPgPool();
  const query = `
    SELECT id, name, email, company, service, budget, message, status, ip_address AS "ipAddress", created_at AS "createdAt"
    FROM inquiries
    ORDER BY created_at DESC;
  `;
  const result = await p.query(query);
  return result.rows;
};

export const pgUpdateInquiryStatus = async (
  id: string,
  status: ContactInquiry['status']
): Promise<ContactInquiry | null> => {
  const p = getPgPool();
  const query = `
    UPDATE inquiries
    SET status = $1
    WHERE id = $2
    RETURNING id, name, email, company, service, budget, message, status, ip_address AS "ipAddress", created_at AS "createdAt";
  `;
  const result = await p.query(query, [status, id]);
  return result.rows[0] || null;
};

export const pgDeleteInquiry = async (id: string): Promise<boolean> => {
  const p = getPgPool();
  const result = await p.query('DELETE FROM inquiries WHERE id = $1;', [id]);
  return (result.rowCount ?? 0) > 0;
};

// --- Bookings ---
export const pgAddBooking = async (
  booking: Omit<BookingRequest, 'id' | 'createdAt' | 'status'>
): Promise<BookingRequest> => {
  const p = getPgPool();
  const id = `book_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const status: BookingRequest['status'] = 'pending';
  const createdAt = new Date().toISOString();

  const query = `
    INSERT INTO bookings (id, name, email, service, preferred_date, notes, status, ip_address, created_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING id, name, email, service, preferred_date AS "preferredDate", notes, status, ip_address AS "ipAddress", created_at AS "createdAt";
  `;

  const values = [
    id,
    booking.name,
    booking.email,
    booking.service,
    booking.preferredDate || '',
    booking.notes || '',
    status,
    booking.ipAddress || '',
    createdAt,
  ];

  const result = await p.query(query, values);
  return result.rows[0];
};

export const pgGetBookings = async (): Promise<BookingRequest[]> => {
  const p = getPgPool();
  const query = `
    SELECT id, name, email, service, preferred_date AS "preferredDate", notes, status, ip_address AS "ipAddress", created_at AS "createdAt"
    FROM bookings
    ORDER BY created_at DESC;
  `;
  const result = await p.query(query);
  return result.rows;
};

export const pgUpdateBookingStatus = async (
  id: string,
  status: BookingRequest['status']
): Promise<BookingRequest | null> => {
  const p = getPgPool();
  const query = `
    UPDATE bookings
    SET status = $1
    WHERE id = $2
    RETURNING id, name, email, service, preferred_date AS "preferredDate", notes, status, ip_address AS "ipAddress", created_at AS "createdAt";
  `;
  const result = await p.query(query, [status, id]);
  return result.rows[0] || null;
};

export const pgDeleteBooking = async (id: string): Promise<boolean> => {
  const p = getPgPool();
  const result = await p.query('DELETE FROM bookings WHERE id = $1;', [id]);
  return (result.rowCount ?? 0) > 0;
};

// --- CMS Content ---
export const pgGetCmsContent = async (): Promise<Record<string, unknown> | null> => {
  const p = getPgPool();
  const result = await p.query("SELECT content FROM cms_content WHERE id = 'current' LIMIT 1;");
  if (result.rows.length === 0) return null;
  return result.rows[0].content;
};

export const pgUpdateCmsContent = async (
  content: Record<string, unknown>
): Promise<Record<string, unknown>> => {
  const p = getPgPool();
  const query = `
    INSERT INTO cms_content (id, content, updated_at)
    VALUES ('current', $1, NOW())
    ON CONFLICT (id) DO UPDATE SET content = $1, updated_at = NOW()
    RETURNING content;
  `;
  const result = await p.query(query, [JSON.stringify(content)]);
  return result.rows[0].content;
};

// --- Subscriptions ---
export const pgAddSubscription = async (
  email: string
): Promise<{ subscription: NewsletterSubscription; isNew: boolean }> => {
  const p = getPgPool();
  const normalized = email.toLowerCase().trim();

  const existing = await p.query('SELECT id, email, subscribed_at AS "subscribedAt" FROM subscriptions WHERE email = $1 LIMIT 1;', [normalized]);
  if (existing.rows.length > 0) {
    return { subscription: existing.rows[0], isNew: false };
  }

  const id = `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const now = new Date().toISOString();
  const query = `
    INSERT INTO subscriptions (id, email, subscribed_at)
    VALUES ($1, $2, $3)
    RETURNING id, email, subscribed_at AS "subscribedAt";
  `;
  const result = await p.query(query, [id, normalized, now]);
  return { subscription: result.rows[0], isNew: true };
};

