import { Router } from 'express';
import collectionRouter from './collection.router';
import documentRouter from './document.router';
import searchRouter from './search.router';
import healthRouter from './health.router';

const mainRouter = Router();

mainRouter.use('/collections', collectionRouter);
mainRouter.use('/documents', documentRouter);
mainRouter.use('/search', searchRouter);
mainRouter.use('/', healthRouter); // Health check at `/api/health`

export default mainRouter;
