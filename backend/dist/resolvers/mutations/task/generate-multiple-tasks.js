"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMultipleTasks = void 0;
const taskGenerator_service_1 = require("@/services/taskGenerator.service");
const graphql_1 = require("graphql");
const generateMultipleTasks = async (_, { input }) => {
    try {
        if (input.piPoints < 1) {
            throw new graphql_1.GraphQLError("PiPoints must be at least 1");
        }
        const taskCount = input.taskCount;
        if (taskCount < 1 || taskCount > 20) {
            throw new graphql_1.GraphQLError("Task count must be between 1 and 20");
        }
        if (input.difficultyDistribution) {
            const { easy = 0, medium = 0, hard = 0 } = input.difficultyDistribution;
            const totalSpecified = easy + medium + hard;
            if (totalSpecified > 0 && totalSpecified !== taskCount) {
                throw new graphql_1.GraphQLError("Difficulty distribution total must equal task count");
            }
            if (easy < 0 || medium < 0 || hard < 0) {
                throw new graphql_1.GraphQLError("Difficulty counts cannot be negative");
            }
        }
        console.log(`🚀 Generating ${taskCount} tasks for topic: ${input.topic}`);
        if (input.difficultyDistribution) {
            console.log('📊 Difficulty distribution:', input.difficultyDistribution);
        }
        const generatedTasks = await taskGenerator_service_1.TaskGeneratorService.generateMultipleTasks(input);
        console.log(`✅ Successfully generated ${generatedTasks.length} tasks`);
        return generatedTasks;
    }
    catch (error) {
        console.error('Error generating multiple tasks:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        throw new graphql_1.GraphQLError(`Failed to generate multiple tasks: ${errorMessage}`);
    }
};
exports.generateMultipleTasks = generateMultipleTasks;
//# sourceMappingURL=generate-multiple-tasks.js.map