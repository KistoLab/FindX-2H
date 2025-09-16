import { Schema, Model } from "mongoose";
type ChallengeRoomResponseSchemaType = {
    challengeRoomId: Schema.Types.ObjectId;
    studentId: Schema.Types.ObjectId;
    submittedAnswer: string;
    isCorrect: boolean;
    points: number;
    submittedAt: Date;
};
export declare const ChallengeRoomResponseModel: Model<ChallengeRoomResponseSchemaType>;
export {};
//# sourceMappingURL=ChallengeRoomResponse.model.d.ts.map