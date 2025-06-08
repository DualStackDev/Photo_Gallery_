// routes/photoRoutes.js
import express from 'express';
import {
  getCandidPhotos,
  getPhotosByFolder,
  uploadPhoto,
  getPhotoDetails,
  deletePhoto,
} from '../controllers/photoController.js';
import upload from '../utils/multer.js'; // Multer middleware for file uploads

const router = express.Router();

// Get candid photos for the main page
router.get('/candid', getCandidPhotos);

// Get photos by folder (e.g., "cats", "cars")
router.get('/folder/:folderName', getPhotosByFolder);

// Upload a photo (admin only)
router.post('/upload', upload.single('image'), uploadPhoto);

// Get details of a specific photo (for the dialog box)
router.get('/photo/:id', getPhotoDetails);

export default router;