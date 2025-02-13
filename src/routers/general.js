import{ getcontentbyid,last4contentaccseptfirst,lastcontent,getmaxpage,last4mustread}from "../controllers/controllers.js"


import express from "express";
let general_routers=express.Router();


general_routers.get("/contentdetails/:id",getcontentbyid);
general_routers.get("/last4contentaccseptfirst",last4contentaccseptfirst)
general_routers.get("/lastcontent",lastcontent);
general_routers.get("/last4mustreadcontent",last4mustread);
general_routers.get("/maxpage",getmaxpage);

export default general_routers;