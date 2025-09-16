"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvailableDifficulties = exports.getAvailableTopics = exports.getRandomTemplate = exports.allTemplates = void 0;
const math_templates_1 = require("./math.templates");
const english_templates_1 = require("./english.templates");
const history_templates_1 = require("./history.templates");
const biology_templates_1 = require("./biology.templates");
const physics_templates_1 = require("./physics.templates");
const chemistry_templates_1 = require("./chemistry.templates");
const linguistics_templates_1 = require("./linguistics.templates");
exports.allTemplates = {
    math: math_templates_1.mathTemplates,
    english: english_templates_1.englishTemplates,
    history: history_templates_1.historyTemplates,
    biology: biology_templates_1.biologyTemplates,
    physics: physics_templates_1.physicsTemplates,
    chemistry: chemistry_templates_1.chemistryTemplates,
    linguistics: linguistics_templates_1.linguisticsTemplates,
};
const getRandomTemplate = (topic, difficulty) => {
    const topicTemplates = exports.allTemplates[topic.toLowerCase()] || exports.allTemplates['math'];
    const difficultyTemplates = topicTemplates[difficulty] || topicTemplates['EASY'];
    // Get all available templates for this difficulty
    const availableTemplates = Object.values(difficultyTemplates);
    // Return a random template
    const randomIndex = Math.floor(Math.random() * availableTemplates.length);
    return availableTemplates[randomIndex];
};
exports.getRandomTemplate = getRandomTemplate;
const getAvailableTopics = () => {
    return Object.keys(exports.allTemplates);
};
exports.getAvailableTopics = getAvailableTopics;
const getAvailableDifficulties = (topic) => {
    const topicTemplates = exports.allTemplates[topic.toLowerCase()] || exports.allTemplates['math'];
    return Object.keys(topicTemplates);
};
exports.getAvailableDifficulties = getAvailableDifficulties;
//# sourceMappingURL=index.js.map