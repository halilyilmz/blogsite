import { where } from "sequelize";
import  db  from "../models/index.js";

export const index= (req,res)=>{

    return res.render("admin_enter/admin_enter")
}

export const changeinformation = async (req, res) => {
    try {
        //gets last four content by ıd as records
        const id = parseInt(req.params.id, 10);
        
        let offsetnum = (id > 0) ? (id - 1) * 4 : 0; 
        
        const records = await db.content.findAll({
            offset: offsetnum,
            limit: 4, 
            order: [['content_id', 'DESC']], 
        });
        


        //gets pagination segments as pagination array
        let pagination={};
        let chosenpagination;

        const content = await db.content.count();
        pagination.paginationmax = Math.ceil(content / 4);

        if(id==1){
            if(pagination.paginationmax>3){
                pagination.paginationdots="...";
            }
            pagination.pagination1=1;
            pagination.pagination2=2;
            chosenpagination=1;
        }
        else if(id==2){
            if(pagination.paginationmax>3){
                pagination.paginationdots="...";
            }
            pagination.pagination1=1;
            pagination.pagination2=2;
            chosenpagination=2;
        }
        else if(id>2){
            if(id<pagination.paginationmax-3){
                pagination.paginationdots="...";
            }
            pagination.pagination1=id-1;
            pagination.pagination2=id;
            chosenpagination=2;
        }
        if(id==pagination.paginationmax){
            chosenpagination=3;
            pagination.pagination1=id-2;
            pagination.pagination2=id-1;
        }
        
        return res.render("change_information/eski", { records: records, pagination: pagination, chosenpagination: chosenpagination,id:id });
    } catch (error) {
        console.error(error); // Hata konsoluna yazdırılıyor
        return res.status(500).json({ message: "Veri alınırken hata oluştu." });
    }
};


export const changedetail=async (req,res)=>{
        const id = parseInt(req.params.id, 10);

        // Veritabanından içerik sorgula
        const wantedcontent = await db.content.findOne({ where: { content_id: id } });

    return res.render("change_detail/change_detail",{wantedcontent:wantedcontent,id:id})
}
export const addcontentpage=(req,res)=>{
    return res.render("add_content/add_content")
}

