import express from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import routes from "./routes.js";

const app = express();

/**
 * Security Middlewares
 */
app.use(helmet());

/**
 * Performance Middlewares
 */
app.use(compression());

/**
 * CORS
 */
app.use(cors());

/**
 * Logging
 */
app.use(morgan("dev"));

/**
 * Body Parsers
 */
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/v1", routes);

export default app;