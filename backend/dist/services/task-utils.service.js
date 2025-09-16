"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskUtilsService = void 0;
const Task_model_1 = require("@/models/Task.model");
const Task_model_2 = require("@/models/Task.model");
const generated_1 = require("@/types/generated");
class TaskUtilsService {
    static mapDifficultyToModel(difficulty) {
        switch (difficulty) {
            case generated_1.Difficulty.Easy:
                return Task_model_2.Difficulty.EASY;
            case generated_1.Difficulty.Medium:
                return Task_model_2.Difficulty.MEDIUM;
            case generated_1.Difficulty.Hard:
                return Task_model_2.Difficulty.HARD;
            default:
                return Task_model_2.Difficulty.EASY;
        }
    }
    static mapTaskTypeToModel(type) {
        switch (type) {
            case generated_1.TaskType.Challenge:
                return Task_model_2.TaskType.CHALLENGE;
            case generated_1.TaskType.Tournament:
                return Task_model_2.TaskType.TOURNAMENT;
            default:
                return Task_model_2.TaskType.CHALLENGE;
        }
    }
    static mapClassTypeToModel(classType) {
        switch (classType) {
            case generated_1.TaskClassType.Grade_1:
                return Task_model_2.ClassType.GRADE_1;
            case generated_1.TaskClassType.Grade_2:
                return Task_model_2.ClassType.GRADE_2;
            case generated_1.TaskClassType.Grade_3:
                return Task_model_2.ClassType.GRADE_3;
            case generated_1.TaskClassType.Grade_4:
                return Task_model_2.ClassType.GRADE_4;
            case generated_1.TaskClassType.Grade_5:
                return Task_model_2.ClassType.GRADE_5;
            case generated_1.TaskClassType.Grade_6:
                return Task_model_2.ClassType.GRADE_6;
            case generated_1.TaskClassType.Grade_7:
                return Task_model_2.ClassType.GRADE_7;
            case generated_1.TaskClassType.Grade_8:
                return Task_model_2.ClassType.GRADE_8;
            case generated_1.TaskClassType.Grade_9:
                return Task_model_2.ClassType.GRADE_9;
            case generated_1.TaskClassType.Grade_10:
                return Task_model_2.ClassType.GRADE_10;
            case generated_1.TaskClassType.Grade_11:
                return Task_model_2.ClassType.GRADE_11;
            case generated_1.TaskClassType.Grade_12:
                return Task_model_2.ClassType.GRADE_12;
            default:
                return Task_model_2.ClassType.GRADE_5;
        }
    }
    static mapTopicToString(topic) {
        switch (topic) {
            case generated_1.Topic.Math:
                return 'math';
            case generated_1.Topic.English:
                return 'english';
            case generated_1.Topic.History:
                return 'history';
            case generated_1.Topic.Biology:
                return 'biology';
            case generated_1.Topic.Physics:
                return 'physics';
            case generated_1.Topic.Chemistry:
                return 'chemistry';
            case generated_1.Topic.Linguistics:
                return 'linguistics';
            default:
                return 'math';
        }
    }
    static transformToGraphQLTask(taskDoc, originalDifficulty, originalTopic, originalClassType) {
        return {
            __typename: 'Task',
            id: taskDoc._id.toString(),
            title: taskDoc.title,
            description: taskDoc.description,
            topic: originalTopic,
            difficulty: originalDifficulty,
            type: taskDoc.type === Task_model_2.TaskType.CHALLENGE ? generated_1.TaskType.Challenge : generated_1.TaskType.Tournament,
            classType: originalClassType,
            piPoints: taskDoc.piPoints,
            problemStatement: this.formatProblemStatement(taskDoc.problemStatement || ''),
            aiGenerated: taskDoc.aiGenerated,
            generatedAt: taskDoc.generatedAt,
            usageCount: taskDoc.usageCount,
            createdAt: taskDoc.createdAt || new Date(),
            updatedAt: taskDoc.updatedAt || new Date()
        };
    }
    static formatProblemStatement(problemStatement) {
        return problemStatement.replace(/\\n/g, '\n');
    }
    static async createTaskInDatabase(content, request, aiGenerated) {
        const modelDifficulty = this.mapDifficultyToModel(request.difficulty);
        const modelType = this.mapTaskTypeToModel(request.type);
        const modelClassType = this.mapClassTypeToModel(request.classType);
        const topicString = this.mapTopicToString(request.topic);
        return await Task_model_1.TaskModel.create({
            title: content.title,
            description: content.description,
            topic: topicString,
            difficulty: modelDifficulty,
            type: modelType,
            classType: modelClassType,
            piPoints: request.piPoints,
            problemStatement: content.problemStatement || '',
            aiGenerated: aiGenerated,
            generatedAt: new Date(),
            usageCount: 0
        });
    }
    static calculateDifficultyDistribution(taskCount, difficultyDistribution) {
        if (!difficultyDistribution) {
            const countPerDifficulty = Math.floor(taskCount / 3);
            const remainder = taskCount % 3;
            return [
                { difficulty: generated_1.Difficulty.Easy, count: countPerDifficulty + (remainder > 0 ? 1 : 0) },
                { difficulty: generated_1.Difficulty.Medium, count: countPerDifficulty + (remainder > 1 ? 1 : 0) },
                { difficulty: generated_1.Difficulty.Hard, count: countPerDifficulty }
            ];
        }
        const { easy = 0, medium = 0, hard = 0 } = difficultyDistribution;
        const totalSpecified = easy + medium + hard;
        if (totalSpecified === 0) {
            return this.calculateDifficultyDistribution(taskCount);
        }
        if (totalSpecified !== taskCount) {
            const scale = taskCount / totalSpecified;
            return [
                { difficulty: generated_1.Difficulty.Easy, count: Math.round(easy * scale) },
                { difficulty: generated_1.Difficulty.Medium, count: Math.round(medium * scale) },
                { difficulty: generated_1.Difficulty.Hard, count: Math.round(hard * scale) }
            ];
        }
        return [
            { difficulty: generated_1.Difficulty.Easy, count: easy },
            { difficulty: generated_1.Difficulty.Medium, count: medium },
            { difficulty: generated_1.Difficulty.Hard, count: hard }
        ].filter(item => item.count > 0);
    }
}
exports.TaskUtilsService = TaskUtilsService;
//# sourceMappingURL=task-utils.service.js.map