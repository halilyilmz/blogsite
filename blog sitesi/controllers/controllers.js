import { db } from "../models/index.js";
import fs from 'fs';



export const addcontent = async (req, res) => {
    try {
        console.log(req.body)
        // İçerik için tag belirleme
        let tagforadding;

        if (req.body.tag === "Hair") {
            tagforadding = 1;
        } else if (req.body.tag === "Lifestyle") {
            tagforadding = 2;
        } else if (req.body.tag === "must_read") {
            tagforadding = 3;
        }

        const filePath = req.file.path; // Yüklenen dosyanın geçici yolu
        const extension = req.file.originalname.split(".").pop(); // Dosya uzantısını al (jpg, png, vb)

        if(extension !="PNG"&& extension != "JPEG"&& extension!="png"&&extension!="jpeg"){
                return res.status(400).json("only jpeg and png supported")
            }


        // İçeriği veritabanına kaydet
        const newContent = await db.content.create({
            note: req.body.note,
            content_text: req.body.content_text,
            title: req.body.title,
            content_inside_title: req.body.content_inside_title,
            tag_id: tagforadding,
            image_path:filePath
        });

        const contentId = newContent.content_id; // Yeni content_id veritabanından al

        res.status(200).json({ message: "Başarılı!", content_id: contentId });
    } catch (err) {
        console.log(err);
        res.status(500).json("Content couldn't be added");
    }
};




export const getcontentbyid = async (req, res) => {
    try {
        // Route parametresinden ID'yi al
        const id = req.params.id;

        // Eğer ID tanımlı değilse hata döndür
        if (!id) {
            return res.status(400).json({ message: "ID is required" });
        }

        // Veritabanından içerik sorgula
        const content = await db.content.findOne({ where: { content_id: id } });

        // Eğer içerik bulunamadıysa hata döndür
        if (!content) {
            return res.status(404).json({ message: "Content not found" });
        }

        // Görsel yolunu kontrol et ve Base64 formatına çevir
        if (content.image_path) {
            try {
                // Görseli Base64 formatına çevir
                const imageBuffer = fs.readFileSync(content.image_path); // Dosyayı oku
                const base64Image = imageBuffer.toString('base64'); // Base64'e çevir

                // Base64 string'i content nesnesine ekle
                content.dataValues.image = `data:image/${content.image_path.split('.').pop()};base64,${base64Image}`;
            } catch (err) {
                console.error('Görsel yüklenemedi:', err);
                return res.status(500).json({ message: "Image loading failed", error: err.message });
            }
        } else {
            content.dataValues.image = null; // Eğer görsel yoksa null döndür
        }

        // İçeriği döndür
        res.status(200).json(content);
    } catch (error) {
        // Genel hata yönetimi
        console.error(error);
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
};

export const update = async (req, res) => {
    try {

        console.log(req.body)
        // İçerik için tag belirleme
        let tagforadding;

        if (req.body.tag === "Hair") {
            tagforadding = 1;
        } else if (req.body.tag === "Lifestyle") {
            tagforadding = 2;
        } else if (req.body.tag === "must_read") {
            tagforadding = 3;
        }


        const contentId = req.params.id;

        // İçeriği veritabanına kaydet

        console.log(req.body.note)
        await db.content.update(
            { 
                note: req.body.note,
                content_text: req.body.content_text,
                title: req.body.title,
                content_inside_title: req.body.content_inside_title,
                tag_id: tagforadding,
             },
            { where: { content_id: contentId } }
        )

        
        if (req.file) {
            const directory = '../resimler'

            fs.readdir(directory, (err, files) => {
                files.forEach(file => {
                    if(file.split('.')[0] == `${contentId}`) fs.unlink( directory + file );       
                });
            });

            const oldPath = req.file.path; // Yüklenen dosyanın geçici yolu
            const extension = req.file.originalname.split(".").pop(); // Dosya uzantısını al (jpg, png, vb)

            if(extension !="PNG"&& extension != "JPEG"){
                    return res.status(400).json("only jpeg and png supported")
            }

            const newPath = `./resimler/${contentId}.${extension}`; // content_id ile dosya adını oluştur

            // Dosya adını değiştir (eski yolu yeni yola kopyala)
            fs.renameSync(oldPath, newPath);

            // Veritabanındaki içeriğe resmin yolunu kaydet
            await db.content.update(
                { image_path: newPath }, // Resim yolunu güncelle
                { where: { content_id: contentId } } // İlgili content_id'yi bul ve güncelle
            );
        }

        return res.status(200).json({ message: "Başarılı!" });
    } catch (err) {
        console.log(err);
        res.status(500).json("Content couldn't be updateted");
    }
};




export const last4content=async (req,res) => {
    try {
      const records = await db.content.findAll({
        order: [['content_id', 'DESC']], // created_at'ı azalan düzende sırala
        limit: 4, // Son 4 veriyi getir
      });
  
      res.status(200).json(records);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  export const getmaxpage = async (req, res) => {
    try {
      
      const content = await db.content.findOne({
        order: [['content_id', 'DESC']]
      });


      const maxcontent = content.content_id;
      const maxpage = Math.ceil(maxcontent / 4); 
  
      res.status(200).json({ maxpage });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred' });
    }
  };

  