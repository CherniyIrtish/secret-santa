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

    const participantId: string = req.query.id as string;
    const participant: IParticipant|null = await participantsController.getParticipantById(participantId);

    if (!participant) {
        return res.status(RESPONSE_CODES.notFound).send('Participant didnt find');
    }

    if (!participant.gifted) {
        return res.status(RESPONSE_CODES.ok).send('Wait for the Christmas');
    }

    const giftedParticipant: IParticipant|null = await participantsController.getParticipantById(participant.gifted);

    return res.status(RESPONSE_CODES.ok).send(
        {
            firstName: giftedParticipant?.firstName,
            lastName: giftedParticipant?.lastName,
            wishes: giftedParticipant?.wishes
        }
    );
};

const createParticipant = async(req: Request, res: Response): Promise<Response> => {
    const errors: Result<ValidationError> = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(RESPONSE_CODES.unprocessableEntity).json({ errors: errors.array() });
    }

    const result: IParticipant|string = await participantsController.createParticipant(req.body);

    if (typeof result !== 'string') {
        return res.status(RESPONSE_CODES.created).send(result);
    } else {
        return res.status(RESPONSE_CODES.unprocessableEntity).send(result);
    }
};

const shuffle = async(req: Request, res: Response): Promise<Response> => {
    const response: {code: number, message: string} = await participantsController.shuffle();

    if (response.code === 422) {
        return res.status(RESPONSE_CODES.unprocessableEntity).send(response.message);
    }

    return res.status(RESPONSE_CODES.ok).send(response.message);
};

router.get('/participants', getParticipantValidator, getParticipantById);
router.post('/participants', createParticipantValidator, createParticipant);
router.post('/shuffle', shuffle);

export default router;
