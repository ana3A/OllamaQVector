import { QdrantClient } from '@qdrant/js-client-rest';
import { Response } from 'express';
import { handleError } from '../utils/errorHandler';

export class QdrantClientService {
    private client: QdrantClient;

    constructor(qdrantUrl: string = process.env.QDRANT_URL || "http://qdrant:6333") {
        try {
            this.client = new QdrantClient({ url: qdrantUrl });
            console.log(`Qdrant client created successfully connected to ${qdrantUrl}`)
        } catch (error) {
            console.error("Error initializing QdrantClient:", error);
            throw new Error("Failed to initialize QdrantClient");
        }
    }

    async collectionExists(collectionName: string): Promise<boolean> {
        try {
            const collections = await this.client.getCollections();
            return collections.collections?.some((col) => col.name === collectionName) ?? false;
        } catch (error) {
            console.error(`Error checking if collection "${collectionName}" exists:`, error);
            return false;
        }
    }

    async createCollection(
        collectionName: string, 
        vectorSize: number, 
        distanceMetric: 'Cosine' | 'Euclid' | 'Dot' | 'Manhattan' = 'Cosine',
        res?: Response
    ): Promise<void> {
        try {
            console.log(`Trying to create collection "${collectionName}" on Qdrant.`);
            if (!(await this.collectionExists(collectionName))) {
                await this.client.createCollection(collectionName, {
                    vectors: { size: vectorSize, distance: distanceMetric },
                });
                console.log(`Collection "${collectionName}" created.`);
            } else {
                console.log(`Collection "${collectionName}" already exists.`);
            }
        } catch (error) {
            console.error(`Error creating collection "${collectionName}":`, error);
            if (res) handleError(error, res);
        }
    }

    getClient(): QdrantClient {
        return this.client;
    }
}