"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startSequelize = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const Todo_model_1 = require("./Todo.model"); // Modelos
const URL_model_1 = require("./URL.model");
const A_model_1 = require("./A.model");
const B_model_1 = require("./B.model");
const associations_1 = __importDefault(require("./associations"));
const models = [Todo_model_1.initTodoModel, URL_model_1.initURLModel, A_model_1.initInfoModel, B_model_1.initBarModel,];
const startSequelize = (db_name, db_password, db_hostname, db_username) => {
    exports.sequelize = new sequelize_1.Sequelize(db_name, db_username, db_password, {
        dialect: 'postgres',
        host: db_hostname,
    });
    for (const initModel of models) {
        initModel(exports.sequelize);
    }
    // one-to-one
    (0, associations_1.default)();
    // Info.setBar()
    return exports.sequelize;
};
exports.startSequelize = startSequelize;
