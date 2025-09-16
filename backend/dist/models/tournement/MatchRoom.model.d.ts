import { Model, Schema } from "mongoose";
export declare enum MatchStatus {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED"
}
type MatchRoomSchemaType = {
    id: string;
    task: string;
    round: string;
    scheduleAt: Date;
    slotA: Schema.Types.ObjectId;
    slotB: Schema.Types.ObjectId;
    winner?: Schema.Types.ObjectId;
    loser?: Schema.Types.ObjectId;
    tournament: Schema.Types.ObjectId;
    status: MatchStatus;
};
export declare const MatchRoomModel: Model<MatchRoomSchemaType>;
export {};
//# sourceMappingURL=MatchRoom.model.d.ts.map