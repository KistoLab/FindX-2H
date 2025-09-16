"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateChallengeRoom = void 0;
const ChallengeRoom_model_1 = require("@/models/ChallengeRoom.model");
const graphql_1 = require("graphql");
const updateChallengeRoom = async (_, { input }) => {
    try {
        const challengeRoom = await ChallengeRoom_model_1.ChallengeRoomModel.findByIdAndUpdate(input.roomId, input);
        if (!challengeRoom) {
            throw new graphql_1.GraphQLError("Challenge room not found");
        }
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
        throw new graphql_1.GraphQLError("Failed to update challenge room");
    }
};
exports.updateChallengeRoom = updateChallengeRoom;
//# sourceMappingURL=update-challengeRoom.js.map