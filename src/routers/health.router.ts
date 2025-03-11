import { Router } from 'express';
import { HealthController } from '../controllers/health.controller';

const healthRouter = Router();

healthRouter.get('/health', HealthController.checkHealth);

export default healthRouter;
