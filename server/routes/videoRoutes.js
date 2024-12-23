import express from 'express';
import { uploadVideo, getAllVideos, getVideoById, deleteVideo, updateVideo, } from '../controllers/videoControllers.js';
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Video routes
router.post('/upload', protect, uploadVideo); // Upload video and thumbnail
router.get('/', getAllVideos); // Get all videos
router.get('/:id', getVideoById); // Get a video by ID
router.delete('/:id', protect, deleteVideo); // Delete video
router.put('/:id', protect, updateVideo); // Update video (and thumbnail if uploaded)

export default router;
