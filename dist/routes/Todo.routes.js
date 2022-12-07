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
exports.TodoRouter = void 0;
const express_1 = require("express");
const Todo_repo_1 = require("../repository/Todo.repo");
exports.TodoRouter = (0, express_1.Router)();
exports.TodoRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const description = req.body.description;
    if (!description) {
        res.status(400);
        return res.send({
            message: 'No description'
        });
    }
    // Si tengo mi description
    // Debo crear un nuevo TODO y guardarlo a la DB
    const newTodoId = yield (0, Todo_repo_1.createTodo)(description);
    res.status(201);
    res.send({
        id: newTodoId
    });
}));
// Read
exports.TodoRouter.get('/:todoId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todoId = Number(req.params['todoId']);
    if (todoId <= 0) {
        res.status(404);
        return res.send({
            error: 'Invalid Id'
        });
    }
    const foundTodo = yield (0, Todo_repo_1.fetchTodoById)(todoId);
    if (!foundTodo) {
        res.status(400);
        return res.send({
            error: 'Todo not found.'
        });
    }
    res.status(200);
    return res.send(foundTodo.dataValues);
}));
//Update
exports.TodoRouter.post('/:todoId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todoId = Number(req.params['todoId']);
    const body = req.body;
    if (todoId <= 0) {
        res.status(404);
        return res.send({
            error: 'Invalid Id'
        });
    }
    const affectedrows = yield (0, Todo_repo_1.updateTodoById)(todoId, body);
    if (!affectedrows) {
        res.status(400);
        return res.send({
            error: 'Something went wrong.'
        });
    }
    if (affectedrows[0] === 0) {
        res.status(400);
        return res.send({
            error: 'Update failed.'
        });
    }
    const foundTodo = yield (0, Todo_repo_1.fetchTodoById)(todoId);
    res.status(200);
    return res.send(foundTodo);
}));
// Delete
exports.TodoRouter.delete('/:deleteId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todoId = Number(req.params['deleteId']);
    if (todoId <= 0) {
        res.status(404);
        return res.send({
            error: 'Invalid Id'
        });
    }
    const deleteTodo = yield (0, Todo_repo_1.deleteTodobyId)(todoId);
    if (!deleteTodo) {
        res.status(400);
        return res.send({
            error: 'Cannot failed.'
        });
    }
    return res.sendStatus(200);
}));
