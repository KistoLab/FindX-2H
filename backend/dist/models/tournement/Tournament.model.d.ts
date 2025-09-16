import { Model, Schema } from "mongoose";
declare enum Status {
    OPENING = "OPENING",
    ONGOING = "ONGOING",
    FINISHED = "FINISHED"
}
type TournamentSchemaType = {
    id: string;
    name: string;
    description: string;
    date: Date;
    size: number;
    maxScore: number;
    piPoints: number;
    piWards: Schema.Types.ObjectId[];
    closedAt: Date;
    rounds: Schema.Types.ObjectId[];
    participants: Schema.Types.ObjectId[];
    status: Status;
    topic: string;
};
export declare const TournamentModel: Model<TournamentSchemaType>;
export {};
//# sourceMappingURL=Tournament.model.d.ts.map