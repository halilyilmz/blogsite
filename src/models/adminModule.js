
import { Sequelize,DataTypes } from "sequelize";

export const adminModule=(sequelize)=>{
    return sequelize.define("admin",{
        id:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true,
        },
        admin_name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        admin_password:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },{
        timestamps:false
    })
};