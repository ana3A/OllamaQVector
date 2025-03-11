import { Request, Response } from 'express';
import { documentService } from '../services/document.service';
import { Document } from 'langchain/document';
import { handleError } from '../utils/errorHandler';

class DocumentController {
    async addDocument(req: Request, res: Response) {
        try {
            const { collectionName, text, metadata } = req.body;
            await documentService.addStringDocument(collectionName, text, metadata);
            res.status(200).json({ message: 'Document added successfully.' });
        } catch (error) {
            handleError(error, res);
        }
    }

    async addDocuments(req: Request, res: Response) {
        try {
            const { collectionName, documents } = req.body;
            const docInstances = documents.map((doc: { text: string; metadata?: Record<string, any> }) =>
                new Document({ pageContent: doc.text, metadata: doc.metadata })
            );

            await documentService.addDocuments(collectionName, docInstances);
            res.status(200).json({ message: 'Documents added successfully.' });
        } catch (error) {
            handleError(error, res);
        }
    }

    async deleteDocument(req: Request, res: Response) {
        try {
            const { collectionName, documentId } = req.body;
            await documentService.deleteDocument(collectionName, documentId);
            res.status(200).json({ message: 'Document deleted successfully.' });
        } catch (error) {
            handleError(error, res);
        }
    }

    async updateDocument(req: Request, res: Response) {
        try {
            const { collectionName, documentId, newText, newMetadata } = req.body;
            await documentService.updateDocument(collectionName, documentId, newText, newMetadata);
            res.status(200).json({ message: 'Document updated successfully.' });
        } catch (error) {
            handleError(error, res);
        }
    }
}

export const documentController = new DocumentController();
