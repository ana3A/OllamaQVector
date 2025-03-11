import { Document } from 'langchain/document';
import { vectorStoreService } from './vectorStore.service';

class DocumentService {

    async addDocuments(collectionName: string, documents: Document[]): Promise<void> {
        const vectorStore = vectorStoreService.getVectorStore(collectionName);
        if (!vectorStore) {
            console.error(`Vector store for "${collectionName}" is not initialized.`);
            return;
        }

        try {
            await vectorStore.addDocuments(documents);
            console.log(`Documents added to "${collectionName}".`);
        } catch (error) {
            console.error(`Error adding documents to "${collectionName}":`, error);
        }
    }

    async addDocument(collectionName: string, document: Document): Promise<void> {
        await this.addDocuments(collectionName, [document]);
    }

    async addStringDocument(collectionName: string, text: string, metadata?: Record<string, any>): Promise<void> {
        await this.addDocument(collectionName, new Document({ pageContent: text, metadata }));
    }

    async search(collectionName: string, query: any, topK: number = 5): Promise<Document[]> {
        if (!vectorStoreService.getVectorStore(collectionName)) {
            console.warn(`Vector store for "${collectionName}" is not initialized. Initializing now.`);
            await vectorStoreService.initializeVectorStore(collectionName);
        }
    
        const vectorStore = vectorStoreService.getVectorStore(collectionName);
        if (!vectorStore) {
            console.error(`Vector store for "${collectionName}" failed to initialize.`);
            return [];
        }
    
        try {
            const results = await vectorStore.similaritySearch(query.content, topK);
            console.log(`Search results from "${collectionName}":`, results);
            return results;
        } catch (error) {
            console.error(`Error performing search in "${collectionName}":`, error);
            return [];
        }
    }

    async deleteDocument(collectionName: string, documentId: string): Promise<void> {
        const vectorStore = vectorStoreService.getVectorStore(collectionName);
        if (!vectorStore) {
            console.error(`Vector store for "${collectionName}" is not initialized.`);
            return;
        }

        try {
            await vectorStore.delete([documentId]);
            console.log(`Document "${documentId}" deleted from "${collectionName}".`);
        } catch (error) {
            console.error(`Error deleting document from "${collectionName}":`, error);
        }
    }

    async updateDocument(collectionName: string, documentId: string, newText: string, newMetadata?: Record<string, any>): Promise<void> {
        await this.deleteDocument(collectionName, documentId);
        await this.addStringDocument(collectionName, newText, newMetadata);
        console.log(`Document "${documentId}" updated in "${collectionName}".`);
    }

    private async ensureVectorStoreInitialized(collectionName: string): Promise<void> {
        if (!vectorStoreService.getVectorStore(collectionName)) {
            console.warn(`Vector store for "${collectionName}" is not initialized. Initializing now.`);
            await vectorStoreService.initializeVectorStore(collectionName);
        }
    }
    
}

export const documentService = new DocumentService();
