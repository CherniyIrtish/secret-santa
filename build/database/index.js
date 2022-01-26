"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDB = exports.connectDB = void 0;
const sqlite3 = require('sqlite3').verbose();
const Sequelize = require('sequelize');
const path_1 = __importDefault(require("path"));
let db;
let sequelize;
const connectDB = async () => {
    db = new sqlite3.Database(path_1.default.join(`${__dirname}/../database`, 'participants.db'));
    db.serialize(() => {
        db.run('CREATE TABLE IF NOT EXISTS participants(ID INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT )');
    });
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: './participants.db'
    });
};
exports.connectDB = connectDB;
const getDB = () => {
    return db;
};
exports.getDB = getDB;
//# sourceMappingURL=index.js.map