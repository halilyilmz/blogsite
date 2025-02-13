import express  from "express" ;
import jwt from"jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Örnek bir admin kullanıcı
const adminUser = {
  username: "admin",
  password: bcrypt.hashSync("admin123", 10), // Şifreyi hashleyerek saklıyoruz
};

// Giriş yapma (Login) endpointi
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username !== adminUser.username) {
    return res.status(401).json({ message: "Geçersiz kullanıcı adı veya şifre!" });
  }

  // Şifreyi doğrula
  const isPasswordValid = bcrypt.compareSync(password, adminUser.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Geçersiz kullanıcı adı veya şifre!" });
  }

  // JWT token oluştur
  const token = jwt.sign({ username: adminUser.username, role: "admin" }, process.env.JWT_SECRET, {
    expiresIn: "1h", // Tokenin süresi 1 saat olacak
  });

  res.json({ token });
});

export default router;
