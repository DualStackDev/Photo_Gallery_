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
  "https://photogallery-eosin-ten.vercel.app/",
  "https://photodisplay-tau.vercel.app/",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
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
