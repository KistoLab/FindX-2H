import { AIGenerationRequest, GeneratedTaskResponse, GeneratedAnswerResponse, TaskData } from "./ai.types";
export type { AIGenerationRequest, GeneratedTaskResponse, GeneratedAnswerResponse } from "./ai.types";
export declare class AIService {
    static generateTask(request: AIGenerationRequest): Promise<GeneratedTaskResponse>;
    static generateTaskAnswer(taskData: TaskData): Promise<GeneratedAnswerResponse>;
    static generateAnswer(prompt: string): Promise<string>;
}
//# sourceMappingURL=ai.service.new.d.ts.map