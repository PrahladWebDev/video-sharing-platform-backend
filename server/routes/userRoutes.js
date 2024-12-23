import express from 'express';
import {
    register,
    login,
    userProfile,
    logout,
    updateAvatar,
    getAllUsers,
    updateCurrentUser,
    deleteUser,
    updateUserById,
} from '../controllers/userController.js';
import { protect, isAdmin } from "../middlewares/authMiddleware.js";
import upload from "../utils/multerConfig.js"; 

const router = express.Router();

router.post('/register', register);
router.post('/login', login);


router.get('/profile', protect, userProfile);
router.post('/logout', protect, logout);
router.put('/profile', protect, updateCurrentUser); 

// Admin-only routes
router.get('/users', protect, isAdmin, getAllUsers); 
router.put('/users/:id', protect, isAdmin, updateUserById); 
router.delete('/users/:id', protect, isAdmin, deleteUser); 

router.patch("/user/avatar", protect, upload.single("avatar"), updateAvatar);

export default router;
