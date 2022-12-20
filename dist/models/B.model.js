"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initBarModel = exports.Bar = void 0;
const sequelize_1 = require("sequelize");
class Bar extends sequelize_1.Model {
}
exports.Bar = Bar;
const initBarModel = (sequelize) => {
    Bar.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        desc: sequelize_1.DataTypes.STRING
    }, {
        sequelize // Instance of sequelize that reflects the connection
    });
};
exports.initBarModel = initBarModel;
