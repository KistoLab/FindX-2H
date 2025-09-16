"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listStudentChallengeResponses = void 0;
const graphql_1 = require("graphql");
const ChallengeRoomResponse_model_1 = require("@/models/ChallengeRoomResponse.model");
const listStudentChallengeResponses = async (_, { studentId }) => {
    try {
        const challengeRoomResponses = await ChallengeRoomResponse_model_1.ChallengeRoomResponseModel.find({
            studentId: studentId,
        });
        return challengeRoomResponses.map((challengeRoomResponse) => ({
            id: challengeRoomResponse._id.toString(),
            challengeRoomId: challengeRoomResponse.challengeRoomId.toString(),
            studentId: challengeRoomResponse.studentId.toString(),
            submittedAnswer: challengeRoomResponse.submittedAnswer,
            isCorrect: challengeRoomResponse.isCorrect,
            points: challengeRoomResponse.points,
            submittedAt: challengeRoomResponse.submittedAt,
            createdAt: challengeRoomResponse.createdAt,
            updatedAt: challengeRoomResponse.updatedAt,
        }));
    }
    catch (error) {
        throw new graphql_1.GraphQLError("Failed to get list student challenge responses");
    }
};
exports.listStudentChallengeResponses = listStudentChallengeResponses;
//# sourceMappingURL=get-listStudentChallengeResponses.js.map