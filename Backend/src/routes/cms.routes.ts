import { Router, Request, Response } from 'express';
import { storage } from '../db/storage';

const router = Router();

// GET /api/cms - Retrieve published CMS content
router.get('/', (_req: Request, res: Response) => {
  const content = storage.getCmsContent();
  res.status(200).json({
    success: true,
    data: content,
  });
});

// PUT /api/cms - Update & publish CMS content
router.put('/', (req: Request, res: Response) => {
  const content = req.body as Record<string, unknown>;
  if (!content || typeof content !== 'object') {
    res.status(400).json({
      success: false,
      message: 'Invalid CMS payload provided',
    });
    return;
  }

  const updated = storage.updateCmsContent(content);
  console.log('[CMS] Content updated and published to disk storage.');

  res.status(200).json({
    success: true,
    message: 'CMS content published successfully',
    data: updated,
  });
});

export default router;
