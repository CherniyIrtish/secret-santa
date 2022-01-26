"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createParticipantValidator = exports.getParticipantValidator = void 0;
const { check } = require('express-validator');
exports.getParticipantValidator = [
    check('userId').not().isEmpty().withMessage("Provide userId query parameter"),
];
exports.createParticipantValidator = [
    check('firstName').not().isEmpty().withMessage("Provide firstName"),
    check('lastName').not().isEmpty().withMessage("Provide lastName"),
];
// check('wishes').not().isEmpty().withMessage("Provide at least a one wish"),
//     check('wishes').isArray({ min: 1, max: 10 }).withMessage("Number of wishes cannot be more than 10"),
//# sourceMappingURL=index.js.map