import { Router } from 'express';
import { collectionController } from '../controllers/collection.controller';

const collectionRouter = Router();

collectionRouter.post('/create', (req, res) => collectionController.createCollection(req, res));
collectionRouter.get('/list', (req, res) => collectionController.listCollections(req, res));
collectionRouter.delete('/:collectionName', (req, res) => collectionController.deleteCollection(req, res));
collectionRouter.get('/:collectionName/metadata', (req, res) => collectionController.getCollectionMetadata(req, res));

export default collectionRouter;
