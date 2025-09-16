import { Topic as GraphQLTopic, TaskClassType as GraphQLClassType } from "@/types/generated";
import { AnswerFormat } from "@/models/Answer.model";
import { ClassType as ModelClassType } from "@/models/Task.model";
export interface AnswerGenerationRequest {
    topic: GraphQLTopic;
    classType: GraphQLClassType;
    title: string;
    description: string;
    problemStatement: string;
}
export interface AnswerGenerationResponse {
    answer: string;
    solution: string;
    answerValidation: {
        format: AnswerFormat;
        correctAnswers: string[];
        multipleChoiceOptions?: Array<{
            letter: string;
            text: string;
            isCorrect: boolean;
        }>;
        partialCreditAnswers?: string[];
        validationRules?: string;
    };
    testCases?: Array<{
        input: string;
        expectedOutput: string;
        explanation?: string;
    }>;
}
export declare class AnswerGeneratorService {
    /**
     * Converts model types to GraphQL types
     */
    static mapModelToGraphQLTypes(modelTopic: string, modelClassType: ModelClassType): {
        topic: GraphQLTopic;
        classType: GraphQLClassType;
    };
    /**
     * Determines the appropriate answer format based on topic and grade level
     */
    static getAnswerFormat(topic: GraphQLTopic, classType: GraphQLClassType): AnswerFormat;
    /**
     * Generates appropriate answer format based on topic and grade
     */
    static generateAnswerFormat(request: AnswerGenerationRequest): Promise<AnswerGenerationResponse>;
    private static generateSingleNumberAnswer;
    private static generateSingleWordAnswer;
    private static generateContentAwareAnswer;
    private static generateMultipleChoiceAnswer;
    private static generateShortTextAnswer;
    private static generateLongTextAnswer;
    private static generateCodeSolutionAnswer;
    private static generateTrueFalseAnswer;
    private static generateMathAnswer;
    private static generateWordAnswer;
    private static generateCorrectAnswer;
    private static generateMultipleChoiceOptions;
    private static generateTextAnswer;
    private static generateCodeAnswer;
    private static generateTestCases;
    private static cleanAIResponse;
    private static getValidationRules;
    private static getGradeNumber;
}
//# sourceMappingURL=answer-generator.service.d.ts.map