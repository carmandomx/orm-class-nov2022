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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("../../app"));
const models_1 = require("../../models");
const Todo_repo_1 = require("../../repository/Todo.repo");
const supertest_1 = __importDefault(require("supertest"));
const configDBs_1 = __importDefault(require("../../models/configDBs"));
describe('Todo rutes', () => {
    let testDB;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        testDB = (0, models_1.startSequelize)(configDBs_1.default.test.database, configDBs_1.default.test.passwd, configDBs_1.default.test.host, configDBs_1.default.test.username);
        yield testDB.sync({ force: true, logging: false });
        yield (0, Todo_repo_1.createTodo)('Test for GET');
        yield (0, Todo_repo_1.createTodo)('Test for PUT');
        yield (0, Todo_repo_1.createTodo)('Test for DELETE');
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield testDB.close();
    }));
    it('[POST] /todos - should return 201 after its creation', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/todos')
            .send({ description: 'Unit testing with Jest and Supertest ;)' });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual({
            id: 4
        });
    }));
    it('[POST] /todos - should return 400 after receiving incorrect body', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/todos')
            .send({});
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({
            message: 'No description'
        });
    }));
    it('[GET] /:todoId - should return 200 and the found entity', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .get('/todos/1')
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id', 1);
        expect(res.body).toHaveProperty('description', 'Test for GET');
        expect(res.body).toHaveProperty('is_completed', false);
        expect(res.body).toHaveProperty('createdAt');
        expect(res.body).toHaveProperty('updatedAt');
    }));
    it('[GET] /:todoId - should return 400 if the id is out of range', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .get('/todos/0')
            .send();
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({
            error: 'Invalid id'
        });
    }));
    it('[GET] /:todoId - should return 400 if the todo with that Id is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .get('/todos/234')
            .send();
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({
            error: 'Todo not found.'
        });
    }));
    it('[PUT] /:todoId - should return 201 if the update goes through', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .put('/todos/2')
            .send({
            id: 2,
            description: 'Test for PUT - updated',
            is_completed: true
        });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('id', 2);
        expect(res.body).toHaveProperty('description', 'Test for PUT - updated');
        expect(res.body).toHaveProperty('is_completed', true);
        expect(res.body).toHaveProperty('updatedAt');
        expect(res.body).toHaveProperty('createdAt');
    }));
    it('[PUT] /:todoId - should return 400 if the id is out of range', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .put('/todos/0')
            .send({});
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({
            error: 'Invalid id'
        });
    }));
    it('[PUT] /:todoId - should return 400 if todo is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .put('/todos/234')
            .send({
            id: 2,
            description: 'Test for PUT - updated',
            is_completed: true
        });
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({
            error: 'Update failed'
        });
    }));
    it('[DELETE] /:todoId - should return status 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .delete('/todos/3')
            .send();
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({});
    }));
});
