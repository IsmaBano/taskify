import { Social } from "../models/social.model.js";
import mongoose from "mongoose";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";

export const deleteImage = async (req, res) => {
    try {
        console.log("Reaching deleteImage function");
     
        
        const { imageUrl } = req.body; // This should now correctly pull the imageUrl
      

        const social = await Social.findById(req.params.id);
        if (!social) {
            return res.status(404).json({
                message: "Social media profile not found.",
                success: false
            });
        }

        const imageIndex = social.images.indexOf(imageUrl);
        if (imageIndex === -1) {
            return res.status(400).json({
                message: "Image not found in social profile.",
                success: false
            });
        }

        social.images.splice(imageIndex, 1);
        const publicId = imageUrl.split('/').pop().split('.')[0]; 
        await cloudinary.uploader.destroy(publicId); 

        await social.save();
        let userId=social.userId;
        let user = await User.findById(userId).populate({path:'social'});
        return res.status(200).json({
            message: "Image deleted successfully.",
            user,
            success: true
        });
    } catch (error) {
        console.error("Error in deleteImage function:", error); // Log any errors
        return res.status(500).json({
            message: "Server error. Please try again later.",
            success: false
        });
    }
};




export const updateImage = async (req, res) => {
    try {
        const file = req.file; 
        const { id } = req.params; 

      

        // Check if the file exists
        if (!file) {
            return res.status(400).json({
                message: "No file uploaded.",
                success: false
            });
        }

        // Validate the ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid ID format.",
                success: false
            });
        }

        
        const socialId = new mongoose.Types.ObjectId(id); 
      

        // 
        const fileUri = getDataUri(file);
    

        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        

        const imageUrl = cloudResponse.secure_url; 

        const social = await Social.findById(socialId);
        if (!social) {
            return res.status(404).json({
                message: "Social media profile not found.",
                success: false
            });
        }

        social.images.push(imageUrl);
        await social.save(); 
        let userId=social.userId;
        let user = await User.findById(userId).populate({path:'social'});
        return res.status(200).json({
            message: "Image added successfully.",
            user,
            success: true
        });

    } catch (error) {
        console.error("Error in updateImage:", error); // Log the error
        return res.status(500).json({
            message: "Server error. Please try again later.",
            success: false
        });
    }
};
