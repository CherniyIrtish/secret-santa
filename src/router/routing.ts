import { Request, Response, Router } from 'express';
import { ValidationError } from 'express-validator/src/base';
import { Result, validationResult } from 'express-validator';

import { ParticipantsController } from '../controllers/participants';
import { getParticipantValidator, createParticipantValidator } from '../validators';
import RESPONSE_CODES from '../constants/responseCodes';
import { IParticipant } from '../interfaces/participant';



const router: Router = require('express').Router();
const participantsController: ParticipantsController = new ParticipantsController();

const getParticipantById = async(req: Request, res: Response): Promise<Response> => {
    const errors: Result<ValidationError> = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(RESPONSE_CODES.unprocessableEntity).json({ errors: errors.array() });
    }

    const participantId: string = req.query.userId as string;
    const participant: IParticipant | null = await participantsController.getParticipantById(participantId);

    if (!participant) {
        return res.status(RESPONSE_CODES.notFound).send('Participant with sent id cannot be found');
    }

    return res.status(RESPONSE_CODES.ok).send(participant);
};

const createParticipant = async(req: Request, res: Response): Promise<Response> => {
    const errors: Result<ValidationError> = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(RESPONSE_CODES.unprocessableEntity).json({ errors: errors.array() });
    }

    const result: IParticipant | string = await participantsController.createParticipant(req.body);

    if (typeof result !== 'string') {
        return res.status(RESPONSE_CODES.ok).send(result);
    } else {
        return res.status(RESPONSE_CODES.unprocessableEntity).send(result);
    }
};

const shuffle = async(req: Request, res: Response): Promise<Response> => {
    const response: string = await participantsController.shuffle();

    return res.status(RESPONSE_CODES.ok).send(response);
};

router.get('/participants', getParticipantValidator, getParticipantById);
router.post('/participants', createParticipantValidator, createParticipant);
router.post('/shuffle', shuffle);

export default router;
