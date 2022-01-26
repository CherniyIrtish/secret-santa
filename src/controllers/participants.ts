import { db } from '../models';

export class ParticipantsController {
    async getParticipantById(participantId: any) {
        return await db.Participant.findOne({ where: { id: participantId } });
    }

    async createParticipant(participant: any) {
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

    async shuffle() {
        const participants = await db.Participant.findAll();

        if (participants.length < 3) {
            return `Min number of participants cannot be less than 3, now ${participants.length}`;
        }

        participants.forEach((participant: any) => {
            db.Participant.findOne({ where: { id: participant.id } })
            .then((user: any) => {
                if (participant.id === participants.length) {
                    user.update({ giver: 1 });
                } else {
                    user.update({ giver: participant.id + 1 });
                }
            });
        });

        return 'Successfully shuffled';
    }
}

