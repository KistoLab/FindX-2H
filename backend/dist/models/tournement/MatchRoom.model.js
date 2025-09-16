"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchRoomModel = exports.MatchStatus = void 0;
const mongoose_1 = require("mongoose");
var MatchStatus;
(function (MatchStatus) {
    MatchStatus["PENDING"] = "PENDING";
    MatchStatus["COMPLETED"] = "COMPLETED";
})(MatchStatus || (exports.MatchStatus = MatchStatus = {}));
const matchRoomSchema = new mongoose_1.Schema({
    task: { type: String, required: true },
    round: { type: String, required: true },
    scheduleAt: { type: Date, required: true },
    slotA: { type: mongoose_1.Schema.Types.ObjectId, ref: "Student", required: true },
    slotB: { type: mongoose_1.Schema.Types.ObjectId, ref: "Student", required: true },
    winner: { type: mongoose_1.Schema.Types.ObjectId, ref: "Student" },
    loser: { type: mongoose_1.Schema.Types.ObjectId, ref: "Student" },
    tournament: { type: mongoose_1.Schema.Types.ObjectId, ref: "Tournament", required: true },
    status: {
        type: String,
        enum: Object.values(MatchStatus),
        default: MatchStatus.PENDING,
        required: true,
    },
}, { timestamps: true } // Create болон update цагийг автоматаар хадгалах
);
exports.MatchRoomModel = mongoose_1.models["MatchRoom"] || (0, mongoose_1.model)("MatchRoom", matchRoomSchema);
//# sourceMappingURL=MatchRoom.model.js.map