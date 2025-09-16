"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listChallengeRoomsByStudent = void 0;
const graphql_1 = require("graphql");
const models_1 = require("@/models");
const listChallengeRoomsByStudent = async (_, { studentId }) => {
    try {
        const challengeRooms = await models_1.ChallengeRoomModel.find({
            $or: [{ challengerId: studentId }, { opponentId: studentId }],
        });
        return challengeRooms.map((challengeRoom) => ({
            id: challengeRoom._id.toString(),
            challengeId: challengeRoom.challengeId.toString(),
            challengerId: challengeRoom.challengerId.toString(),
            opponentId: challengeRoom.opponentId.toString(),
            status: challengeRoom.status,
            winnerId: challengeRoom.winnerId?.toString(),
            challengerScore: challengeRoom.challengerScore,
            opponentScore: challengeRoom.opponentScore,
            createdAt: challengeRoom.createdAt,
            updatedAt: challengeRoom.updatedAt,
        }));
    }
    catch (error) {
        throw new graphql_1.GraphQLError("Failed to get list challenge room by student");
    }
};
exports.listChallengeRoomsByStudent = listChallengeRoomsByStudent;
//# sourceMappingURL=get-listChallengeRoomByStudent.js.map