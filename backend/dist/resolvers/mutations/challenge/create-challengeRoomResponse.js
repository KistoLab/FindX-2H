"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChallengeRoomResponse = void 0;
const graphql_1 = require("graphql");
const ChallengeRoomResponse_model_1 = require("@/models/ChallengeRoomResponse.model");
const createChallengeRoomResponse = async (_, { input }) => {
    try {
        const challengeRoomResponse = await ChallengeRoomResponse_model_1.ChallengeRoomResponseModel.create(input);
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
        throw new graphql_1.GraphQLError("Failed to create challenge room response");
    }
};
exports.createChallengeRoomResponse = createChallengeRoomResponse;
//# sourceMappingURL=create-challengeRoomResponse.js.map