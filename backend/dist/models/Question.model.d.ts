import { Model, Schema } from "mongoose";
type QuestionSchemaType = {
    classTypeId: Schema.Types.ObjectId;
    questionName: string;
    maxScore: number;
};
export declare const QuestionModel: Model<QuestionSchemaType>;
export {};
//# sourceMappingURL=Question.model.d.ts.map