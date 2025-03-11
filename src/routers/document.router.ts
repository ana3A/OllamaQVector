import { Router } from 'express';
import { documentController } from '../controllers/document.controller';

const documentRouter = Router();

documentRouter.post('/add', (req, res) => documentController.addDocument(req, res));
documentRouter.post('/add-multiple', (req, res) => documentController.addDocuments(req, res));
documentRouter.delete('/:collectionName/:documentId', (req, res) => documentController.deleteDocument(req, res));
documentRouter.put('/update', (req, res) => documentController.updateDocument(req, res));

export default documentRouter;
