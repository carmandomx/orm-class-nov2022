"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initInfoModel = exports.Info = void 0;
const sequelize_1 = require("sequelize");
class Info extends sequelize_1.Model {
}
exports.Info = Info;
const initInfoModel = (sequelize) => {
    Info.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        text: sequelize_1.DataTypes.STRING
    }, {
        sequelize // Instance of sequelize that reflects the connection
    });
};
exports.initInfoModel = initInfoModel;
