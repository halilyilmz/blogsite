import multer from "multer";
import fs from "fs";

// Storage ayarları
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = "./public/images";
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath); // Eğer klasör yoksa oluştur
        }
        cb(null, uploadPath); // Dosyaları bu klasöre kaydet
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9); // Benzersiz bir dosya adı
        cb(null, uniqueSuffix + "-" + file.originalname);
    },
});

export const upload = multer({ storage: storage });
