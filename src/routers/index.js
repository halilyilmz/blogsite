import express from "express";
const allrouters=express.Router();

import general_routers from "./general.js";
import admin_routers from "./admin.js";


allrouters.use("/admin", admin_routers);
allrouters.use("/homepage",general_routers);

export default allrouters;