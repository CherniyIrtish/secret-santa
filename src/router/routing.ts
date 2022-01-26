import { Request, Response, Router } from 'express';
const router: Router = require('express').Router();
import { validationResult } from 'express-validator';

import { ParticipantsController } from '../controllers/participants';
import { getParticipantValidator, createParticipantValidator } from '../validators';
import RESPONSE_CODES from '../constants/responseCodes';


const participantsController = new ParticipantsController();

const getParticipantById = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(RESPONSE_CODES.unprocessableEntity).json({ errors: errors.array() });
    }

    const participantId = req.query.userId;

    const participant = await participantsController.getParticipantById(participantId);

    return res.status(RESPONSE_CODES.ok).send(participant);
};

const createParticipant = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(RESPONSE_CODES.unprocessableEntity).json({ errors: errors.array() });
    }

    const createdParticipant = await participantsController.createParticipant(req.body);

    res.status(RESPONSE_CODES.ok).send(createdParticipant);
};

const shuffle = async (req: Request, res: Response) => {
    res.status(RESPONSE_CODES.ok).send('shuffle');
};

router.get('/participants', getParticipantValidator, getParticipantById);
router.post('/participants', createParticipantValidator, createParticipant);
router.post('/shuffle', shuffle);

export default router;
