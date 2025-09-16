"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignTasksToChallenge = void 0;
const graphql_1 = require("graphql");
const models_1 = require("@/models");
const models_2 = require("@/models");
const assignTasksToChallenge = async (_, { input }) => {
    try {
        // Verify challenge exists
        const challenge = await models_1.ChallengeModel.findById(input.challengeId);
        if (!challenge) {
            throw new graphql_1.GraphQLError("Challenge not found");
        }
        // Verify all tasks exist
        const tasks = await models_2.TaskModel.find({ _id: { $in: input.taskIds } });
        if (tasks.length !== input.taskIds.length) {
            throw new graphql_1.GraphQLError("One or more tasks not found");
        }
        // Verify tasks match challenge topic and difficulty
        const invalidTasks = tasks.filter(task => task.topic !== challenge.topic || task.difficulty !== challenge.difficulty);
        if (invalidTasks.length > 0) {
            throw new graphql_1.GraphQLError("Some tasks don't match the challenge topic or difficulty");
        }
        // Update challenge with tasks
        const updatedChallenge = await models_1.ChallengeModel.findByIdAndUpdate(input.challengeId, { tasks: input.taskIds }, { new: true }).populate('tasks');
        if (!updatedChallenge) {
            throw new graphql_1.GraphQLError("Failed to update challenge");
        }
        return {
            id: updatedChallenge._id.toString(),
            topic: updatedChallenge.topic,
            difficulty: updatedChallenge.difficulty,
            challenger: updatedChallenge.challenger.toString(),
            opponent: updatedChallenge.opponent.toString(),
            participants: updatedChallenge.participants.map((p) => p.toString()),
            winner: updatedChallenge.winner?.toString(),
            piPoints: updatedChallenge.piPoints,
            status: updatedChallenge.status,
            tasks: updatedChallenge.tasks.map(task => ({
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
            classType: updatedChallenge.classType,
            createdAt: updatedChallenge.createdAt,
            updatedAt: updatedChallenge.updatedAt,
        };
    }
    catch (error) {
        throw new graphql_1.GraphQLError(`Failed to assign tasks to challenge: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};
exports.assignTasksToChallenge = assignTasksToChallenge;
//# sourceMappingURL=assign-tasks-to-challenge.js.map