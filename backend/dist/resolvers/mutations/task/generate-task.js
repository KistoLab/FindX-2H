"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTask = void 0;
const taskGenerator_service_1 = require("@/services/taskGenerator.service");
const answer_generator_service_1 = require("@/services/answer-generator.service");
const Answer_model_1 = require("@/models/Answer.model");
const graphql_1 = require("graphql");
const generateTask = async (_, { input }) => {
    try {
        if (input.piPoints < 1) {
            throw new graphql_1.GraphQLError("PiPoints must be at least 1");
        }
        const generatedTask = await taskGenerator_service_1.TaskGeneratorService.generateTask({
            topic: input.topic,
            difficulty: input.difficulty,
            type: input.type,
            classType: input.classType,
            piPoints: input.piPoints,
            answerFormat: input.answerFormat
        });
        // Generate answer automatically after task generation
        console.log('🤖 Auto-generating answer for task...');
        try {
            // Map model types to GraphQL types
            const { topic, classType } = answer_generator_service_1.AnswerGeneratorService.mapModelToGraphQLTypes(generatedTask.topic, generatedTask.classType);
            const answerData = await answer_generator_service_1.AnswerGeneratorService.generateAnswerFormat({
                topic,
                classType,
                title: generatedTask.title,
                description: generatedTask.description,
                problemStatement: generatedTask.problemStatement || ''
            });
            // Save answer to database
            const newAnswer = new Answer_model_1.AnswerModel({
                taskId: generatedTask.id,
                answer: answerData.answer,
                solution: answerData.solution,
                testCases: answerData.testCases,
                answerValidation: answerData.answerValidation,
                aiGenerated: true,
                generatedAt: new Date()
            });
            await newAnswer.save();
            console.log('✅ Answer auto-generated and saved successfully');
        }
        catch (answerError) {
            console.error('⚠️ Failed to auto-generate answer:', answerError);
            // Don't fail the task generation if answer generation fails
        }
        return generatedTask;
    }
    catch (error) {
        console.error('Error generating task:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        throw new graphql_1.GraphQLError(`Failed to generate task: ${errorMessage}`);
    }
};
exports.generateTask = generateTask;
//# sourceMappingURL=generate-task.js.map