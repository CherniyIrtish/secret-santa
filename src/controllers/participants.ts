import { db } from '../models';

export class ParticipantsController {
    async getParticipantById(participantId: any) {
        return await db.Participant.findOne({ where: { id: participantId } });
    }

    async createParticipant(participant: any) {
        return await db.Participant.create(participant);
    }
}
