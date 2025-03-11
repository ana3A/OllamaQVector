const axios = require("axios");
const { DirectoryLoader } = require("langchain/document_loaders/fs/directory"); // Load all files in a directory
const { JSONLoader, JSONLinesLoader } = require("langchain/document_loaders/fs/json");
const { TextLoader } = require("langchain/document_loaders/fs/text");

const BASE_URL = "http://localhost:3000/api";
const COLLECTION_NAME = "test_collection";
const VECTOR_SIZE = 768; // Adjust based on embedding model
const FOLDER_PATH = "test/test_documents"; // Change to your folder path

// Function to load documents from a folder
const loadDocumentsFromFolder = async (folderPath) => {
    try {
        console.log(`📂 Attempting to load documents from: ${folderPath}`);
        const loader = new DirectoryLoader(folderPath, {
            ".json": (path) => new JSONLoader(path, "/texts"),
            ".jsonl": (path) => new JSONLinesLoader(path, "/html"),
            ".txt": (path) => new TextLoader(path),
        });

        const docs = await loader.load();
        console.log(`✅ Successfully loaded ${docs.length} documents.`);

        return docs
    } catch (error) {
        console.error(`❌ Error loading documents from folder "${folderPath}":`, error.message);
        return []; // Return an empty array to avoid breaking the program
    }
};

const testAPI = async () => {
    try {
        console.log("🛠️  Creating Collection...");
        await axios.post(`${BASE_URL}/collections/create`, {
            collectionName: COLLECTION_NAME,
            vectorSize: VECTOR_SIZE,
            distanceMetric: "Cosine"
        });
        console.log("✅ Collection created!");

        console.log("📂 Loading Documents from Folder...");
        const documents = await loadDocumentsFromFolder(FOLDER_PATH);
        console.log(`📜 Loaded ${documents.length} documents from "${FOLDER_PATH}".`);

        console.log("📄 Adding Documents...");
        await axios.post(`${BASE_URL}/documents/add-multiple`, {
            collectionName: COLLECTION_NAME,
            documents: documents.map((doc) => ({ text: doc.pageContent, metadata: doc.metadata }))
        });
        console.log("✅ Documents added!");

        console.log("🔍 Searching for Documents...");
        const searchResponse = await axios.post(`${BASE_URL}/search/search`, {
            collectionName: COLLECTION_NAME,
            query: "AI",
            topK: 3
        });

        console.log("🔎 Search Results:", searchResponse.data);
    } catch (error) {
        console.error("❌ Error:", error.response?.data || error.message);
    }
};

testAPI();
