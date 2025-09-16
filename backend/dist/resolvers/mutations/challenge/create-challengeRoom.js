"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChallengeRoom = void 0;
const ChallengeRoom_model_1 = require("@/models/ChallengeRoom.model");
const graphql_1 = require("graphql");
const createChallengeRoom = async (_, { input }) => {
    try {
        const challengeRoom = await ChallengeRoom_model_1.ChallengeRoomModel.create(input);
        return {
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
        };
    }
    catch (error) {
        throw new graphql_1.GraphQLError("Failed to create challenge room");
    }
};
exports.createChallengeRoom = createChallengeRoom;
//# sourceMappingURL=create-challengeRoom.js.map