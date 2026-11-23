import { Request, Response } from 'express';
import { z } from 'zod';
import { storage } from '../db/storage';
import { ContactInquiry } from '../types';

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().max(100).optional().default(''),
  service: z.string().min(2, 'Please select a discipline/service').optional().default('Full-Stack Platform'),
  budget: z.string().min(2, 'Please select an estimated budget tier').optional().default('$50k – $100k'),
  message: z.string().min(5, 'Message must be at least 5 characters').max(3000),
  privacyPolicy: z.boolean().optional().default(true),
  honeypot: z.string().optional(),
});

export const handleContactSubmit = async (req: Request, res: Response): Promise<void> => {
  const { name, email, company, service, budget, message, honeypot } = req.body;

  // Bot honeypot protection: silently drop if filled
  if (honeypot && typeof honeypot === 'string' && honeypot.trim().length > 0) {
    res.status(200).json({
      success: true,
      message: 'Your inquiry has been received. Our team will follow up within 24 hours.',
    });
    return;
  }

  const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '';

  const inquiry = await storage.addInquiry({
    name,
    email,
    company: company || '',
    service: service || 'Full-Stack Platform',
    budget: budget || '$50k – $100k',
    message,
    ipAddress,
  });

  console.log(`[Contact Inquiry] Received from ${name} <${email}> regarding ${service}`);

  res.status(201).json({
    success: true,
    message: 'Your inquiry has been received. Our team will follow up within 24 hours.',
    data: {
      id: inquiry.id,
      createdAt: inquiry.createdAt,
      status: inquiry.status,
    },
  });
};

export const getInquiriesList = async (_req: Request, res: Response): Promise<void> => {
  const list = await storage.getInquiries();
  res.status(200).json({
    success: true,
    count: list.length,
    data: list,
  });
};

export const updateInquiryStatusHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { status } = req.body as { status: ContactInquiry['status'] };

  if (!status || !['new', 'in_review', 'contacted', 'archived'].includes(status)) {
    res.status(400).json({
      success: false,
      message: 'Invalid status. Must be one of: new, in_review, contacted, archived',
    });
    return;
  }

  const updated = await storage.updateInquiryStatus(id, status);
  if (!updated) {
    res.status(404).json({
      success: false,
      message: `Inquiry with ID '${id}' not found`,
    });
    return;
  }

  res.status(200).json({
    success: true,
    message: `Inquiry status updated to ${status}`,
    data: updated,
  });
};

export const deleteInquiryHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const deleted = await storage.deleteInquiry(id);

  if (!deleted) {
    res.status(404).json({
      success: false,
      message: `Inquiry with ID '${id}' not found`,
    });
    return;
  }

  res.status(200).json({
    success: true,
    message: `Inquiry '${id}' deleted successfully`,
  });
};
