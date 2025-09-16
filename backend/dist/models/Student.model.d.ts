import { Model, Schema } from "mongoose";
type StudentSchemaType = {
    id: string;
    school: string;
    class: string;
    location: string;
    name: string;
    profilePicture: string;
    email: string;
    totalScore: number;
    piPoints: number;
    participatedOlympiads: Schema.Types.ObjectId[];
};
export declare const StudentModel: Model<StudentSchemaType>;
export {};
//# sourceMappingURL=Student.model.d.ts.map