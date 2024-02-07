//The Express.js framework for building web applications.



//path: A utility module for handling file paths.
//fileURLToPath: A utility function for converting file URLs to file paths.

import express from "express";
// A library for adding color to the console output.
import colors from "colors";
//dotenv: Loads environment variables from a .env file into process.env.
import dotenv from "dotenv";

import morgan from "morgan";
//A function to connect to the database, likely defined in the "db.js" file.
import connectDB from "./config/db.js";
///authRoutes, categoryRoutes, productRoutes: Modules that define routes for authentication, categories, and products.

import authRoutes from './routes/authRoutes.js';
//Middleware for enabling Cross-Origin Resource Sharing.
import cors from "cors";
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js';
import path from "path";
import { fileURLToPath } from 'url';

dotenv.config();

// Get the current module's URL and convert it to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB();


// Creates an Express application.
// Enables Cross-Origin Resource Sharing (CORS).
// Parses incoming JSON requests.
// Uses the morgan middleware for logging HTTP requests in development mode

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Serve static files from the 'client/build' directory
app.use(express.static(path.join(__dirname, 'client', 'build')));

//sets up routes for authentication, categories, and products.
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/products", productRoutes);






app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  const ENV_MODE = process.env.DEV_MODE || 'development';
  console.log(`Server Running on ${ENV_MODE} mode on port ${PORT}`.bgCyan.white);
});

