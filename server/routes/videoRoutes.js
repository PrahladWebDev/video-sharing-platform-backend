import express from 'express';
import { uploadVideo, getAllVideos, getVideoById, deleteVideo, updateVideo } from "../controllers/videoControllers.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/', protect, uploadVideo);
router.get('/', protect, getAllVideos);
router.get('/:id', protect, getVideoById);
router.delete('/:id', protect, deleteVideo);  
router.put('/:id', protect, updateVideo);    

export default router;
