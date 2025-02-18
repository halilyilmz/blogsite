import { Sequelize } from "sequelize";
import { Database } from "../../config.js";

import { tagModule } from "../models/tagModule.js";
import { contentModule } from "../models/contentModule.js";
import { adminModule } from "../models/adminModule.js";

const database = new Sequelize(
    Database.SCHEMANAME,
    Database.USER,
    Database.PASSWORD,
    {
        dialect: "mysql",
    }
);

const admin=adminModule(database)
const tag = tagModule(database);
const content = contentModule(database);
console.log(admin);


export const db={};
db.Sequelize = Sequelize;
db.database = database;

content.hasMany(tag,{foreignKey:"tag_id"});
tag.belongsTo(content, { foreignKey: "tag_id" });


db.tag = tag;
db.content=content;
db.admin=admin;

db.database.sync({ force: false })
    .then(() => {
        console.log("synced!");
    })
    .catch((err) => {
        console.log(err);
    }
);
