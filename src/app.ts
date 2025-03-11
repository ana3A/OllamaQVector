import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import logger from "./utils/logger"; // Import the logger
import mainRouter from "./routers/index"; // Import the main router

dotenv.config();

//initialize qdrant


const app = express();
app.use(cors());
app.use(express.json());
app.use(logger); // Use the logger middleware

app.use("/api", mainRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
