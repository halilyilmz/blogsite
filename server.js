import express from "express";
import cors from "cors";
import allrouters from "./src/routers/index.js";
import dotenv from "dotenv";
import authRoutes from "./src/routers/auth.js";
import verifyAdmin from "./src/middleware/authMiddleware.js";

const app = express();
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Views
app.set("views","./src/views");
app.use(express.static("public"));

// Router
app.use("/", allrouters)
app.use("/auth", authRoutes);

app.get("/admin-panel", verifyAdmin, (req, res) => {
    res.json({ message: "Admin paneline hoş geldiniz!", user: req.user });
  });


// Port Configuration
const PORT = process.env.PORT || 8000;

// Server Initialization
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});