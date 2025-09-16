import { AIGenerationRequest, TaskData } from "./ai.types";
export declare class AIPrompts {
    static buildTaskPrompt(request: AIGenerationRequest): string;
    static buildAnswerPrompt(taskData: TaskData): string;
    private static getDifficultySpecificInstructions;
    private static getGradeLevel;
    private static getDifficultySpecs;
    private static getClassSpecs;
    private static getProblemFormatFromAnswerFormat;
    private static getProblemFormat;
    private static getFormatGuidelines;
    private static getFormatSpecificRequirements;
    private static getGradeNumber;
    private static getProblemStatementTemplate;
}
//# sourceMappingURL=ai.prompts.d.ts.map