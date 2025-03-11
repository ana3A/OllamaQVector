import morgan from "morgan";

/**
 * Logger middleware for Express, using Morgan for structured request logs.
 */
const logger = morgan(":method :url :status :res[content-length] - :response-time ms");

export default logger;
