import { Sequelize,DataTypes } from "sequelize";

export const tagModule=(sequelize)=>{
    return sequelize.define("tag",{
        tag_id:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true,
        },
        tag_name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
    },
    {
        timestamps:false
    }
)}