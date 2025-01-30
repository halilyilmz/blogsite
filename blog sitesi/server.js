import express from "express";
import cors from "cors";

import  admin_routers  from "./routers/admin.js";
import general_routers from "./routers/general.js";


// App Initialization
const app = express();



// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routers

app.use("/admin", admin_routers);
app.use("/homepage",general_routers);

// Testing API
app.get("/", (req, res) => {
    res.json({ message: "Hello World" });
});

// Port Configuration
const PORT = process.env.PORT || 8000;

// Server Initialization
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
