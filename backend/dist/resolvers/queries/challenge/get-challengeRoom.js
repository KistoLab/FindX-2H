"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChallengeRoom = void 0;
const graphql_1 = require("graphql");
const models_1 = require("@/models");
const getChallengeRoom = async (_, { id }) => {
    try {
        const challengeRoom = await models_1.ChallengeRoomModel.findById(id);
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
        throw new graphql_1.GraphQLError("Failed to get challenge room");
    }
};
exports.getChallengeRoom = getChallengeRoom;
//# sourceMappingURL=get-challengeRoom.js.map