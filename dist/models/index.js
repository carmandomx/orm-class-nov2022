"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startSequelize = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const Todo_model_1 = require("./Todo.model"); // Modelos
const URL_models_1 = require("./URL.models"); // Modelos
const models = [Todo_model_1.initTodoModel, URL_models_1.initUURLModel];
const startSequelize = (db_name, db_password, db_hostname, db_username) => {
    exports.sequelize = new sequelize_1.Sequelize(db_name, db_username, db_password, {
        dialect: 'postgres',
        host: db_hostname,
    });
    for (const initModel of models) {
        initModel(exports.sequelize);
    }
    return exports.sequelize;
};
exports.startSequelize = startSequelize;
