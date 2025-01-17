import { Sequelize } from "sequelize";

const sequelize = new Sequelize("blogProject", "root", "naol1234", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
  // logging: console.log,
});

export { sequelize };
