import{addcontent}from "../controllers/controllers.js"
import { upload } from "../helpers/image_helper.js";
import { update } from "../controllers/controllers.js";
import { last4contentaccseptfirst } from "../controllers/controllers.js";
import { last4contentbyid } from "../controllers/controllers.js";
import verifyAdmin from "../middleware/authMiddleware.js";
import { index ,changeinformation,changedetail,addcontentpage } from "../controllers/adminControllers.js";

import express from "express";
let admin_routers=express.Router();

admin_routers.get("/",index);
admin_routers.get("/change_information",changeinformation)
admin_routers.get("/change_detail",changedetail)
admin_routers.get("/add_content_page",addcontentpage)

admin_routers.post("/update/:id",upload.single("imageUpload"),update);
admin_routers.post("/addcontent",upload.single("imageUpload"),addcontent);
admin_routers.get("/getlastcontents",verifyAdmin,last4contentaccseptfirst);
admin_routers.get("/getcontentswithid/:id",verifyAdmin,last4contentbyid);


export default admin_routers;