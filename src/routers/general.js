import{ getcontentbyid,last4content,getmaxpage}from "../controllers/controllers.js"


import express from "express";
let general_routers=express.Router();


general_routers.get("/contentdetails/:id",getcontentbyid);
general_routers.get("/last4content",last4content)
general_routers.get("/maxpage",getmaxpage);

export default general_routers;