"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDB = exports.connectDB = void 0;
const sqlite3 = require('sqlite3').verbose();
const path_1 = __importDefault(require("path"));
let db;
const connectDB = async () => {
    db = new sqlite3.Database(path_1.default.join(`${__dirname}/../database`, 'participants.db'));
    db.serialize(() => {
        db.run('CREATE TABLE IF NOT EXISTS participants(firstName TEXT, lastName TEXT )');
    });
};
exports.connectDB = connectDB;
const getDB = () => {
    return db;
};
exports.getDB = getDB;
//# sourceMappingURL=database.js.map