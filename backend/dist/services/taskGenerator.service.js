"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskGeneratorService = void 0;
const ai_service_new_1 = require("./ai.service.new");
const template_service_1 = require("./template.service");
const task_utils_service_1 = require("./task-utils.service");
class TaskGeneratorService {
    static async generateMultipleTasks(request) {
        console.log('🎯 Starting multiple task generation...', {
            taskCount: request.taskCount,
            difficultyDistribution: request.difficultyDistribution
        });
        const taskCount = Math.min(Math.max(request.taskCount, 1), 3); // Limited to 3 for OpenAI API constraints
        console.log(`📊 Generating ${taskCount} tasks for topic: ${request.topic}`);
        const difficultyDistribution = task_utils_service_1.TaskUtilsService.calculateDifficultyDistribution(taskCount, request.difficultyDistribution);
        console.log('📈 Difficulty distribution:', difficultyDistribution);
        const tasks = [];
        const usedTemplates = new Set();
        // Generate tasks for each difficulty level
        for (const { difficulty, count } of difficultyDistribution) {
            if (count === 0)
                continue;
            console.log(`🔄 Generating ${count} ${difficulty} tasks...`);
            for (let i = 0; i < count; i++) {
                try {
                    // Add some randomization to make tasks more unique
                    const randomSeed = Math.random().toString(36).substring(7);
                    const taskVariation = `Task ${i + 1} of ${count} - ${randomSeed}`;
                    const aiRequest = {
                        topic: request.topic,
                        difficulty: difficulty,
                        type: request.type,
                        classType: request.classType,
                        piPoints: request.piPoints,
                        answerFormat: request.answerFormat,
                        variation: taskVariation
                    };
                    const generatedContent = await ai_service_new_1.AIService.generateTask(aiRequest);
                    const taskDoc = await task_utils_service_1.TaskUtilsService.createTaskInDatabase(generatedContent, { ...request, difficulty }, true);
                    console.log('💾 Task saved to database with AI generation');
                    const task = task_utils_service_1.TaskUtilsService.transformToGraphQLTask(taskDoc, difficulty, request.topic, request.classType);
                    tasks.push(task);
                    if (i < count - 1) {
                        console.log('⏳ Waiting 5 seconds to avoid rate limiting...');
                        await new Promise(resolve => setTimeout(resolve, 5000));
                    }
                }
                catch (error) {
                    console.error('❌ AI generation failed for task, falling back to templates:', error);
                    if (error instanceof Error && error.message === 'RATE_LIMIT_EXCEEDED') {
                        console.log('⏳ Rate limit exceeded, waiting 5 seconds before trying again...');
                        await new Promise(resolve => setTimeout(resolve, 5000));
                        try {
                            const aiRequest = {
                                topic: request.topic,
                                difficulty: difficulty,
                                type: request.type,
                                classType: request.classType,
                                piPoints: request.piPoints,
                                answerFormat: request.answerFormat
                            };
                            const generatedContent = await ai_service_new_1.AIService.generateTask(aiRequest);
                            const taskDoc = await task_utils_service_1.TaskUtilsService.createTaskInDatabase(generatedContent, { ...request, difficulty }, true);
                            const task = task_utils_service_1.TaskUtilsService.transformToGraphQLTask(taskDoc, difficulty, request.topic, request.classType);
                            tasks.push(task);
                            continue;
                        }
                        catch (retryError) {
                            console.error('❌ AI generation failed again after retry, using templates');
                        }
                    }
                    const templateRequest = {
                        topic: request.topic,
                        difficulty: difficulty,
                        classType: request.classType
                    };
                    const fallbackContent = template_service_1.TemplateService.generateUniqueTemplate(templateRequest, usedTemplates);
                    const fallbackTask = await this.createFallbackTask({ ...request, difficulty }, fallbackContent);
                    tasks.push(fallbackTask);
                }
            }
        }
        console.log(`🎉 Successfully generated ${tasks.length} tasks`);
        return tasks;
    }
    static async generateMultipleTasksWithFormatOptions(request, answerFormatDistribution // Internal AnswerFormat distribution
    ) {
        console.log('🎯 Starting multiple task generation with format options...', {
            taskCount: request.taskCount,
            difficultyDistribution: request.difficultyDistribution,
            answerFormatDistribution
        });
        const taskCount = Math.min(Math.max(request.taskCount, 1), 3); // Limited to 3 for OpenAI API constraints
        console.log(`📊 Generating ${taskCount} tasks for topic: ${request.topic}`);
        const difficultyDistribution = task_utils_service_1.TaskUtilsService.calculateDifficultyDistribution(taskCount, request.difficultyDistribution);
        console.log('📈 Difficulty distribution:', difficultyDistribution);
        const tasks = [];
        const usedTemplates = new Set();
        // Generate tasks for each difficulty level
        for (const { difficulty, count } of difficultyDistribution) {
            if (count === 0)
                continue;
            console.log(`🔄 Generating ${count} ${difficulty} tasks...`);
            for (let i = 0; i < count; i++) {
                try {
                    // Add some randomization to make tasks more unique
                    const randomSeed = Math.random().toString(36).substring(7);
                    const taskVariation = `Task ${i + 1} of ${count} - ${randomSeed}`;
                    // Determine answer format for this specific task
                    let answerFormat;
                    if (answerFormatDistribution) {
                        // Use difficulty-specific format
                        const difficultyKey = difficulty.toLowerCase();
                        answerFormat = answerFormatDistribution[difficultyKey];
                    }
                    else {
                        // Use the original single format
                        answerFormat = request.answerFormat;
                    }
                    const aiRequest = {
                        topic: request.topic,
                        difficulty: difficulty,
                        type: request.type,
                        classType: request.classType,
                        piPoints: request.piPoints,
                        answerFormat,
                        variation: taskVariation
                    };
                    const generatedContent = await ai_service_new_1.AIService.generateTask(aiRequest);
                    const taskDoc = await task_utils_service_1.TaskUtilsService.createTaskInDatabase(generatedContent, { ...request, difficulty: difficulty }, true);
                    console.log('💾 Task saved to database with AI generation');
                    const task = task_utils_service_1.TaskUtilsService.transformToGraphQLTask(taskDoc, difficulty, request.topic, request.classType);
                    tasks.push(task);
                    if (i < count - 1) {
                        console.log('⏳ Waiting 5 seconds to avoid rate limiting...');
                        await new Promise(resolve => setTimeout(resolve, 5000));
                    }
                }
                catch (error) {
                    console.error('❌ AI generation failed for task, falling back to templates:', error);
                    if (error instanceof Error && error.message === 'RATE_LIMIT_EXCEEDED') {
                        console.log('⏳ Rate limit exceeded, waiting 5 seconds before trying again...');
                        await new Promise(resolve => setTimeout(resolve, 5000));
                        try {
                            const aiRequest = {
                                topic: request.topic,
                                difficulty: difficulty,
                                type: request.type,
                                classType: request.classType,
                                piPoints: request.piPoints,
                                answerFormat: request.answerFormat,
                                variation: `Retry ${i + 1} of ${count}`
                            };
                            const generatedContent = await ai_service_new_1.AIService.generateTask(aiRequest);
                            const taskDoc = await task_utils_service_1.TaskUtilsService.createTaskInDatabase(generatedContent, { ...request, difficulty: difficulty }, true);
                            const task = task_utils_service_1.TaskUtilsService.transformToGraphQLTask(taskDoc, difficulty, request.topic, request.classType);
                            tasks.push(task);
                            continue;
                        }
                        catch (retryError) {
                            console.error('❌ AI generation failed again after retry, using templates');
                        }
                    }
                    const templateRequest = {
                        topic: request.topic,
                        difficulty: difficulty,
                        classType: request.classType
                    };
                    const fallbackContent = template_service_1.TemplateService.generateUniqueTemplate(templateRequest, usedTemplates);
                    const fallbackTask = await this.createFallbackTask({ ...request, difficulty: difficulty }, fallbackContent);
                    tasks.push(fallbackTask);
                }
            }
        }
        console.log(`🎉 Successfully generated ${tasks.length} tasks with format options`);
        return tasks;
    }
    static async generateTask(request) {
        try {
            console.log('🤖 Starting AI task generation...');
            const aiRequest = {
                topic: request.topic,
                difficulty: request.difficulty,
                type: request.type,
                classType: request.classType,
                piPoints: request.piPoints,
                answerFormat: request.answerFormat
            };
            const generatedContent = await ai_service_new_1.AIService.generateTask(aiRequest);
            const taskDoc = await task_utils_service_1.TaskUtilsService.createTaskInDatabase(generatedContent, request, true);
            console.log('💾 Task saved to database with AI generation');
            return task_utils_service_1.TaskUtilsService.transformToGraphQLTask(taskDoc, request.difficulty, request.topic, request.classType);
        }
        catch (error) {
            console.error('❌ AI generation failed, falling back to templates:', error);
            const templateRequest = {
                topic: request.topic,
                difficulty: request.difficulty,
                classType: request.classType
            };
            const fallbackContent = template_service_1.TemplateService.generateFromTemplate(templateRequest);
            return this.createFallbackTask(request, fallbackContent);
        }
    }
    static async createFallbackTask(request, content) {
        const taskDoc = await task_utils_service_1.TaskUtilsService.createTaskInDatabase(content, request, false);
        return task_utils_service_1.TaskUtilsService.transformToGraphQLTask(taskDoc, request.difficulty, request.topic, request.classType);
    }
}
exports.TaskGeneratorService = TaskGeneratorService;
//# sourceMappingURL=taskGenerator.service.js.map