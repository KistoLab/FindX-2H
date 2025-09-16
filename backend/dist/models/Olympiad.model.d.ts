import { Model, Schema } from "mongoose";
type OlympiadSchemaType = {
    name: string;
    description: string;
    date: Date;
    location: string;
    organizer: Schema.Types.ObjectId;
    classtypes: Schema.Types.ObjectId[];
    scoreOfAward?: number;
    status: "PENDING" | "APPROVED";
};
export declare const OlympiadModel: Model<OlympiadSchemaType>;
export {};
//# sourceMappingURL=Olympiad.model.d.ts.map