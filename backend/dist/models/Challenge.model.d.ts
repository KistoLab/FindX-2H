import { Model, Schema } from "mongoose";
declare enum Difficulty {
    EASY = "EASY",
    MEDIUM = "MEDIUM",
    HARD = "HARD"
}
declare enum Status {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED"
}
type ChallengeSchemaType = {
    topic: string;
    difficulty: Difficulty;
    participants: Schema.Types.ObjectId[];
    challenger: Schema.Types.ObjectId;
    opponent: Schema.Types.ObjectId;
    winner: Schema.Types.ObjectId;
    piPoints: number;
    status: Status;
    tasks: Schema.Types.ObjectId[];
    classType: string;
};
export declare const ChallengeModel: Model<ChallengeSchemaType>;
export {};
//# sourceMappingURL=Challenge.model.d.ts.map