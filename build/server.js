"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express = require('express');
const router_1 = __importDefault(require("./router"));
const database_1 = require("./database");
const port = 3000;
const server = express();
server.use(body_parser_1.default.json());
(0, database_1.connectDB)();
server.use('/api', router_1.default);
// db.serialize(() => {
//     db.run('CREATE TABLE IF NOT EXISTS participants(firstName TEXT, lastName TEXT )');
// });
//
server.listen(port, () => {
    console.log(`Secret Santa app listening at http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map