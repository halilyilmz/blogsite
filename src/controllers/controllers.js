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


