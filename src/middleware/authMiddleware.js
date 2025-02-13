import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const verifyAdmin = (req, res, next) => {
  const token = req.headers["authorization"];

  console.log(token)

  if (!token) {
    return res.status(403).json({ message: "Token gerekli!" });
  }

  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Geçersiz veya süresi dolmuş token!" });
    }

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Yetkisiz erişim!" });
    }

    req.user = decoded; // Token bilgilerini request objesine ekleyelim
    next();
  });
};

export default verifyAdmin;
