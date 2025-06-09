import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import photoRoutes from "./routes/photoRoutes.js";
import folderRoutes from "./routes/folderRoutes.js";
import deleteRoutes from "./routes/deleteRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import { connectDb } from "./db/connectDatabase.js";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

// Define allowed frontend URLs
const allowedOrigins = [
  process.env.CLIENT_URL_UPLOAD, // URL for the upload frontend
  process.env.CLIENT_URL_DISPLAY, // URL for the display frontend
];

// Configure CORS
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (e.g., mobile apps, Postman)
      if (!origin) return callback(null, true);

      // Check if the origin is in the allowed list
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.json());

app.use("/api/gallery", photoRoutes);
app.use("/api/folders", folderRoutes);
app.use("/api/delete", deleteRoutes);
app.use("/api/contact", contactRoutes);
app.get("/api/health", (req, res) => res.sendStatus(200));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDb();
});
