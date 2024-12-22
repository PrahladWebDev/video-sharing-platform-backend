import mongoose from "mongoose";

const ChannelSchema = new mongoose.Schema({
    channelName:{
        type:String,
        required:true,
        unique:true,
    },
     channelDescription:{
        type:String,
        required:true,
     },

     owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
     },

     subscribers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
     }]

},{timestamps:true});

export default mongoose.model('Channel',ChannelSchema);