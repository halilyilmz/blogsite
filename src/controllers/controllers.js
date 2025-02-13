import { where } from "sequelize";
import  db  from "../models/index.js";
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

        let image_path_cropped= filePath.substring(14,filePath.length);
        image_path_cropped="images/"+image_path_cropped;
        console.log(image_path_cropped);

        // İçeriği veritabanına kaydet
        const newContent = await db.content.create({
            note: req.body.note,
            content_text: req.body.content_text,
            title: req.body.title,
            content_inside_title: req.body.content_inside_title,
            tag_id: tagforadding,
            image_path:image_path_cropped
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


        return res.status(200).json({ message: "Başarılı!" });
    } catch (err) {
        console.log(err);
        res.status(500).json("Content couldn't be updateted");
    }
};




export const last4contentaccseptfirst=async (req,res) => {
    try {
      const records = await db.content.findAll({
        offset:1,
        order: [['content_id', 'DESC']], // created_at'ı azalan düzende sırala
        limit: 4, // Son 4 veriyi getir
        where:{
            tag_id:1,
            tag_id:2
        }
      });
  
      res.status(200).json(records);
    } catch (error) {
        res.status(500).json("Content couldn't be founded");
    }
 };


 export const last4contentbyid=async (req,res) => {
    try {
        
        const id = req.params.id * 4;
        let offetnum;

        if(id==0){
            offetnum=0;
        }else{
            offetnum=id-1;
        }


        const records = await db.content.findAll({
            offset: offetnum,
            limit: 4, // Son 4 veriyi getir
            order: [['content_id', 'DESC']], // created_at'ı azalan düzende sırala
        });
    
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json("Contents couldn't be founded");
    }
 };


  export const getmaxpage = async (req, res) => {
    try {
      
      const content = await db.content.count();
      const maxpage = Math.ceil(content / 4);

      res.status(200).json({ maxpage });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred' });
    }
  };

  export const lastcontent=async(req,res)=>{
    try{
        const content = await db.content.findOne({
            order:[['content_id', 'DESC']],
        });

        res.status(200).json({content});
    }
    catch{
        res.status(500).json("an error occured");
    }
  }


  export const last4mustread= async(req,res)=>{
    try{
        const content = await db.content.findAll({
            order:[['content_id', 'DESC']],
            limit:4,
            where:{tag_id:3}
        });

        res.status(200).json({content});
    }
    catch{
        res.status(500).json("an error occured");
    }
  }