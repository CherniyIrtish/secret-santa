const { check } = require('express-validator');

export const getParticipantValidator = [
    check('userId').not().isEmpty().withMessage("Provide userId query parameter"),
];

export const createParticipantValidator = [
    check('firstName').not().isEmpty().withMessage("Provide firstName"),
    check('lastName').not().isEmpty().withMessage("Provide lastName"),

];
// check('wishes').not().isEmpty().withMessage("Provide at least a one wish"),
//     check('wishes').isArray({ min: 1, max: 10 }).withMessage("Number of wishes cannot be more than 10"),
