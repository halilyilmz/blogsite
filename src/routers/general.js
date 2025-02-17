import { index,contentpage } from "../controllers/homeControllers.js";

import express from "express";
let general_routers=express.Router();

general_routers.get("/",index);
general_routers.get("/contentpage/:id",contentpage)


export default general_routers;