import express from "express";
const router=express.Router();
const app = express();
import general_routers from "./general.js";
import admin_routers from "./admin.js";


app.use("/admin", admin_routers);
app.use("/homepage",general_routers);

export default router;