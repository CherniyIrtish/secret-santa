"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routing_1 = __importDefault(require("./routing"));
let rootRouter = (0, express_1.Router)();
rootRouter.use('/', routing_1.default);
exports.default = rootRouter;
//# sourceMappingURL=index.js.map