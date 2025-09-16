import { Model, Schema } from "mongoose";
export declare enum TaskType {
    CHALLENGE = "CHALLENGE",
    TOURNAMENT = "TOURNAMENT"
}
export declare enum Difficulty {
    EASY = "EASY",
    MEDIUM = "MEDIUM",
    HARD = "HARD"
}
export declare enum ClassType {
    GRADE_1 = "GRADE_1",
    GRADE_2 = "GRADE_2",
    GRADE_3 = "GRADE_3",
    GRADE_4 = "GRADE_4",
    GRADE_5 = "GRADE_5",
    GRADE_6 = "GRADE_6",
    GRADE_7 = "GRADE_7",
    GRADE_8 = "GRADE_8",
    GRADE_9 = "GRADE_9",
    GRADE_10 = "GRADE_10",
    GRADE_11 = "GRADE_11",
    GRADE_12 = "GRADE_12"
}
type TaskSchemaType = {
    id: string;
    title: string;
    description: string;
    topic: string;
    difficulty: Difficulty;
    type: TaskType;
    classType: ClassType;
    piPoints: number;
    aiGenerated: boolean;
    generatedAt: Date;
    usageCount: number;
    problemStatement: string;
    createdAt: Date;
    updatedAt: Date;
};
export declare const taskSchema: Schema<TaskSchemaType, Model<TaskSchemaType, any, any, any, import("mongoose").Document<unknown, any, TaskSchemaType, any, {}> & TaskSchemaType & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TaskSchemaType, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<TaskSchemaType>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<TaskSchemaType> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const TaskModel: Model<TaskSchemaType>;
export {};
//# sourceMappingURL=Task.model.d.ts.map