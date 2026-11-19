export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  company?: string;
  service: string;
  budget: string;
  message: string;
  status: 'new' | 'in_review' | 'contacted' | 'archived';
  createdAt: string;
  ipAddress?: string;
}

export interface BookingRequest {
  id: string;
  name: string;
  email: string;
  service: string;
  preferredDate?: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'rescheduled' | 'completed';
  createdAt: string;
  ipAddress?: string;
}

export interface NewsletterSubscription {
  id: string;
  email: string;
  subscribedAt: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  errors?: Record<string, string[]>;
}
