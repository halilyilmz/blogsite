import{addcontent}from "../controllers/controllers.js"
import { upload } from "../helpers/image_helper.js";
import { update } from "../controllers/controllers.js";


import express from "express";
let admin_routers=express.Router();

admin_routers.post("/update/:id",upload.single("imageUpload"),update);
admin_routers.post("/addcontent",upload.single("imageUpload"),addcontent);




export default admin_routers;