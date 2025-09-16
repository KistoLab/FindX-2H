"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIService = void 0;
const ai_prompts_1 = require("./ai.prompts");
const ai_client_1 = require("./ai.client");
const ai_parser_1 = require("./ai.parser");
class AIService {
    static async generateTask(request) {
        try {
            console.log('🤖 Starting AI task generation...');
            const prompt = ai_prompts_1.AIPrompts.buildTaskPrompt(request);
            console.log('📝 Generated prompt for AI service');
            const response = await ai_client_1.AIClient.callOpenAI(prompt);
            console.log('✅ AI service responded successfully');
            const generatedContent = ai_parser_1.AIParser.parseTaskResponse(response);
            console.log('📋 Parsed AI response:', { title: generatedContent.title });
            return generatedContent;
        }
        catch (error) {
            console.error('❌ AI generation failed:', error);
            throw error;
        }
    }
    static async generateTaskAnswer(taskData) {
        try {
            console.log('🤖 Starting AI answer generation...');
            const prompt = ai_prompts_1.AIPrompts.buildAnswerPrompt(taskData);
            console.log('📝 Generated answer prompt for AI service');
            const response = await ai_client_1.AIClient.callOpenAIForAnswer(prompt);
            console.log('✅ AI service responded successfully');
            const generatedContent = ai_parser_1.AIParser.parseAnswerResponse(response);
            console.log('📋 Parsed AI answer response');
            return generatedContent;
        }
        catch (error) {
            console.error('❌ AI answer generation failed:', error);
            throw error;
        }
    }
    static async generateAnswer(prompt) {
        try {
            console.log('🤖 Starting AI answer generation...');
            const response = await ai_client_1.AIClient.callOpenAIForAnswer(prompt);
            console.log('✅ AI service responded successfully');
            return response;
        }
        catch (error) {
            console.error('❌ AI answer generation failed:', error);
            throw error;
        }
    }
}
exports.AIService = AIService;
//# sourceMappingURL=ai.service.new.js.map