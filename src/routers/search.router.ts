import { Router } from 'express';
import { searchController } from '../controllers/search.controller';

const searchRouter = Router();

searchRouter.post('/search', (req, res) => searchController.search(req, res));

export default searchRouter;
