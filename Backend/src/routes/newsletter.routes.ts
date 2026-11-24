import { Router, Request, Response } from 'express';
import { storage } from '../db/storage';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    res.status(400).json({ success: false, message: 'Valid email is required' });
    return;
  }
  const result = await storage.addSubscription(email);
  res.status(result.isNew ? 201 : 200).json({
    success: true,
    message: result.isNew ? 'Subscribed successfully' : 'Already subscribed',
    data: result.subscription,
  });
});

router.get('/', async (_req: Request, res: Response) => {
  const rawSubs = typeof (storage as any).getSubscriptions === 'function'
    ? (storage as any).getSubscriptions()
    : ((storage as any).data?.subscriptions || []);
  const subscriptions = rawSubs instanceof Promise ? await rawSubs : rawSubs;
  res.status(200).json({
    success: true,
    count: Array.isArray(subscriptions) ? subscriptions.length : 0,
    data: subscriptions,
  });
});

export default router;

