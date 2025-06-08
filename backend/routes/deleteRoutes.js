import express from 'express';
import { deleteByName } from '../controllers/deleteController.js';

const router = express.Router();

// Unified deletion endpoint
router.delete('/', deleteByName);

export default router;