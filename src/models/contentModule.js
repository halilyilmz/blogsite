import { type } from "os";
import { Sequelize,DataTypes } from "sequelize";

export const contentModule=(sequelize)=>{
    return sequelize.define("content",{
        content_id:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true,
        },
        note:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        content_text:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        title:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        content_inside_title:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        image_path:{
            type:DataTypes.STRING,
            allowNull:true
        },
        tag_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:"tags",
                key:"tag_id",
            },
        },
    },{
        timestamps:false
    })
};