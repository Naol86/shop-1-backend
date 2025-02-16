"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize("blogProject", "root", "naol1234", {
    host: "localhost",
    dialect: "mysql",
    port: 3306,
    // logging: console.log,
});
exports.sequelize = sequelize;
