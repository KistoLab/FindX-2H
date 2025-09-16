"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasksByDifficulty = void 0;
const models_1 = require("@/models");
const graphql_1 = require("graphql");
const tasksByDifficulty = async (_, { difficulty }) => {
    try {
        console.log(`🔍 Looking for tasks with difficulty: ${difficulty}`);
        // The database stores values in uppercase, so use the difficulty as-is
        const tasks = await models_1.TaskModel.find({ difficulty: difficulty });
        console.log(`✅ Found ${tasks.length} tasks with difficulty ${difficulty}`);
        // Map _id to id and convert topic to uppercase for GraphQL response
        return tasks.map(task => ({
            ...task.toObject(),
            id: task._id.toString(),
            topic: task.topic?.toUpperCase().replace(/-/g, '_'),
        }));
    }
    catch (error) {
        console.error('Error fetching tasks by difficulty:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        throw new graphql_1.GraphQLError(`Failed to fetch tasks by difficulty: ${errorMessage}`);
    }
};
exports.tasksByDifficulty = tasksByDifficulty;
//# sourceMappingURL=get-tasks-by-difficulty.js.map