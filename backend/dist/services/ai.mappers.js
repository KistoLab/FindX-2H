"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIMappers = void 0;
const generated_1 = require("@/types/generated");
class AIMappers {
    static mapTopicToString(topic) {
        switch (topic) {
            case generated_1.Topic.Math:
                return 'mathematics';
            case generated_1.Topic.English:
                return 'English language learning';
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
                return 'mathematics';
        }
    }
    static mapDifficultyToString(difficulty) {
        switch (difficulty) {
            case generated_1.Difficulty.Easy:
                return 'easy';
            case generated_1.Difficulty.Medium:
                return 'medium';
            case generated_1.Difficulty.Hard:
                return 'hard';
            default:
                return 'easy';
        }
    }
    static mapClassTypeToString(classType) {
        switch (classType) {
            case generated_1.TaskClassType.Grade_1:
                return 'Grade 1';
            case generated_1.TaskClassType.Grade_2:
                return 'Grade 2';
            case generated_1.TaskClassType.Grade_3:
                return 'Grade 3';
            case generated_1.TaskClassType.Grade_4:
                return 'Grade 4';
            case generated_1.TaskClassType.Grade_5:
                return 'Grade 5';
            case generated_1.TaskClassType.Grade_6:
                return 'Grade 6';
            case generated_1.TaskClassType.Grade_7:
                return 'Grade 7';
            case generated_1.TaskClassType.Grade_8:
                return 'Grade 8';
            case generated_1.TaskClassType.Grade_9:
                return 'Grade 9';
            case generated_1.TaskClassType.Grade_10:
                return 'Grade 10';
            case generated_1.TaskClassType.Grade_11:
                return 'Grade 11';
            case generated_1.TaskClassType.Grade_12:
                return 'Grade 12';
            default:
                return 'Grade 5';
        }
    }
    /**
     * Get topic-specific content descriptions for different grade levels
     */
    static getTopicContentByGrade(topic, gradeRange) {
        const topicContentMap = {
            [generated_1.Topic.Math]: {
                '1-3': 'basic counting, simple addition, basic subtraction, number recognition',
                '4-5': 'multiplication, division, fractions, basic geometry',
                '6-8': 'algebra basics, geometry, statistics, basic problem solving',
                '9-12': 'advanced algebra, calculus, trigonometry, complex problem solving'
            },
            [generated_1.Topic.English]: {
                '1-3': 'letter recognition, basic reading, simple sentences, vocabulary',
                '4-5': 'grammar basics, reading comprehension, creative writing, spelling',
                '6-8': 'literature analysis, essay writing, advanced grammar, poetry',
                '9-12': 'advanced literature, critical analysis, advanced writing, rhetoric'
            },
            [generated_1.Topic.History]: {
                '1-3': 'basic historical events, famous people, simple timelines',
                '4-5': 'historical periods, important events, basic historical concepts',
                '6-8': 'historical analysis, cause and effect, historical research',
                '9-12': 'advanced history, historical methodology, complex historical analysis'
            },
            [generated_1.Topic.Biology]: {
                '1-3': 'basic life concepts, simple plants, basic animals',
                '4-5': 'basic biology, simple ecosystems, basic life processes',
                '6-8': 'cell biology, genetics, evolution, ecosystems',
                '9-12': 'advanced biology, molecular biology, ecology, biotechnology'
            },
            [generated_1.Topic.Physics]: {
                '1-3': 'basic motion, simple forces, basic energy concepts',
                '4-5': 'basic physics, simple machines, basic energy',
                '6-8': 'mechanics, electricity, magnetism, basic thermodynamics',
                '9-12': 'advanced physics, quantum mechanics, relativity, modern physics'
            },
            [generated_1.Topic.Chemistry]: {
                '1-3': 'basic materials, simple properties, basic changes',
                '4-5': 'basic chemistry, simple reactions, basic elements',
                '6-8': 'atomic structure, chemical reactions, periodic table',
                '9-12': 'advanced chemistry, organic chemistry, physical chemistry'
            },
            [generated_1.Topic.Linguistics]: {
                '1-3': 'basic language concepts, simple word patterns, basic communication',
                '4-5': 'basic linguistics, simple language analysis, basic communication',
                '6-8': 'linguistics basics, language analysis, basic communication theory',
                '9-12': 'advanced linguistics, language theory, complex communication systems'
            }
        };
        return topicContentMap[topic]?.[gradeRange] || 'basic concepts appropriate for the grade level';
    }
    /**
     * Get allowed topics for each grade range
     */
    static getAllowedTopicsByGrade(gradeRange) {
        const allowedTopicsByGrade = {
            '1-3': [generated_1.Topic.Math, generated_1.Topic.English],
            '4-5': [generated_1.Topic.Math, generated_1.Topic.English, generated_1.Topic.History],
            '6-8': [generated_1.Topic.Math, generated_1.Topic.English, generated_1.Topic.History, generated_1.Topic.Biology, generated_1.Topic.Physics, generated_1.Topic.Chemistry],
            '9-12': Object.values(generated_1.Topic) // All topics allowed for high school
        };
        return allowedTopicsByGrade[gradeRange] || [];
    }
    /**
     * Get a default appropriate topic for a grade range
     */
    static getDefaultTopicForGrade(gradeRange) {
        switch (gradeRange) {
            case '1-3':
                return generated_1.Topic.Math; // Math is always appropriate for young kids
            case '4-5':
                return generated_1.Topic.English; // English is engaging and appropriate
            case '6-8':
                return generated_1.Topic.Biology; // Intro to science
            case '9-12':
                return generated_1.Topic.Physics; // Default to physics for high school
            default:
                return generated_1.Topic.Math;
        }
    }
    /**
     * Validate if a topic is appropriate for a grade level
     */
    static validateTopicForGrade(topic, classType) {
        const gradeNumber = this.getGradeNumber(classType);
        const gradeRange = this.getGradeRange(gradeNumber);
        const allowedTopics = this.getAllowedTopicsByGrade(gradeRange);
        return allowedTopics.includes(topic);
    }
    /**
     * Get grade number from class type
     */
    static getGradeNumber(classType) {
        switch (classType) {
            case generated_1.TaskClassType.Grade_1: return 1;
            case generated_1.TaskClassType.Grade_2: return 2;
            case generated_1.TaskClassType.Grade_3: return 3;
            case generated_1.TaskClassType.Grade_4: return 4;
            case generated_1.TaskClassType.Grade_5: return 5;
            case generated_1.TaskClassType.Grade_6: return 6;
            case generated_1.TaskClassType.Grade_7: return 7;
            case generated_1.TaskClassType.Grade_8: return 8;
            case generated_1.TaskClassType.Grade_9: return 9;
            case generated_1.TaskClassType.Grade_10: return 10;
            case generated_1.TaskClassType.Grade_11: return 11;
            case generated_1.TaskClassType.Grade_12: return 12;
            default: return 5;
        }
    }
    /**
     * Get grade range from grade number
     */
    static getGradeRange(gradeNumber) {
        if (gradeNumber <= 3)
            return '1-3';
        if (gradeNumber <= 5)
            return '4-5';
        if (gradeNumber <= 8)
            return '6-8';
        return '9-12';
    }
    /**
     * Validate topic for grade and return appropriate topic
     */
    static getValidatedTopic(topic, classType) {
        if (this.validateTopicForGrade(topic, classType)) {
            return topic;
        }
        // Return a default appropriate topic for the grade
        const gradeNumber = this.getGradeNumber(classType);
        const gradeRange = this.getGradeRange(gradeNumber);
        return this.getDefaultTopicForGrade(gradeRange);
    }
    /**
     * Map task type to string
     */
    static mapTaskTypeToString(type) {
        switch (type) {
            case 'CHALLENGE':
                return 'Challenge';
            case 'TOURNAMENT':
                return 'Tournament';
            default:
                return 'Challenge';
        }
    }
    /**
     * Get age-appropriate topic description
     */
    static getAgeAppropriateTopic(topic, classType) {
        const gradeNumber = this.getGradeNumber(classType);
        const gradeRange = this.getGradeRange(gradeNumber);
        return this.getTopicContentByGrade(topic, gradeRange);
    }
}
exports.AIMappers = AIMappers;
//# sourceMappingURL=ai.mappers.js.map