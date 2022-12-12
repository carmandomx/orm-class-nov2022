"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodoById = exports.updateTodoById = exports.fetchTodoById = exports.createTodo = exports.listTodos = void 0;
const Todo_model_1 = require("../models/Todo.model");
// Create operation
const listTodos = (is_completed) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield Todo_model_1.Todo.findAll({
        attributes: ['id'],
        where: {
            is_completed: true
        }
    });
    return res;
});
exports.listTodos = listTodos;
const createTodo = (description) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTodo = yield Todo_model_1.Todo.create({
            description
        });
        return newTodo.id;
    }
    catch (error) {
        console.error(error);
    }
});
exports.createTodo = createTodo;
const fetchTodoById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundTodo = yield Todo_model_1.Todo.findByPk(id);
        return foundTodo;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.fetchTodoById = fetchTodoById;
const updateTodoById = (id, todoModel) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foo = yield Todo_model_1.Todo.update({
            description: todoModel.description,
            is_completed: todoModel.is_completed
        }, {
            where: {
                id: id // WHERE ID = 234
            }
        });
        return foo;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.updateTodoById = updateTodoById;
const deleteTodoById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foo = yield Todo_model_1.Todo.destroy({
            where: {
                id: id
            }
        });
        console.log(foo);
        return foo;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.deleteTodoById = deleteTodoById;
