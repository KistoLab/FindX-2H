"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateService = void 0;
const taskstemplates_1 = require("./taskstemplates");
const grade_appropriate_templates_1 = require("./taskstemplates/grade-appropriate-templates");
const generated_1 = require("@/types/generated");
class TemplateService {
    static generateFromTemplate(request) {
        console.log('📚 Using template system for topic:', request.topic, 'difficulty:', request.difficulty, 'grade:', request.classType);
        // Use grade-appropriate templates for all allowed topics
        if (request.classType && this.isAllowedTopic(request.topic)) {
            const topicString = this.mapTopicToString(request.topic);
            const template = (0, grade_appropriate_templates_1.getGradeAppropriateTemplate)(topicString, this.mapDifficultyToString(request.difficulty), request.classType);
            console.log('🎯 Selected grade-appropriate template:', template.title);
            return template;
        }
        // Fallback to original template system for other topics
        const topicString = this.mapTopicToString(request.topic);
        const difficultyString = this.mapDifficultyToString(request.difficulty);
        const template = (0, taskstemplates_1.getRandomTemplate)(topicString, difficultyString);
        console.log('🎯 Selected template:', template.title);
        return template;
    }
    static generateUniqueTemplate(request, usedTemplates) {
        console.log('📚 Using unique template system for topic:', request.topic, 'difficulty:', request.difficulty, 'grade:', request.classType);
        // Use grade-appropriate templates for all allowed topics
        if (request.classType && this.isAllowedTopic(request.topic)) {
            const topicString = this.mapTopicToString(request.topic);
            let attempts = 0;
            const maxAttempts = 20;
            while (attempts < maxAttempts) {
                const template = (0, grade_appropriate_templates_1.getGradeAppropriateTemplate)(topicString, this.mapDifficultyToString(request.difficulty), request.classType);
                const templateKey = `${template.title}-${template.description}`;
                if (!usedTemplates.has(templateKey)) {
                    usedTemplates.add(templateKey);
                    console.log('🎯 Selected unique grade-appropriate template:', template.title);
                    return template;
                }
                attempts++;
            }
            console.log('⚠️ Could not find unique grade-appropriate template, returning any available template');
            const template = (0, grade_appropriate_templates_1.getGradeAppropriateTemplate)(topicString, this.mapDifficultyToString(request.difficulty), request.classType);
            console.log('🎯 Selected fallback grade-appropriate template:', template.title);
            return template;
        }
        // Fallback to original template system for other topics
        const topicString = this.mapTopicToString(request.topic);
        const difficultyString = this.mapDifficultyToString(request.difficulty);
        let attempts = 0;
        const maxAttempts = 20;
        while (attempts < maxAttempts) {
            const template = (0, taskstemplates_1.getRandomTemplate)(topicString, difficultyString);
            const templateKey = `${template.title}-${template.description}`;
            if (!usedTemplates.has(templateKey)) {
                usedTemplates.add(templateKey);
                console.log('🎯 Selected unique template:', template.title);
                return template;
            }
            attempts++;
        }
        console.log('⚠️ Could not find unique template, returning any available template');
        const template = (0, taskstemplates_1.getRandomTemplate)(topicString, difficultyString);
        console.log('🎯 Selected fallback template:', template.title);
        return template;
    }
    static isAllowedTopic(topic) {
        const allowedTopics = [
            generated_1.Topic.Math,
            generated_1.Topic.English,
            generated_1.Topic.History,
            generated_1.Topic.Biology,
            generated_1.Topic.Physics,
            generated_1.Topic.Chemistry,
            generated_1.Topic.Linguistics
        ];
        return allowedTopics.includes(topic);
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
    static mapDifficultyToString(difficulty) {
        switch (difficulty) {
            case generated_1.Difficulty.Easy:
                return 'EASY';
            case generated_1.Difficulty.Medium:
                return 'MEDIUM';
            case generated_1.Difficulty.Hard:
                return 'HARD';
            default:
                return 'EASY';
        }
    }
}
exports.TemplateService = TemplateService;
//# sourceMappingURL=template.service.js.map