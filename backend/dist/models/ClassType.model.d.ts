import { Model, Schema } from "mongoose";
export declare enum ClassYear {
    GRADE_1 = "1\u0440 \u0430\u043D\u0433\u0438",
    GRADE_2 = "2\u0440 \u0430\u043D\u0433\u0438",
    GRADE_3 = "3\u0440 \u0430\u043D\u0433\u0438",
    GRADE_4 = "4\u0440 \u0430\u043D\u0433\u0438",
    GRADE_5 = "5\u0440 \u0430\u043D\u0433\u0438",
    GRADE_6 = "6\u0440 \u0430\u043D\u0433\u0438",
    GRADE_7 = "7\u0440 \u0430\u043D\u0433\u0438",
    GRADE_8 = "8\u0440 \u0430\u043D\u0433\u0438",
    GRADE_9 = "9\u0440 \u0430\u043D\u0433\u0438",
    GRADE_10 = "10\u0440 \u0430\u043D\u0433\u0438",
    GRADE_11 = "11\u0440 \u0430\u043D\u0433\u0438",
    GRADE_12 = "12\u0440 \u0430\u043D\u0433\u0438"
}
type ClassTypeSchemaType = {
    olympiadId: Schema.Types.ObjectId;
    classYear: ClassYear;
    maxScore: number;
    questions: Schema.Types.ObjectId[];
    participants: Schema.Types.ObjectId[];
    studentsResults: Schema.Types.ObjectId[];
    medalists: number;
};
export declare const ClassTypeModel: Model<ClassTypeSchemaType>;
export {};
//# sourceMappingURL=ClassType.model.d.ts.map