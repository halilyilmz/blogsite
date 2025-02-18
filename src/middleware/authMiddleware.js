import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import session from "express-session";

dotenv.config();

const verifyAdmin = (req, res, next) => {

  if(req.session.user){
    next()
  }
  else{
    res.redirect("http://localhost:8000/admin")
  }
};

export default verifyAdmin;
