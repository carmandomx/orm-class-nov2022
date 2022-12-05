"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Todo_routes_1 = require("./routes/Todo.routes");
const URL_routes_1 = require("./routes/URL.routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/todos', Todo_routes_1.TodoRouter);
app.use('/u', URL_routes_1.URLRouter);
app.get('/', (req, res) => {
    res.send('VIVEEEEEEEEEEE');
});
exports.default = app;
// A.P.I
