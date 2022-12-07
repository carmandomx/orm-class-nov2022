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
exports.URLRouter = void 0;
const express_1 = require("express");
const URL_repo_1 = require("../repository/URL.repo");
const uuid_1 = require("uuid");
exports.URLRouter = (0, express_1.Router)();
exports.URLRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uurl = req.body.origUrl;
    if (!uurl) {
        res.status(400);
        return res.send({
            message: 'No url'
        });
    }
    // Si tengo mi url
    // Debo crear un nuevo URL y guardarlo a la DB
    // pero primero creo el id unico
    const newId = (0, uuid_1.v4)().split('-')[0];
    const newURLId = yield (0, URL_repo_1.createURL)(newId, uurl);
    res.status(201);
    res.send({
        newURL: 'http://' + process.env.DB_HOSTNAME + '/' + newURLId,
    });
}));
exports.URLRouter.get('/:uuid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uuid = req.params['uuid'];
    if (!uuid) {
        return res.status(400).send({
            error: 'No ID provided'
        });
    }
    const Url = yield (0, URL_repo_1.fetchUrlById)(uuid);
    if (!Url) {
        res.status(400);
        return res.send({
            error: 'No URL with this ID was found'
        });
    }
    return res.redirect(Url);
}));
