import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export const validateBody = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const errors: Record<string, string[]> = {};
        for (const issue of err.issues) {
          const path = issue.path.join('.') || 'body';
          if (!errors[path]) errors[path] = [];
          errors[path].push(issue.message);
        }
        res.status(400).json({
          success: false,
          message: 'Validation failed for request payload',
          errors,
        });
        return;
      }
      next(err);
    }
  };
};
