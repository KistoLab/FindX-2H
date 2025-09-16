import { Model, Schema } from "mongoose";
declare enum Status {
    WAITING = "WAITING",
    ACTIVE = "ACTIVE",
    FINISHED = "FINISHED"
}
type ChallengeRoomSchemaType = {
    challengeId: Schema.Types.ObjectId;
    challengerId: Schema.Types.ObjectId;
    opponentId: Schema.Types.ObjectId;
    status: Status;
    winnerId: Schema.Types.ObjectId;
    challengerScore: number;
    opponentScore: number;
};
export declare const ChallengeRoomModel: Model<ChallengeRoomSchemaType>;
export {};
//# sourceMappingURL=ChallengeRoom.model.d.ts.map