import express from "express";
import cors from "cors";
import allrouters from "./src/routers/index.js";
import dotenv from "dotenv";
import verifyAdmin from "./src/middleware/authMiddleware.js";
import ejs from "ejs";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import session from "express-session";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcPath= path.dirname(path.dirname(__dirname));


const app = express();
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret:process.env.SECRET_key,
  resave: true,
  saveUninitialized:false,
}))

//Views
app.set('view engine', 'ejs');
app.set("views","./src/views");
app.use("/public", express.static(path.join(__dirname, "public"), { extensions: ["css","js","png","PNG","jpg","JPG"] }));

// Router
app.use("/", allrouters)


// Port Configuration
const PORT = process.env.PORT || 8000;

// Server Initialization
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});