import express from 'express';
import {
    register,
    login,
    userProfile,
    logout,
    getAllUsers,
    updateCurrentUser,
    deleteUser,
    updateUserById
} from '../controllers/userController.js';
import { protect, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/profile', protect, userProfile);
router.post('/logout', protect, logout);
router.put('/profile', protect, updateCurrentUser); // Update the logged-in user's profile

// Admin-only routes
router.get('/users', protect, isAdmin, getAllUsers); // Get all users
router.put('/users/:id', protect, isAdmin, updateUserById); // Update any user's profile
router.delete('/users/:id', protect, isAdmin, deleteUser); // Delete a user by ID

export default router;
