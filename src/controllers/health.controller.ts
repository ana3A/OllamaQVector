import { Request, Response } from 'express';

export class HealthController {
    static checkHealth(req: Request, res: Response) {
        res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
    }
}
