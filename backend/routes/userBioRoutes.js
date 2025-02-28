import express from 'express';
import { getBio, updateBio } from '../controllers/bioController.js';

const router = express.Router();
// Get bio
router.get('/bio', getBio);

// Update bio
router.post('/bio', updateBio);

export default router;