# OllamaQVector - Vector Search API

## Overview
This project provides a vector search API built with **LangChain**, **Qdrant**, and **Ollama** for embedding-based retrieval. The API allows users to create collections, add documents, and perform similarity searches using vector embeddings.

## Setup and Installation

### Prerequisites
Ensure you have the following installed:
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Running the Project
1. Clone this repository:
   ```sh
   git clone <repository-url>
   cd <repository-folder>
   ```
2. Start the services using Docker Compose:
   ```sh
   docker-compose up -d --build
   ```
   This will initialize the following services:
   - **App** (Express server running the API)
   - **Qdrant** (Vector database for storage and retrieval)
   - **Ollama** (Embeddings model server)

3. **Pull the embedding model:**
   After the containers are running, you need to pull the required embedding model. Run:
   ```sh
   docker exec -it ollama ollama pull nomic-embed-text
   ```
   If using a different Ollama embedding model, update `embeddings.service.ts` with the correct model name and pull it using the same command.

## API Endpoints

### Collections
- **Create a collection**: `POST /collections/create`
- **List collections**: `GET /collections/list`
- **Delete a collection**: `DELETE /collections/:collectionName`
- **Get collection metadata**: `GET /collections/:collectionName/metadata`

### Documents
- **Add a document**: `POST /documents/add`
- **Add multiple documents**: `POST /documents/add-multiple`
- **Delete a document**: `DELETE /documents/:collectionName/:documentId`
- **Update a document**: `PUT /documents/update`

### Search
- **Perform similarity search**: `POST /search/search`

## Environment Variables
| Variable        | Default Value                 | Description |
|----------------|-----------------------------|-------------|
| `PORT`         | `3000`                        | API server port |
| `QDRANT_HOST`  | `http://qdrant:6333`         | Qdrant service URL |
| `OLLAMA_URL`   | `http://ollama:11434`        | Ollama service URL |

## Project Structure
```
├── controllers/
├── routes/
│   ├── collection.router.ts
│   ├── document.router.ts
│   ├── search.router.ts
├── services/
│   ├── document.service.ts
│   ├── embeddings.service.ts
│   ├── qdrant.service.ts
│   ├── vectorStore.service.ts
├── Dockerfile
├── docker-compose.yaml
└── README.md
```

## Stopping the Services
To stop the running containers, execute:
```sh
docker-compose down
```

## Notes
- The `ollama pull` command must be run **after** the container is initialized for the first time.
- If using a different embedding model, ensure you modify the `EmbeddingService` class in `embeddings.service.ts` to reflect the correct model name.

## License
MIT License

