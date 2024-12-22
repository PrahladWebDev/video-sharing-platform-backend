import express from 'express'
import { protect } from '../middlewares/authMiddleware.js';
import {
  addComment,
  getComments,
} from '../controllers/commentControllers.js';

const router = express.Router();

router.post('/', protect, addComment);
router.get('/:videoId', getComments);

export default router;
