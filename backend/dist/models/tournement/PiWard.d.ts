import { Model, Schema } from "mongoose";
type PiWardStudent = {
    studentId: Schema.Types.ObjectId;
    points: number;
    place: number;
};
type PiWardSchemaType = {
    tournamentId: Schema.Types.ObjectId;
    students: PiWardStudent[];
};
export declare const PiWardModel: Model<PiWardSchemaType>;
export {};
//# sourceMappingURL=PiWard.d.ts.map