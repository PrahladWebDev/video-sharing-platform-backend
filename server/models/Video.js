import mongoose, { model } from 'mongoose';

const VideoSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },

    description:{
        type:String,
        required:true,
    },

    thumbnail:{
        type:String,
    },

    videoUrl:{
        type:String,
    },

    tags:[{
        type:String,
    }],

    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },

    channel:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Channel',
        required:true,
    },

    category:{
        type:[String],
        required:true,
    },

    views:{
        type:Number,
        default:0,
    },

    viewers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // To track which users have viewed the video
    }],
},{timestamps:true});

export default mongoose.model('Video',VideoSchema);