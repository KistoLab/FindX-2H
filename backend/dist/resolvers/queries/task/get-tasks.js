"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasks = void 0;
const models_1 = require("@/models");
const graphql_1 = require("graphql");
const tasks = async () => {
    try {
        const tasks = await models_1.TaskModel.find();
        // Convert lowercase database values to uppercase for GraphQL and map _id to id
        return tasks.map(task => ({
            ...task.toObject(),
            id: task._id.toString(),
            topic: task.topic?.toUpperCase(),
            difficulty: task.difficulty?.toUpperCase(),
            type: task.type?.toUpperCase(),
        }));
    }
    catch (error) {
        console.error('Error fetching tasks:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        throw new graphql_1.GraphQLError(`Failed to fetch tasks: ${errorMessage}`);
    }
};
exports.tasks = tasks;
//# sourceMappingURL=get-tasks.js.map