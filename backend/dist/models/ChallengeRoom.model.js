"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChallengeRoomModel = void 0;
const mongoose_1 = require("mongoose");
var Status;
(function (Status) {
    Status["WAITING"] = "WAITING";
    Status["ACTIVE"] = "ACTIVE";
    Status["FINISHED"] = "FINISHED";
})(Status || (Status = {}));
const challengeRoomSchema = new mongoose_1.Schema({
    challengeId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Challenge",
        required: true,
    },
    challengerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },
    opponentId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Student", required: true },
    status: {
        type: String,
        enum: Object.values(Status),
        required: true,
        default: Status.WAITING,
    },
    winnerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Student",
        required: false,
    },
    challengerScore: { type: Number, required: true, default: 0 },
    opponentScore: { type: Number, required: true, default: 0 },
}, { timestamps: true });
exports.ChallengeRoomModel = mongoose_1.models["ChallengeRoom"] || (0, mongoose_1.model)("ChallengeRoom", challengeRoomSchema);
//# sourceMappingURL=ChallengeRoom.model.js.map