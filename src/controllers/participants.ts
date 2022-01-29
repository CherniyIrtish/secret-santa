import { db } from '../models';
import { IParticipant } from '../interfaces/participant';
import { IGame } from '../interfaces/game';
import { Model } from 'sequelize';

export class ParticipantsController {
    async getParticipantById(participantId: string): Promise<IParticipant|null> {
        return await db.Participant.findOne({ where: { id: participantId } });
    }

    async createParticipant(participant: IParticipant): Promise<IParticipant|string> {
        const isParticipantExist: IParticipant = await db.Participant.findOne({ where: { lastName: participant.lastName } });
        const participants: IParticipant[] = await db.Participant.findAll();
        const isGameStarted: IGame[] = await db.Game.findAll();

        if (isGameStarted.length) {
            return 'Game has already started, see next year';
        }

        if (isParticipantExist) {
            return 'Participant with sent name already exist';
        }

        if (participants.length >= 500) {
            return 'Participants number already 500, we cannot register more';
        }

        return await db.Participant.create(participant);
    }

    async shuffle(): Promise<{code: number, message: string}> {
        const isGameStarted: IGame[] = await db.Game.findAll();

        if (isGameStarted.length) {
            return { code: 422, message: 'Sorry you are late we have been already celebrating' };
        }

        const participants: Model[] = await db.Participant.findAll();

        if (participants.length < 3) {
            return {
                code: 422,
                message: `Min number of participants cannot be less than 3, now ${participants.length}`
            };
        }

        participants.forEach((participant: any) => {
            db.Participant.findOne({ where: { id: participant.id } })
            .then((user: any) => {
                if (participant.id === participants.length) {
                    user.update({ gifted: 1 });
                } else {
                    user.update({ gifted: participant.id + 1 });
                }
            });
        });

        await db.Game.create({ isStarted: true });

        return { code: 200, message: 'Successfully shuffled' };
    }
}

