import { Request, Response } from 'express';
import { handleError } from '../utils/errorHandler';
import { documentService } from '../services/document.service';

class SearchController {

    async search(req: Request, res: Response) {
        try {
            const { collectionName, query, topK } = req.body;
            const results = await documentService.search(collectionName, { content: query }, topK || 5);
            res.status(200).json(results);
        } catch (error) {
            handleError(error, res);
        }
    }
}

export const searchController = new SearchController();