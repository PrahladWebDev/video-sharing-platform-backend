import {toggleStatus} from "../controllers/interactionControllers.js";
import express from 'express';
import { protect } from "../middlewares/authMiddleware.js";

const router  = express.Router();

router.post('/',protect,toggleStatus);

export default router;