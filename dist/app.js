"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const userRoutes_1 = require("./routes/userRoutes");
const utils_1 = require("./utils/utils");
const app = (req, res) => {
    let url = req.url ? req.url : '';
    const id = (0, utils_1.getUserIdFromUrl)(url);
    if (id)
        url = (0, utils_1.getBaseUrl)(url);
    let routePath = id ? url + '{userId}' : url;
    const route = userRoutes_1.routes.find((route) => route.method === req.method && route.path === routePath);
    try {
        if (route) {
            route.handler(req, res);
        }
        else {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: 'Route does not exist' }));
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: error.message }));
        }
    }
};
exports.app = app;
