import mongoose from "mongoose";

const InteractionSchema = new mongoose.Schema({
    video: { type: mongoose.Schema.Types.ObjectId, ref: 'Video', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['like', 'dislike'], required: true },
},{timestamps:true});

export default mongoose.model('Interaction',InteractionSchema);