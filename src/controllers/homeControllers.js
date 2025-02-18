
import  db  from "../models/index.js";
import { Sequelize } from "sequelize";

export const index=async (req, res) => {
    try {
        //last content
        const lastcontent = await db.content.findOne({
            order:[['content_id', 'DESC']],
        });
        //lastfourcontentaccseptfirst
        const lastfourcontentaccseptfirst = await db.content.findAll({
                offset:1,
                order: [['content_id', 'DESC']], // created_at'ı azalan düzende sırala
                limit: 4, // Son 4 veriyi getir
                where:{
                    tag_id:{ [Sequelize.Op.or]: [1, 2] } 
                }
              });
        //lastfourmustreadcontent
         const lastfourmustreadcontent = await db.content.findAll({
                    order:[['content_id', 'DESC']],
                    limit:4,
                    where:{tag_id:3}
                });

        return res.render("homepage/homepage",{topcontent:lastcontent,lastfourcontentaccseptfirst:lastfourcontentaccseptfirst,rightfourcontent:lastfourmustreadcontent})
    } catch (error) {
        console.error(error); // Hata konsoluna yazdırılıyor
        return res.status(500).json({ message: "Veri alınırken hata oluştu." });
    }
};

export const contentpage=async (req,res)=>{
    try{
    const id = parseInt(req.params.id, 10);
    

    const wantedcontent = await db.content.findOne({ where: { content_id: id } });
    
    return res.render("detail_page/detailpage",{wantedcontent:wantedcontent});
    }
    catch(err){
        console.error(err); // Hata konsoluna yazdırılıyor
        return res.status(500).json({ message: "Veri alınırken hata oluştu." });
    }
}