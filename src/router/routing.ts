import { Request, Response, Router } from 'express';

const router: Router = require('express').Router();
import { validationResult } from 'express-validator';

import { ParticipantsController } from '../controllers/participants';
import { getParticipantValidator, createParticipantValidator } from '../validators';
import RESPONSE_CODES from '../constants/responseCodes';


const participantsController = new ParticipantsController();

const getParticipantById = async(req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(RESPONSE_CODES.unprocessableEntity).json({ errors: errors.array() });
    }

    const participantId = req.query.userId;
    const participant = await participantsController.getParticipantById(participantId);

    if (!participant) {
        return res.status(RESPONSE_CODES.notFound).send('Participant with sent id cannot be found');
    }

    return res.status(RESPONSE_CODES.ok).send(participant);
};

const createParticipant = async(req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(RESPONSE_CODES.unprocessableEntity).json({ errors: errors.array() });
    }

    const createdParticipant = await participantsController.createParticipant(req.body);

    if (createdParticipant) {
        return res.status(RESPONSE_CODES.ok).send(createdParticipant);
    }

    return res.status(RESPONSE_CODES.unprocessableEntity).send('Participant with sent name already exist');
};

const shuffle = async(req: Request, res: Response) => {
    res.status(RESPONSE_CODES.ok).send('shuffle');
};

router.get('/participants', getParticipantValidator, getParticipantById);
router.post('/participants', createParticipantValidator, createParticipant);
router.post('/shuffle', shuffle);

export default router;
