import express from "express";
import cors from "cors";
import router from "./src/routers/index.js";

const app = express();


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Views
app.set("views","./src/views");
app.set("view engine","ejs");
app.use(express.static("public"));


// Router
app.use("/", router)


// Port Configuration
const PORT = process.env.PORT || 8000;

// Server Initialization
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});