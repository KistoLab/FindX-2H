"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChallengeRoomResponse = void 0;
const graphql_1 = require("graphql");
const ChallengeRoomResponse_model_1 = require("@/models/ChallengeRoomResponse.model");
const getChallengeRoomResponse = async (_, { id }) => {
    try {
        const challengeRoomResponse = await ChallengeRoomResponse_model_1.ChallengeRoomResponseModel.findById(id);
        if (!challengeRoomResponse) {
            throw new graphql_1.GraphQLError("Challenge room response not found");
        }
        return {
            id: challengeRoomResponse._id.toString(),
            challengeRoomId: challengeRoomResponse.challengeRoomId.toString(),
            studentId: challengeRoomResponse.studentId.toString(),
            submittedAnswer: challengeRoomResponse.submittedAnswer,
            isCorrect: challengeRoomResponse.isCorrect,
            points: challengeRoomResponse.points,
            submittedAt: challengeRoomResponse.submittedAt,
            createdAt: challengeRoomResponse.createdAt,
            updatedAt: challengeRoomResponse.updatedAt,
        };
    }
    catch (error) {
        throw new graphql_1.GraphQLError("Failed to get challenge room response");
    }
};
exports.getChallengeRoomResponse = getChallengeRoomResponse;
//# sourceMappingURL=get-challengeRoomResponse.js.map