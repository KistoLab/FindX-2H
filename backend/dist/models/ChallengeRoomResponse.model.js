"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChallengeRoomResponseModel = void 0;
const mongoose_1 = require("mongoose");
const challengeRoomResponseSchema = new mongoose_1.Schema({
    challengeRoomId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "ChallengeRoom",
        required: true,
    },
    studentId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Student", required: true },
    submittedAnswer: { type: String, required: true },
    isCorrect: { type: Boolean, required: true },
    points: { type: Number, required: true },
    submittedAt: { type: Date, required: true },
}, { timestamps: true });
exports.ChallengeRoomResponseModel = mongoose_1.models["ChallengeRoomResponse"] ||
    (0, mongoose_1.model)("ChallengeRoomResponse", challengeRoomResponseSchema);
//# sourceMappingURL=ChallengeRoomResponse.model.js.map