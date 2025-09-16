import { GeneratedTaskResponse } from "./ai.service.new";
import { Topic as GraphQLTopic, Difficulty as GraphQLDifficulty, TaskClassType as GraphQLClassType } from "@/types/generated";
export interface TemplateGenerationRequest {
    topic: GraphQLTopic;
    difficulty: GraphQLDifficulty;
    classType?: GraphQLClassType;
}
export declare class TemplateService {
    static generateFromTemplate(request: TemplateGenerationRequest): GeneratedTaskResponse;
    static generateUniqueTemplate(request: TemplateGenerationRequest, usedTemplates: Set<string>): GeneratedTaskResponse;
    private static isAllowedTopic;
    private static mapTopicToString;
    private static mapDifficultyToString;
}
//# sourceMappingURL=template.service.d.ts.map