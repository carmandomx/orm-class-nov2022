"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initUURLModel = exports.UURL = void 0;
const sequelize_1 = require("sequelize");
class UURL extends sequelize_1.Model {
    getId() {
        return this.id;
    }
}
exports.UURL = UURL;
const initUURLModel = (sequelize) => {
    UURL.init({
        id: {
            type: sequelize_1.DataTypes.STRING,
            primaryKey: true
        },
        origUrl: sequelize_1.DataTypes.STRING
    }, {
        sequelize // Instance of sequelize that reflects the connection
    });
};
exports.initUURLModel = initUURLModel;
