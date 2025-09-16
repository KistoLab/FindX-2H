import { Task } from "@/types/generated";
import { TaskGenerationRequest, MultipleTaskGenerationRequest } from "./task-utils.service";
export declare class TaskGeneratorService {
    static generateMultipleTasks(request: MultipleTaskGenerationRequest): Promise<Task[]>;
    static generateMultipleTasksWithFormatOptions(request: MultipleTaskGenerationRequest, answerFormatDistribution?: any): Promise<Task[]>;
    static generateTask(request: TaskGenerationRequest): Promise<Task>;
    private static createFallbackTask;
}
//# sourceMappingURL=taskGenerator.service.d.ts.map