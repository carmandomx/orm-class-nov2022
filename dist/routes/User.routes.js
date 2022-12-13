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
exports.UserRouter = void 0;
const express_1 = require("express");
const firebase_1 = require("../firebase");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const isAuthorized_1 = require("../middlewares/isAuthorized");
exports.UserRouter = (0, express_1.Router)();
// Este endpoint debe poder ser llamado por todo el mundo
exports.UserRouter.post('/newUser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { displayName, email, password } = req.body;
    if (!displayName || !email || !password) {
        return res.status(400).send({ error: 'Missing fields' });
    }
    try {
        const userId = yield (0, firebase_1.createUser)(displayName, email, password, 'patient');
        res.status(201).send({
            userId
        });
    }
    catch (error) {
        res.status(500).send({ error: 'something went wrong' });
    }
}));
// Debe solo poder ser llamado por el rol de admin y el usuario dueño de este recurso
exports.UserRouter.get('/:userId', isAuthenticated_1.isAuthenticated, (0, isAuthorized_1.isAuthorized)({ roles: ['admin'], allowSamerUser: true }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Dos formas de obtener el userId
    const { userId } = req.params;
    // 2da forma
    const { uid } = res.locals;
    try {
        const user = yield (0, firebase_1.readUser)(userId);
        return res.status(200).send(user);
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'something went wrong' });
    }
}));
