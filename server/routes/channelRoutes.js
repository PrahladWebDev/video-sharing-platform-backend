import { 
    createChannel, 
    editChannel, 
    deleteChannel, 
    toggleSubscription, 
    getUserChannels, 
    getSubscribedChannels, 
    getAllChannels
} from "../controllers/channelControllers.js";
import { protect } from "../middlewares/authMiddleware.js";
import express from "express";

const router = express.Router();

router.post('/', protect, createChannel);
router.get('/', protect, getAllChannels);
router.get('/owned', protect, getUserChannels); 
router.get('/subscribed', protect, getSubscribedChannels); 
router.put('/:id', protect, editChannel);
router.delete('/:id', protect, deleteChannel);
router.post('/subscribe/:id', protect, toggleSubscription);

export default router;
