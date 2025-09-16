"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.task = void 0;
const models_1 = require("@/models");
const graphql_1 = require("graphql");
const task = async (_, { id }) => {
    try {
        const task = await models_1.TaskModel.findById(id);
        if (task) {
            return {
                ...task.toObject(),
                id: task._id.toString(),
                topic: task.topic?.toUpperCase(),
                difficulty: task.difficulty?.toUpperCase(),
                type: task.type?.toUpperCase(),
            };
        }
        return task;
    }
    catch (error) {
        console.error('Error fetching task:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        throw new graphql_1.GraphQLError(`Failed to fetch task: ${errorMessage}`);
    }
};
exports.task = task;
//# sourceMappingURL=get-task.js.map