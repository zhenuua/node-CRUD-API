"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequestBody = exports.getBaseUrl = exports.getUserIdFromUrl = exports.validateJSON = exports.saveData = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const saveData = (data) => {
    try {
        fs_1.default.writeFileSync(path_1.default.join(__dirname, "..", "data", "users.json"), JSON.stringify(data), "utf-8");
    }
    catch (err) {
        console.log(err);
    }
};
exports.saveData = saveData;
const validateJSON = (str) => {
    try {
        JSON.parse(str);
    }
    catch (e) {
        return false;
    }
    return true;
};
exports.validateJSON = validateJSON;
const getUserIdFromUrl = (url) => url ? url.split("/")[3] : '';
exports.getUserIdFromUrl = getUserIdFromUrl;
const getBaseUrl = (url) => url ? url.substring(0, url.lastIndexOf("/") + 1) : '';
exports.getBaseUrl = getBaseUrl;
const getRequestBody = (req) => {
    return new Promise((resolve, reject) => {
        let requestData = '';
        req.on('data', (chunk) => {
            requestData += chunk;
        });
        req.on('end', () => {
            resolve(requestData);
        });
        req.on('error', (error) => {
            reject(error);
        });
    });
};
exports.getRequestBody = getRequestBody;
