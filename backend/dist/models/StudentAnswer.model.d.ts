import { Model, Schema } from "mongoose";
type StudentAnswerSchemaType = {
    studentId: Schema.Types.ObjectId;
    classTypeId: Schema.Types.ObjectId;
    answers: {
        questionId: Schema.Types.ObjectId;
        score: number;
    }[];
    totalScoreofOlympiad?: number;
};
export declare const StudentAnswerModel: Model<StudentAnswerSchemaType>;
export {};
//# sourceMappingURL=StudentAnswer.model.d.ts.map