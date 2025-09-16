import { Model, Schema } from "mongoose";
export declare enum AnswerFormat {
    SINGLE_NUMBER = "SINGLE_NUMBER",
    SINGLE_WORD = "SINGLE_WORD",
    MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
    SHORT_TEXT = "SHORT_TEXT",
    LONG_TEXT = "LONG_TEXT",
    CODE_SOLUTION = "CODE_SOLUTION",
    DRAWING = "DRAWING",
    TRUE_FALSE = "TRUE_FALSE"
}
type MultipleChoiceOption = {
    letter: string;
    text: string;
    isCorrect: boolean;
};
type AnswerValidation = {
    format: AnswerFormat;
    correctAnswers: string[];
    multipleChoiceOptions?: MultipleChoiceOption[];
    partialCreditAnswers?: string[];
    validationRules?: string;
};
type AnswerSchemaType = {
    id: string;
    taskId: string;
    answer: string;
    solution: string;
    testCases?: Array<{
        input: string;
        expectedOutput: string;
        explanation?: string;
    }>;
    answerValidation: AnswerValidation;
    aiGenerated: boolean;
    generatedAt: Date;
    createdAt: Date;
    updatedAt: Date;
};
export declare const answerSchema: Schema<AnswerSchemaType, Model<AnswerSchemaType, any, any, any, import("mongoose").Document<unknown, any, AnswerSchemaType, any, {}> & AnswerSchemaType & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AnswerSchemaType, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<AnswerSchemaType>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<AnswerSchemaType> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const AnswerModel: Model<AnswerSchemaType>;
export {};
//# sourceMappingURL=Answer.model.d.ts.map