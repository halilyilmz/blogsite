import{addcontent}from "../controllers/controllers.js"
import { upload } from "../helpers/image_helper.js";
import { update } from "../controllers/controllers.js";
import { last4contentaccseptfirst } from "../controllers/controllers.js";
import { last4contentbyid } from "../controllers/controllers.js";
import verifyAdmin from "../middleware/authMiddleware.js";

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcPath= path.dirname(path.dirname(__dirname));

import express from "express";
let admin_routers=express.Router();

admin_routers.post("/update/:id",upload.single("imageUpload"),update);
admin_routers.post("/addcontent",upload.single("imageUpload"),addcontent);
admin_routers.get("/getlastcontents",verifyAdmin,last4contentaccseptfirst);
admin_routers.get("/getcontentswithid/:id",verifyAdmin,last4contentbyid);

admin_routers.get('/addcontentpage', verifyAdmin,function(req, res, next) {res.redirect('/views/add_content/add_content.html');});
admin_routers.get('/changecontents',verifyAdmin,function(req, res, next) {res.redirect('/views/change_information/change_information.html');});
admin_routers.get('/login', function(req, res, next) {res.redirect('/views/admin_enter/admin_enter.html');});
  

export default admin_routers;