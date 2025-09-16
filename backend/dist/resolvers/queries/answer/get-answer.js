"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.answer = void 0;
const Answer_model_1 = require("@/models/Answer.model");
const graphql_1 = require("graphql");
const answer = async (_, { taskId }) => {
    try {
        console.log(`🔍 Looking for answer with task ID: ${taskId}`);
        const answerDoc = await Answer_model_1.AnswerModel.findOne({ taskId });
        if (!answerDoc) {
            console.log(`⚠️ No answer found for task ID: ${taskId}`);
            return null;
        }
        console.log(`✅ Found answer for task ID: ${taskId}`);
        // Convert Mongoose document to GraphQL type
        return {
            id: answerDoc._id.toString(),
            taskId: answerDoc.taskId,
            answer: answerDoc.answer,
            solution: answerDoc.solution,
            testCases: answerDoc.testCases?.map((tc) => ({
                input: tc.input,
                expectedOutput: tc.expectedOutput,
                explanation: tc.explanation || undefined,
            })),
            aiGenerated: answerDoc.aiGenerated,
            generatedAt: answerDoc.generatedAt,
            createdAt: answerDoc.createdAt,
            updatedAt: answerDoc.updatedAt,
        };
    }
    catch (error) {
        console.error("Error fetching answer:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        throw new graphql_1.GraphQLError(`Failed to fetch answer: ${errorMessage}`);
    }
};
exports.answer = answer;
//# sourceMappingURL=get-answer.js.map