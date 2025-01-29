import { Sequelize } from "sequelize";
import { Database } from "../confic.js";

export const database = new Sequelize(
    Database.SCHEMANAME,
    Database.USER,
    Database.PASSWORD,
    {
        dialect: "mysql",
    }
);