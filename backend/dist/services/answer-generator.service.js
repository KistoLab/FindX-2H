"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerGeneratorService = void 0;
const generated_1 = require("@/types/generated");
const Answer_model_1 = require("@/models/Answer.model");
const Task_model_1 = require("@/models/Task.model");
const ai_service_new_1 = require("./ai.service.new");
class AnswerGeneratorService {
    /**
     * Converts model types to GraphQL types
     */
    static mapModelToGraphQLTypes(modelTopic, modelClassType) {
        // Map topic string to GraphQL enum (only allowed topics)
        const topicMap = {
            'MATH': generated_1.Topic.Math,
            'ENGLISH': generated_1.Topic.English,
            'HISTORY': generated_1.Topic.History,
            'BIOLOGY': generated_1.Topic.Biology,
            'PHYSICS': generated_1.Topic.Physics,
            'CHEMISTRY': generated_1.Topic.Chemistry,
            'LINGUISTICS': generated_1.Topic.Linguistics,
        };
        // Map class type
        const classTypeMap = {
            [Task_model_1.ClassType.GRADE_1]: generated_1.TaskClassType.Grade_1,
            [Task_model_1.ClassType.GRADE_2]: generated_1.TaskClassType.Grade_2,
            [Task_model_1.ClassType.GRADE_3]: generated_1.TaskClassType.Grade_3,
            [Task_model_1.ClassType.GRADE_4]: generated_1.TaskClassType.Grade_4,
            [Task_model_1.ClassType.GRADE_5]: generated_1.TaskClassType.Grade_5,
            [Task_model_1.ClassType.GRADE_6]: generated_1.TaskClassType.Grade_6,
            [Task_model_1.ClassType.GRADE_7]: generated_1.TaskClassType.Grade_7,
            [Task_model_1.ClassType.GRADE_8]: generated_1.TaskClassType.Grade_8,
            [Task_model_1.ClassType.GRADE_9]: generated_1.TaskClassType.Grade_9,
            [Task_model_1.ClassType.GRADE_10]: generated_1.TaskClassType.Grade_10,
            [Task_model_1.ClassType.GRADE_11]: generated_1.TaskClassType.Grade_11,
            [Task_model_1.ClassType.GRADE_12]: generated_1.TaskClassType.Grade_12,
        };
        return {
            topic: topicMap[modelTopic] || generated_1.Topic.Math, // Default fallback
            classType: classTypeMap[modelClassType]
        };
    }
    /**
     * Determines the appropriate answer format based on topic and grade level
     */
    static getAnswerFormat(topic, classType) {
        const gradeNumber = this.getGradeNumber(classType);
        // Advanced topics get more complex formats for higher grades
        const isAdvancedTopic = [
            generated_1.Topic.Math,
            generated_1.Topic.Physics,
            generated_1.Topic.Chemistry
        ].includes(topic);
        // Advanced format for advanced topics in Grade 7+
        if (isAdvancedTopic && gradeNumber >= 7) {
            return Answer_model_1.AnswerFormat.CODE_SOLUTION;
        }
        // Grade-appropriate formats for other topics
        if (gradeNumber <= 3) {
            // Grades 1-3: Simple formats
            if (topic === generated_1.Topic.Math)
                return Answer_model_1.AnswerFormat.SINGLE_NUMBER;
            if (topic === generated_1.Topic.English)
                return Answer_model_1.AnswerFormat.SINGLE_WORD;
            return Answer_model_1.AnswerFormat.MULTIPLE_CHOICE;
        }
        else if (gradeNumber <= 6) {
            // Grades 4-6: Moderate formats
            if (topic === generated_1.Topic.Math)
                return Answer_model_1.AnswerFormat.SINGLE_NUMBER;
            if (topic === generated_1.Topic.English)
                return Answer_model_1.AnswerFormat.SHORT_TEXT;
            if ([generated_1.Topic.Biology, generated_1.Topic.Chemistry, generated_1.Topic.Physics].includes(topic)) {
                return Answer_model_1.AnswerFormat.MULTIPLE_CHOICE;
            }
            return Answer_model_1.AnswerFormat.SHORT_TEXT;
        }
        else if (gradeNumber <= 9) {
            // Grades 7-9: More complex formats
            if (topic === generated_1.Topic.Math)
                return Answer_model_1.AnswerFormat.SINGLE_NUMBER;
            if (topic === generated_1.Topic.English)
                return Answer_model_1.AnswerFormat.SHORT_TEXT;
            if ([generated_1.Topic.Biology, generated_1.Topic.Chemistry, generated_1.Topic.Physics].includes(topic)) {
                return Answer_model_1.AnswerFormat.SHORT_TEXT;
            }
            return Answer_model_1.AnswerFormat.SHORT_TEXT;
        }
        else {
            // Grades 10-12: Advanced formats
            if (topic === generated_1.Topic.Math)
                return Answer_model_1.AnswerFormat.SINGLE_NUMBER;
            if (topic === generated_1.Topic.English)
                return Answer_model_1.AnswerFormat.LONG_TEXT;
            if ([generated_1.Topic.Biology, generated_1.Topic.Chemistry, generated_1.Topic.Physics].includes(topic)) {
                return Answer_model_1.AnswerFormat.LONG_TEXT;
            }
            return Answer_model_1.AnswerFormat.LONG_TEXT;
        }
    }
    /**
     * Generates appropriate answer format based on topic and grade
     */
    static async generateAnswerFormat(request) {
        const format = this.getAnswerFormat(request.topic, request.classType);
        const gradeNumber = this.getGradeNumber(request.classType);
        // For all answer formats, analyze the problem statement to get the correct answer
        return this.generateContentAwareAnswer(request, gradeNumber, format);
    }
    static generateSingleNumberAnswer(request, gradeNumber) {
        // For math problems, generate a simple numeric answer
        const answer = this.generateMathAnswer(request, gradeNumber);
        return {
            answer,
            solution: `The answer is ${answer}. This is a simple math problem appropriate for Grade ${gradeNumber} students.`,
            answerValidation: {
                format: Answer_model_1.AnswerFormat.SINGLE_NUMBER,
                correctAnswers: [answer],
                partialCreditAnswers: [answer.replace(/\.0$/, ''), answer.replace(/^0+/, '')],
                validationRules: "Exact numeric match required, with tolerance for formatting differences"
            }
        };
    }
    static generateSingleWordAnswer(request, gradeNumber) {
        // For English/word problems, generate a simple word answer
        const answer = this.generateWordAnswer(request, gradeNumber);
        return {
            answer,
            solution: `The correct answer is "${answer}". This is a simple word problem appropriate for Grade ${gradeNumber} students.`,
            answerValidation: {
                format: Answer_model_1.AnswerFormat.SINGLE_WORD,
                correctAnswers: [answer.toLowerCase()],
                partialCreditAnswers: [answer.toLowerCase(), answer.toUpperCase()],
                validationRules: "Case-insensitive word match"
            }
        };
    }
    static async generateContentAwareAnswer(request, gradeNumber, format) {
        try {
            // Use AI to analyze the problem statement and determine the correct answer
            const aiPrompt = `
Analyze this question and determine the correct answer:

Title: ${request.title}
Description: ${request.description}
Problem Statement: ${request.problemStatement}
Topic: ${request.topic}
Grade Level: ${request.classType}
Answer Format: ${format}

CRITICAL INSTRUCTIONS:
1. FIRST, identify the question format:
   - If you see "A) B) C) D)" options, this is MULTIPLE CHOICE
   - If you see a math problem without options, this is SINGLE_NUMBER or SHORT_TEXT
   - If you see drawing instructions, this is DRAWING

2. FOR MULTIPLE CHOICE QUESTIONS:
   - Solve the math problem first (e.g., 3 + 2 = 5)
   - Find which option contains the correct answer (e.g., B) 5)
   - Return the LETTER of the correct option (e.g., "B")

3. FOR SINGLE_NUMBER QUESTIONS:
   - Solve the math problem
   - Return just the number (e.g., "5")

4. FOR SHORT_TEXT QUESTIONS:
   - Solve the math problem step by step
   - Return the final numeric answer (e.g., "23")
   - If it's a word problem, return the answer to the question asked

5. FOR DRAWING QUESTIONS:
   - Determine what should be drawn/calculated
   - Return the answer to the calculation part

MATH PROBLEM SOLVING STEPS:
- Read the problem carefully
- Identify what numbers are given
- Identify what operation(s) are needed
- Solve step by step
- Double-check your calculation
- Return the final answer

EXAMPLES:
- "What is 3 + 2? A) 4 B) 5 C) 6 D) 7" → Answer: "B" (because 3+2=5, and B) 5)
- "What is 3 + 2?" → Answer: "5" (just the number)
- "Mia has 20 candies, eats 5, gets 8 more. How many now?" → Answer: "23" (20-5+8=23)
- "Draw 5 circles + 3 triangles. How many total?" → Answer: "8"

Return ONLY valid JSON in this exact format:
{
  "correctAnswer": "B",
  "solution": "Step 1: Calculate 3 + 2 = 5. Step 2: Find option with 5. Step 3: B) 5 is correct, so answer is B",
  "options": [
    {"letter": "A", "text": "4", "isCorrect": false},
    {"letter": "B", "text": "5", "isCorrect": true},
    {"letter": "C", "text": "6", "isCorrect": false},
    {"letter": "D", "text": "7", "isCorrect": false}
  ]
}
`;
            const aiResponse = await ai_service_new_1.AIService.generateAnswer(aiPrompt);
            console.log('🤖 Raw AI Answer Response:', aiResponse);
            // Clean the AI response (remove markdown code blocks)
            const cleanedResponse = this.cleanAIResponse(aiResponse);
            console.log('🧹 Cleaned AI Answer Response:', cleanedResponse);
            // Parse the AI response
            const answerData = JSON.parse(cleanedResponse);
            console.log('📋 Parsed Answer Data:', answerData);
            // Create answer validation based on the format
            let answerValidation = {
                format: format,
                correctAnswers: [answerData.correctAnswer],
                validationRules: this.getValidationRules(format)
            };
            // Add format-specific fields
            if (format === Answer_model_1.AnswerFormat.MULTIPLE_CHOICE && answerData.options && answerData.options !== null) {
                answerValidation.multipleChoiceOptions = answerData.options;
            }
            return {
                answer: answerData.correctAnswer,
                solution: answerData.solution,
                answerValidation: answerValidation
            };
        }
        catch (error) {
            console.error('AI answer generation failed, falling back to simple generation:', error);
            // Fallback to simple generation based on format
            switch (format) {
                case Answer_model_1.AnswerFormat.SINGLE_NUMBER:
                    return this.generateSingleNumberAnswer(request, gradeNumber);
                case Answer_model_1.AnswerFormat.SINGLE_WORD:
                    return this.generateSingleWordAnswer(request, gradeNumber);
                case Answer_model_1.AnswerFormat.MULTIPLE_CHOICE:
                    return this.generateMultipleChoiceAnswer(request, gradeNumber);
                case Answer_model_1.AnswerFormat.SHORT_TEXT:
                    return this.generateShortTextAnswer(request, gradeNumber);
                case Answer_model_1.AnswerFormat.LONG_TEXT:
                    return this.generateLongTextAnswer(request, gradeNumber);
                case Answer_model_1.AnswerFormat.CODE_SOLUTION:
                    return this.generateCodeSolutionAnswer(request, gradeNumber);
                case Answer_model_1.AnswerFormat.TRUE_FALSE:
                    return this.generateTrueFalseAnswer(request, gradeNumber);
                default:
                    return this.generateShortTextAnswer(request, gradeNumber);
            }
        }
    }
    static generateMultipleChoiceAnswer(request, gradeNumber) {
        // Generate multiple choice options
        const correctAnswer = this.generateCorrectAnswer(request, gradeNumber);
        const options = this.generateMultipleChoiceOptions(request, gradeNumber, correctAnswer);
        return {
            answer: correctAnswer.letter,
            solution: `The correct answer is ${correctAnswer.letter}: ${correctAnswer.text}. This is a multiple choice question appropriate for Grade ${gradeNumber} students.`,
            answerValidation: {
                format: Answer_model_1.AnswerFormat.MULTIPLE_CHOICE,
                correctAnswers: [correctAnswer.letter],
                multipleChoiceOptions: options,
                validationRules: "Single letter selection (A, B, C, D)"
            }
        };
    }
    static generateShortTextAnswer(request, gradeNumber) {
        const answer = this.generateTextAnswer(request, gradeNumber, 'short');
        return {
            answer,
            solution: `The correct answer is: ${answer}. This is a short text response appropriate for Grade ${gradeNumber} students.`,
            answerValidation: {
                format: Answer_model_1.AnswerFormat.SHORT_TEXT,
                correctAnswers: [answer.toLowerCase()],
                partialCreditAnswers: [answer.toLowerCase(), answer.toUpperCase()],
                validationRules: "Case-insensitive text match, partial credit for similar answers"
            }
        };
    }
    static generateLongTextAnswer(request, gradeNumber) {
        const answer = this.generateTextAnswer(request, gradeNumber, 'long');
        return {
            answer,
            solution: `The correct answer is: ${answer}. This is a detailed text response appropriate for Grade ${gradeNumber} students.`,
            answerValidation: {
                format: Answer_model_1.AnswerFormat.LONG_TEXT,
                correctAnswers: [answer.toLowerCase()],
                partialCreditAnswers: [answer.toLowerCase(), answer.toUpperCase()],
                validationRules: "Case-insensitive text match with keyword analysis for partial credit"
            }
        };
    }
    static generateCodeSolutionAnswer(request, gradeNumber) {
        // This is the LeetCode-style format for Computer Science topics
        const testCases = this.generateTestCases(request, gradeNumber);
        const answer = this.generateCodeAnswer(request, gradeNumber);
        return {
            answer,
            solution: `This is a competitive programming problem appropriate for Grade ${gradeNumber} students. The solution involves algorithmic thinking and coding skills.`,
            answerValidation: {
                format: Answer_model_1.AnswerFormat.CODE_SOLUTION,
                correctAnswers: [answer],
                validationRules: "Code solution that passes all test cases"
            },
            testCases
        };
    }
    static generateTrueFalseAnswer(request, gradeNumber) {
        const isTrue = Math.random() > 0.5;
        const answer = isTrue ? "True" : "False";
        return {
            answer,
            solution: `The correct answer is ${answer}. This is a true/false question appropriate for Grade ${gradeNumber} students.`,
            answerValidation: {
                format: Answer_model_1.AnswerFormat.TRUE_FALSE,
                correctAnswers: [answer],
                validationRules: "Exact match: 'True' or 'False'"
            }
        };
    }
    // Helper methods for generating specific types of answers
    static generateMathAnswer(request, gradeNumber) {
        // Generate appropriate math answers based on grade level
        if (gradeNumber <= 3) {
            return Math.floor(Math.random() * 20 + 1).toString(); // 1-20
        }
        else if (gradeNumber <= 6) {
            return Math.floor(Math.random() * 100 + 1).toString(); // 1-100
        }
        else {
            return Math.floor(Math.random() * 1000 + 1).toString(); // 1-1000
        }
    }
    static generateWordAnswer(request, gradeNumber) {
        const simpleWords = ['cat', 'dog', 'bird', 'fish', 'tree', 'house', 'car', 'book'];
        const mediumWords = ['animal', 'plant', 'machine', 'building', 'vehicle', 'instrument'];
        const complexWords = ['organism', 'mechanism', 'architecture', 'transportation', 'apparatus'];
        if (gradeNumber <= 3) {
            return simpleWords[Math.floor(Math.random() * simpleWords.length)];
        }
        else if (gradeNumber <= 6) {
            return mediumWords[Math.floor(Math.random() * mediumWords.length)];
        }
        else {
            return complexWords[Math.floor(Math.random() * complexWords.length)];
        }
    }
    static generateCorrectAnswer(request, gradeNumber) {
        const letters = ['A', 'B', 'C', 'D'];
        const correctLetter = letters[Math.floor(Math.random() * letters.length)];
        let correctText = '';
        if (request.topic === generated_1.Topic.Math) {
            correctText = this.generateMathAnswer(request, gradeNumber);
        }
        else if (request.topic === generated_1.Topic.English) {
            correctText = this.generateWordAnswer(request, gradeNumber);
        }
        else {
            correctText = 'Correct option';
        }
        return { letter: correctLetter, text: correctText };
    }
    static generateMultipleChoiceOptions(request, gradeNumber, correct) {
        const letters = ['A', 'B', 'C', 'D'];
        const options = [];
        for (const letter of letters) {
            if (letter === correct.letter) {
                options.push({ letter, text: correct.text, isCorrect: true });
            }
            else {
                options.push({
                    letter,
                    text: `Option ${letter}`,
                    isCorrect: false
                });
            }
        }
        return options;
    }
    static generateTextAnswer(request, gradeNumber, length) {
        if (length === 'short') {
            return `Short answer for Grade ${gradeNumber}`;
        }
        else {
            return `Detailed answer for Grade ${gradeNumber} students that explains the concept thoroughly.`;
        }
    }
    static generateCodeAnswer(request, gradeNumber) {
        return `def solution(input_data):
    # Solution for Grade ${gradeNumber} students
    return result`;
    }
    static generateTestCases(request, gradeNumber) {
        return [
            {
                input: "sample input 1",
                expectedOutput: "expected output 1",
                explanation: "Test case 1 explanation"
            },
            {
                input: "sample input 2",
                expectedOutput: "expected output 2",
                explanation: "Test case 2 explanation"
            }
        ];
    }
    static cleanAIResponse(response) {
        try {
            let cleanedResponse = response
                .replace(/```json\n?/g, '')
                .replace(/```\n?$/g, '')
                .replace(/^```/g, '')
                .trim();
            const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                cleanedResponse = jsonMatch[0];
            }
            return cleanedResponse;
        }
        catch (error) {
            console.error('Error cleaning AI response:', error);
            return response;
        }
    }
    static getValidationRules(format) {
        switch (format) {
            case Answer_model_1.AnswerFormat.SINGLE_NUMBER:
                return "Exact numeric match required, with tolerance for formatting differences";
            case Answer_model_1.AnswerFormat.SINGLE_WORD:
                return "Case-insensitive word match";
            case Answer_model_1.AnswerFormat.MULTIPLE_CHOICE:
                return "Single letter selection (A, B, C, D)";
            case Answer_model_1.AnswerFormat.SHORT_TEXT:
                return "Case-insensitive text match, partial credit for similar answers";
            case Answer_model_1.AnswerFormat.LONG_TEXT:
                return "Case-insensitive text match with keyword analysis for partial credit";
            case Answer_model_1.AnswerFormat.CODE_SOLUTION:
                return "Code solution that passes all test cases";
            case Answer_model_1.AnswerFormat.TRUE_FALSE:
                return "Exact match: 'True' or 'False'";
            case Answer_model_1.AnswerFormat.DRAWING:
                return "Visual assessment of drawing accuracy";
            default:
                return "General answer validation";
        }
    }
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
}
exports.AnswerGeneratorService = AnswerGeneratorService;
//# sourceMappingURL=answer-generator.service.js.map