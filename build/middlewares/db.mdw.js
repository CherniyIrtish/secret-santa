"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbMdw = void 0;
const sqlite3 = require('sqlite3').verbose();
const path_1 = __importDefault(require("path"));
const db = new sqlite3.Database(path_1.default.join(`${__dirname}/../database`, 'participants.db'));
const dbMdw = () => async (req, res, next) => {
    db.serialize(() => {
        db.run('CREATE TABLE IF NOT EXISTS participants(firstName TEXT, lastName TEXT )');
    });
    next();
};
exports.dbMdw = dbMdw;
//# sourceMappingURL=db.mdw.js.map