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
exports.usersController = void 0;
const utils_1 = require("../utils/utils");
const data_1 = require("../data/data");
exports.usersController = {
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield (0, data_1.getUsersData)();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(users));
        });
    },
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = (0, utils_1.getUserIdFromUrl)(req.url);
            this.errHandlerUserId(id, res);
            const user = yield (0, data_1.getUserData)(id);
            if (user) {
                res.statusCode = 200;
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(user));
            }
            else {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: 'User does not exist' }));
            }
        });
    },
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = yield (0, utils_1.getRequestBody)(req);
            const bodyData = JSON.parse(body);
            this.errHandlerUserBody(bodyData, res);
            const newUser = yield (0, data_1.createUserData)(bodyData);
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify(newUser));
        });
    },
    updateUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    },
    deleteUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    },
    errHandlerUserId(id, res) {
        const uuidReg = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (!uuidReg.test(id)) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: 'User Id is invalid (not uuid)' }));
        }
    },
    errHandlerUserBody(userBody, res) {
        const isValidAge = userBody.age && typeof userBody.age === 'number';
        const isValidUsername = userBody.username && typeof userBody.username === 'string';
        const isValidHobbies = userBody.hobbies && Array.isArray(userBody.hobbies);
        if (!(isValidAge && isValidUsername && isValidHobbies && Object.keys(userBody).length === 3)) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: 'Invalid user data' }));
        }
    }
};
