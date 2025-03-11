import { Request, Response } from 'express';
import { QdrantClientService } from '../services/qdrant.service';
import { handleError } from '../utils/errorHandler';
import { vectorStoreService } from '../services/vectorStore.service';

class CollectionController {
    private qdrantService: QdrantClientService;

    constructor() {
        this.qdrantService = new QdrantClientService();
    }

    async createCollection(req: Request, res: Response) {
        try {
            const { collectionName, vectorSize, distanceMetric } = req.body;
            await this.qdrantService.createCollection(collectionName, vectorSize, distanceMetric);
            await vectorStoreService.initializeVectorStore(collectionName);
            
            res.status(200).json({ message: `Collection "${collectionName}" created.` });
        } catch (error) {
            handleError(error, res);
        }
    }

    async listCollections(req: Request, res: Response) {
        try {
            const collections = await this.qdrantService.getClient().getCollections();
            res.status(200).json(collections);
        } catch (error) {
            handleError(error, res);
        }
    }

    async deleteCollection(req: Request, res: Response) {
        try {
            const { collectionName } = req.params;
            await this.qdrantService.getClient().deleteCollection(collectionName);
            res.status(200).json({ message: `Collection "${collectionName}" deleted.` });
        } catch (error) {
            handleError(error, res);
        }
    }

    async getCollectionMetadata(req: Request, res: Response) {
        try {
            const { collectionName } = req.params;
            const metadata = await this.qdrantService.getClient().collectionClusterInfo(collectionName);
            res.status(200).json(metadata);
        } catch (error) {
            handleError(error, res);
        }
    }
}

export const collectionController = new CollectionController(); 