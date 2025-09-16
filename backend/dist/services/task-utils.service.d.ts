import { TaskType as ModelTaskType, Difficulty as ModelDifficulty, ClassType as ModelClassType } from "@/models/Task.model";
import { Task, Difficulty as GraphQLDifficulty, TaskType as GraphQLTaskType, Topic as GraphQLTopic, TaskClassType as GraphQLClassType, AnswerFormat as GraphQLAnswerFormat } from "@/types/generated";
import { GeneratedTaskResponse } from "./ai.service.new";
export interface TaskGenerationRequest {
    topic: GraphQLTopic;
    difficulty: GraphQLDifficulty;
    type: GraphQLTaskType;
    classType: GraphQLClassType;
    piPoints: number;
    taskCount?: number;
    answerFormat?: GraphQLAnswerFormat;
}
export interface DifficultyDistribution {
    easy?: number;
    medium?: number;
    hard?: number;
}
export interface MultipleTaskGenerationRequest {
    topic: GraphQLTopic;
    type: GraphQLTaskType;
    classType: GraphQLClassType;
    piPoints: number;
    taskCount: number;
    difficultyDistribution?: DifficultyDistribution;
    answerFormat?: GraphQLAnswerFormat;
}
export declare class TaskUtilsService {
    static mapDifficultyToModel(difficulty: GraphQLDifficulty): ModelDifficulty;
    static mapTaskTypeToModel(type: GraphQLTaskType): ModelTaskType;
    static mapClassTypeToModel(classType: GraphQLClassType): ModelClassType;
    static mapTopicToString(topic: GraphQLTopic): string;
    static transformToGraphQLTask(taskDoc: any, originalDifficulty: GraphQLDifficulty, originalTopic: GraphQLTopic, originalClassType: GraphQLClassType): Task;
    static formatProblemStatement(problemStatement: string): string;
    static createTaskInDatabase(content: GeneratedTaskResponse, request: TaskGenerationRequest, aiGenerated: boolean): Promise<any>;
    static calculateDifficultyDistribution(taskCount: number, difficultyDistribution?: DifficultyDistribution): {
        difficulty: GraphQLDifficulty;
        count: number;
    }[];
}
//# sourceMappingURL=task-utils.service.d.ts.map