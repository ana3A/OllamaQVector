import { OllamaEmbeddings } from '@langchain/ollama';

export class EmbeddingService {
    private model: OllamaEmbeddings;

    constructor(modelName: string = "nomic-embed-text", baseUrl: string = process.env.OLLAMA_URL || "http://localhost:11434") {
        this.model = new OllamaEmbeddings({ model: modelName, baseUrl });
    }

    getEmbeddingModel(): OllamaEmbeddings {
        return this.model;
    }
}
