"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const A_model_1 = require("./A.model");
const B_model_1 = require("./B.model");
const setupAssocations = () => {
    A_model_1.Info.hasOne(B_model_1.Bar, { foreignKey: 'info_id' });
    B_model_1.Bar.belongsTo(A_model_1.Info, { foreignKey: 'info_id' });
};
exports.default = setupAssocations;
