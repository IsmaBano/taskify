import express from "express";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";
import { deleteImage, updateImage } from "../controllers/social.controller.js";
 
const router = express.Router();

router.route("/delete/:id").post(singleUpload,deleteImage);
router.route("/update/:id").post(isAuthenticated,singleUpload,updateImage);

export default router;