import { Request, Response, NextFunction } from "express";

export const requestHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>,
  onError?: (error: any, req: Request, res: Response, next: NextFunction) => void
) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    if (onError) {
      onError(error, req, res, next);
    } else {
      res.status(500).json({ error: "An unexpected error occurred." });
    }
  }
};
