"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipantsController = void 0;
const database_1 = require("../database");
class ParticipantsController {
    async getParticipantById(participantId) {
        const db = (0, database_1.getDB)();
        const query = `SELECT id, firstName, lastName FROM participants WHERE id =?`;
        db.serialize(async () => {
            db.each(query, [participantId], async function (err, row) {
                if (err)
                    console.error(err.message);
                const participant = await row;
                console.log('participant --> ', participant);
                return participant;
            });
        });
    }
    async createParticipant(participant) {
        const db = (0, database_1.getDB)();
        db.serialize(() => {
            db.run('INSERT INTO participants(firstName, lastName) VALUES(?,?)', [participant.firstName, participant.lastName], function (err) {
                if (err) {
                    return console.log(err.message);
                }
            });
        });
        return participant;
    }
}
exports.ParticipantsController = ParticipantsController;
//# sourceMappingURL=participants.js.map