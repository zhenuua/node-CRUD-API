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
exports.createUserData = exports.getUserData = exports.getUsersData = void 0;
const node_crypto_1 = require("node:crypto");
const store = {
    users: [
        {
            id: '6c72ede2-8d08-44fd-ae75-f07f8fc9b3cc',
            username: 'user1',
            age: 1,
            hobbies: ['hobby-1', 'hobby-2'],
        }
    ]
};
const getUsersData = () => __awaiter(void 0, void 0, void 0, function* () { return yield new Promise((resolve) => resolve(store.users)); });
exports.getUsersData = getUsersData;
const getUserData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield new Promise((resolve, reject) => {
        const user = store.users.find((user) => user.id === id);
        user ? resolve(user) : reject();
    }).catch((err) => { });
});
exports.getUserData = getUserData;
const createUserData = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield new Promise((resolve) => {
        const newUser = Object.assign({ id: (0, node_crypto_1.randomUUID)() }, data);
        store.users.push(newUser);
        resolve(newUser);
    });
});
exports.createUserData = createUserData;
