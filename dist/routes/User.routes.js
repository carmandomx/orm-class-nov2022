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
exports.UserRouter = (0, express_1.Router)();
exports.UserRouter.post('/newUser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Info desde el body
    // Checar si falta info
    // Checar que el rol sea adecuado
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
