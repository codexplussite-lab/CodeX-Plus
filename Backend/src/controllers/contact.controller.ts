import { Request, Response } from 'express';
import { z } from 'zod';
import { storage } from '../db/storage';

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().max(100).optional().default(''),
  service: z.string().min(2, 'Please select a discipline/service'),
  budget: z.string().min(2, 'Please select an estimated budget tier'),
  message: z.string().min(5, 'Message must be at least 5 characters').max(3000),
});

export const handleContactSubmit = async (req: Request, res: Response): Promise<void> => {
  const { name, email, company, service, budget, message } = req.body;
  const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '';

  const inquiry = storage.addInquiry({
    name,
    email,
    company,
    service,
    budget,
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
    },
  });
};

export const getInquiriesList = async (_req: Request, res: Response): Promise<void> => {
  const list = storage.getInquiries();
  res.status(200).json({
    success: true,
    count: list.length,
    data: list,
  });
};
