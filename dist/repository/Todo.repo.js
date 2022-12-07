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
exports.deleteTodobyId = exports.updateTodoById = exports.fetchTodoById = exports.createTodo = void 0;
const Todo_model_1 = require("../models/Todo.model");
// Create operation
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
//fetchTodoById
const fetchTodoById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fetchTodo = yield Todo_model_1.Todo.findByPk(id);
        return fetchTodo;
    }
    catch (error) {
        console.log(error);
    }
});
exports.fetchTodoById = fetchTodoById;
// Update
const updateTodoById = (id, todoModel) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateTodo = yield Todo_model_1.Todo.update({
            description: todoModel.description,
            is_completed: todoModel.is_completed
        }, {
            where: {
                id: todoModel.id
            }
        });
        return updateTodo;
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateTodoById = updateTodoById;
//Delete
const deleteTodobyId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteTodo = yield Todo_model_1.Todo.destroy({
            where: {
                id: id
            }
        });
        return deleteTodo;
    }
    catch (err) {
        console.log(err);
        return null;
    }
});
exports.deleteTodobyId = deleteTodobyId;
