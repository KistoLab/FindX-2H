"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasksByTopic = void 0;
const models_1 = require("@/models");
const graphql_1 = require("graphql");
const tasksByTopic = async (_, { topic }) => {
    try {
        console.log(`🔍 Looking for tasks with topic: ${topic}`);
        // Convert GraphQL enum to database format (lowercase with hyphens)
        const dbTopic = topic.toLowerCase().replace(/_/g, '-');
        const tasks = await models_1.TaskModel.find({ topic: dbTopic });
        console.log(`✅ Found ${tasks.length} tasks with topic ${topic}`);
        // Map _id to id and convert topic to uppercase for GraphQL response
        return tasks.map(task => ({
            ...task.toObject(),
            id: task._id.toString(),
            topic: task.topic?.toUpperCase().replace(/-/g, '_'),
        }));
    }
    catch (error) {
        console.error('Error fetching tasks by topic:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        throw new graphql_1.GraphQLError(`Failed to fetch tasks by topic: ${errorMessage}`);
    }
};
exports.tasksByTopic = tasksByTopic;
//# sourceMappingURL=get-tasks-by-topic.js.map