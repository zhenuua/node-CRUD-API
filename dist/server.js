"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const node_http_1 = __importDefault(require("node:http"));
const app_1 = require("./app");
const PORT = process.env.PORT || 8000;
const server = node_http_1.default.createServer(app_1.app);
server.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
