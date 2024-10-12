import mongoose from "mongoose";

const socialSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    images:[{
        type:String,
        default:""
    }],
},{timestamps:true});
export const Social = mongoose.model('Social', socialSchema);