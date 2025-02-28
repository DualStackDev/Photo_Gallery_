import express from 'express';
import { uploadPhoto, deletePhoto, getAllPhotos } from '../controllers/photoController.js';
import upload from '../utils/multer.js'; // Import Multer middleware

const router = express.Router();

// Use Multer middleware for file upload
router.post('/uploadphoto', upload.single('image'), uploadPhoto); // 'image' is the field name
router.get('/photos', getAllPhotos);
router.delete('/photos/:id', deletePhoto);

export default router;