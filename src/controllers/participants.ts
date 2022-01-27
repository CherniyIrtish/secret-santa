import { db } from '../models';
import { IParticipant } from '../interfaces/participant';
import { Model } from 'sequelize';

export class ParticipantsController {
    async getParticipantById(participantId: string): Promise<IParticipant | null> {
        return await db.Participant.findOne({ where: { id: participantId } });
    }

    async createParticipant(participant: IParticipant): Promise<IParticipant | string> {
        const isParticipantExist = await db.Participant.findOne({ where: { lastName: participant.lastName } });
        const participants = await db.Participant.findAll();

        if (!isParticipantExist && participants.length <= 500) {
            return await db.Participant.create(participant);
        }

        if (isParticipantExist) {
            return 'Participant with sent name already exist';
        }

        return 'Participants number already 500, we cannot register more';
    }

    async shuffle(): Promise<string> {
        const participants: Model[] = await db.Participant.findAll();

        if (participants.length < 3) {
            return `Min number of participants cannot be less than 3, now ${participants.length}`;
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

        return 'Successfully shuffled';
    }
}

