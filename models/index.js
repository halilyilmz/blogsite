import { Sequelize } from "sequelize";
import { tagModule } from "./tagModule.js";
import { contentModule } from "./contentModule.js";
import { database } from "../utils/db.js";

const tag = tagModule(database);
const content = contentModule(database);

export const db={};
db.Sequelize = Sequelize;
db.database = database;

content.hasMany(tag,{foreignKey:"tag_id"});
tag.belongsTo(content, { foreignKey: "tag_id" });


db.tag = tag;
db.content=content;

db.database.sync({ force: false })
    .then(() => {
        console.log("synced!");
    })
    .catch((err) => {
        console.log(err);
    }
);
