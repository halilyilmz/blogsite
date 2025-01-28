import { Sequelize } from "sequelize";
import { tagModule } from "./tagModule.js";
import { contentModule } from "./contentModule.js";
import { Database } from "../confic.js";

const database = new Sequelize(
    Database.SCHEMANAME,
    Database.USER,
    Database.PASSWORD,
    {
        dialect: "mysql",
    }
);

database.authenticate()
    .then(()=>{
        console.log("authenticated...");
    })
    .catch((err)=>{
        console.log(err);
});

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
