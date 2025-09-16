"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTaskAnswer = void 0;
const Task_model_1 = require("@/models/Task.model");
const Answer_model_1 = require("@/models/Answer.model");
const answer_generator_service_1 = require("@/services/answer-generator.service");
const graphql_1 = require("graphql");
const generateTaskAnswer = async (_, { taskId }) => {
    try {
        console.log(`🔍 Looking for task with ID: ${taskId}`);
        // Find the task by ID
        const task = await Task_model_1.TaskModel.findById(taskId);
        if (!task) {
            throw new graphql_1.GraphQLError(`Task with ID ${taskId} not found`);
        }
        console.log(`✅ Found task: ${task.title}`);
        // Check if task already has an answer
        const existingAnswer = await Answer_model_1.AnswerModel.findOne({ taskId });
        if (existingAnswer) {
            console.log(`⚠️ Task ${taskId} already has an answer`);
            return {
                id: existingAnswer._id.toString(),
                taskId: existingAnswer.taskId,
                answer: existingAnswer.answer,
                solution: existingAnswer.solution,
                testCases: existingAnswer.testCases?.map(tc => ({
                    input: tc.input,
                    expectedOutput: tc.expectedOutput,
                    explanation: tc.explanation || undefined
                })),
                answerValidation: {
                    format: existingAnswer.answerValidation.format,
                    correctAnswers: existingAnswer.answerValidation.correctAnswers,
                    multipleChoiceOptions: existingAnswer.answerValidation.multipleChoiceOptions?.map(opt => ({
                        letter: opt.letter,
                        text: opt.text,
                        isCorrect: opt.isCorrect
                    })),
                    partialCreditAnswers: existingAnswer.answerValidation.partialCreditAnswers,
                    validationRules: existingAnswer.answerValidation.validationRules
                },
                aiGenerated: existingAnswer.aiGenerated,
                generatedAt: existingAnswer.generatedAt,
                createdAt: existingAnswer.createdAt,
                updatedAt: existingAnswer.updatedAt
            };
        }
        // Generate answer using the new AnswerGeneratorService
        console.log('🤖 Generating answer using AnswerGeneratorService...');
        // Map model types to GraphQL types
        const { topic, classType } = answer_generator_service_1.AnswerGeneratorService.mapModelToGraphQLTypes(task.topic, task.classType);
        const answerData = await answer_generator_service_1.AnswerGeneratorService.generateAnswerFormat({
            topic,
            classType,
            title: task.title,
            description: task.description,
            problemStatement: task.problemStatement || ''
        });
        console.log('✅ AnswerGeneratorService generated answer successfully');
        // Create a new answer document
        const newAnswer = new Answer_model_1.AnswerModel({
            taskId,
            answer: answerData.answer,
            solution: answerData.solution,
            testCases: answerData.testCases,
            answerValidation: answerData.answerValidation,
            aiGenerated: true,
            generatedAt: new Date()
        });
        const savedAnswer = await newAnswer.save();
        console.log(`🎉 Successfully generated answer for task: ${task.title}`);
        // Convert Mongoose document to GraphQL type
        return {
            id: savedAnswer._id.toString(),
            taskId: savedAnswer.taskId,
            answer: savedAnswer.answer,
            solution: savedAnswer.solution,
            testCases: savedAnswer.testCases?.map(tc => ({
                input: tc.input,
                expectedOutput: tc.expectedOutput,
                explanation: tc.explanation || undefined
            })),
            answerValidation: {
                format: savedAnswer.answerValidation.format,
                correctAnswers: savedAnswer.answerValidation.correctAnswers,
                multipleChoiceOptions: savedAnswer.answerValidation.multipleChoiceOptions?.map(opt => ({
                    letter: opt.letter,
                    text: opt.text,
                    isCorrect: opt.isCorrect
                })),
                partialCreditAnswers: savedAnswer.answerValidation.partialCreditAnswers,
                validationRules: savedAnswer.answerValidation.validationRules
            },
            aiGenerated: savedAnswer.aiGenerated,
            generatedAt: savedAnswer.generatedAt,
            createdAt: savedAnswer.createdAt,
            updatedAt: savedAnswer.updatedAt
        };
    }
    catch (error) {
        console.error('Error generating task answer:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        throw new graphql_1.GraphQLError(`Failed to generate task answer: ${errorMessage}`);
    }
};
exports.generateTaskAnswer = generateTaskAnswer;
//# sourceMappingURL=generate-task-answer.js.map