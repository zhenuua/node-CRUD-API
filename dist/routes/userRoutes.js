"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const usersController_1 = require("../controllers/usersController");
exports.routes = [
    {
        method: 'GET',
        path: '/api/users',
        handler: (req, res) => usersController_1.usersController.getUsers(req, res)
    },
    {
        method: 'GET',
        path: '/api/users/{userId}',
        handler: (req, res) => usersController_1.usersController.getUserById(req, res)
    },
    {
        method: 'POST',
        path: '/api/users',
        handler: (req, res) => usersController_1.usersController.createUser(req, res)
    },
    {
        method: 'PUT',
        path: '/api/users/{userId}',
        handler: (req, res) => usersController_1.usersController.updateUserById(req, res)
    },
    {
        method: 'DELETE',
        path: '/api/users/{userId}',
        handler: (req, res) => usersController_1.usersController.deleteUserById(req, res)
    },
];
