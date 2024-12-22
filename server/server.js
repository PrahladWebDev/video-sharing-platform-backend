import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './db/config.js';
import userRoutes from "./routes/userRoutes.js";
import ChannelRoutes from "./routes/channelRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import interactionRoutes from "./routes/interactionRoutes.js";
import commentRoutes from './routes/commentRoutes.js';


const app = express();

dotenv.config();

app.use(express.json());
app.use(cookieParser()); // For parsing cookies

app.use('/api/user',userRoutes);
app.use('/api/channel',ChannelRoutes);
app.use('/api/video',videoRoutes);
app.use('/api/interaction',interactionRoutes);
app.use('/api/comment',commentRoutes);


connectDB();
const PORT = process.env.PORT || 4000;
app.listen(PORT,()=>console.log(`server is running on port ${PORT}`));