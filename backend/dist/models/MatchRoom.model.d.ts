import { Model, Schema } from "mongoose";
type MatchRoomSchemaType = {
    matchId: Schema.Types.ObjectId;
    participants: [Schema.Types.ObjectId];
    task: string;
    submissions: [Schema.Types.ObjectId];
    status: string;
    winner: Schema.Types.ObjectId;
    startedAt: Date;
    endedAt: Date;
};
export declare const MatchRoomModel: Model<MatchRoomSchemaType>;
export {};
//# sourceMappingURL=MatchRoom.model.d.ts.map