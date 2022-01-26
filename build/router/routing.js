"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const participants_1 = require("../controllers/participants");
const validators_1 = require("../validators");
const router = require('express').Router();
const express_validator_1 = require("express-validator");
const participantsController = new participants_1.ParticipantsController();
const getParticipantById = async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const participantId = req.query.userId;
    const participant = await participantsController.getParticipantById(participantId);
    console.log('getParticipantById ', participant);
    return res.status(200).send(participant);
    // res.status(200).send(allCashiers);
};
const createParticipant = async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    // const createdCashier: ICashier = await cashiersService.create(req.body.title);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const createdParticipant = await participantsController.createParticipant(req.body);
    res.status(200).send(createdParticipant);
};
const shuffle = async (req, res) => {
    // const createdCashier: ICashier = await cashiersService.create(req.body.title);
    res.status(200).send('shuffle');
};
router.get('/participants', validators_1.getParticipantValidator, getParticipantById);
router.post('/participants', validators_1.createParticipantValidator, createParticipant);
router.post('/shuffle', shuffle);
exports.default = router;
//# sourceMappingURL=routing.js.map