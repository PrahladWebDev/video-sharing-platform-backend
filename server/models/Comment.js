import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    video:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Video',
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    content:{
        type:String,
    },
});

export default mongoose.model('Comment',CommentSchema);