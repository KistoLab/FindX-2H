"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChallenge = void 0;
const graphql_1 = require("graphql");
const models_1 = require("@/models");
const getChallenge = async (_, { id }) => {
    try {
        const challenge = await models_1.ChallengeModel.findById(id).populate('tasks');
        if (!challenge) {
            throw new graphql_1.GraphQLError("Challenge not found");
        }
        return {
            id: challenge._id.toString(),
            topic: challenge.topic,
            difficulty: challenge.difficulty,
            challenger: challenge.challenger.toString(),
            opponent: challenge.opponent.toString(),
            participants: challenge.participants.map((p) => p.toString()),
            winner: challenge.winner?.toString(),
            piPoints: challenge.piPoints,
            status: challenge.status,
            tasks: challenge.tasks.map(task => ({
                id: task._id.toString(),
                title: task.title,
                description: task.description,
                topic: task.topic.toUpperCase(),
                difficulty: task.difficulty.toUpperCase(),
                type: task.type.toUpperCase(),
                classType: task.classType.toUpperCase(),
                piPoints: task.piPoints,
                problemStatement: task.problemStatement,
                aiGenerated: task.aiGenerated,
                generatedAt: task.generatedAt,
                usageCount: task.usageCount,
                createdAt: task.createdAt,
                updatedAt: task.updatedAt
            })),
            classType: challenge.classType,
            createdAt: challenge.createdAt,
            updatedAt: challenge.updatedAt,
        };
    }
    catch (error) {
        throw new graphql_1.GraphQLError("Failed to get challenge");
    }
};
exports.getChallenge = getChallenge;
//# sourceMappingURL=get-challenge.js.map