import express from "express";
import { getAllFolders } from "../controllers/folderController.js";

const router = express.Router();

// Get all folders
router.get("/", getAllFolders);

export default router;
