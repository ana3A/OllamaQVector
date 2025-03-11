import { QdrantVectorStore } from '@langchain/qdrant';
import { EmbeddingService } from './embeddings.service';

class VectorStoreService {
    private vectorStores: Map<string, QdrantVectorStore> = new Map();
    private embeddingService: EmbeddingService;

    constructor(embeddingService: EmbeddingService) {
        this.embeddingService = embeddingService;
    }

    async initializeVectorStore(collectionName: string): Promise<void> {
        if (!this.vectorStores.has(collectionName)) {
            const vectorStore = await QdrantVectorStore.fromExistingCollection(
                this.embeddingService.getEmbeddingModel(),
                { collectionName, url: process.env.QDRANT_URL || 'http://localhost:6333' }
            );
            this.vectorStores.set(collectionName, vectorStore);
            console.log(`Vector store for "${collectionName}" initialized.`);
        }
    }

    getVectorStore(collectionName: string): QdrantVectorStore | null {
        return this.vectorStores.get(collectionName) || null;
    }
}

export const vectorStoreService = new VectorStoreService(new EmbeddingService());
