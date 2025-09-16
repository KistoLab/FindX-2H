"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchRoomModel = void 0;
const mongoose_1 = require("mongoose");
const matchRoomSchema = new mongoose_1.Schema({
    matchId: mongoose_1.Schema.Types.ObjectId,
    participants: [mongoose_1.Schema.Types.ObjectId],
    task: String,
    submissions: [mongoose_1.Schema.Types.ObjectId],
    status: String,
    winner: mongoose_1.Schema.Types.ObjectId,
    startedAt: Date,
    endedAt: Date,
});
exports.MatchRoomModel = mongoose_1.models["MatchRoom"] || (0, mongoose_1.model)("MatchRoom", matchRoomSchema);
//# sourceMappingURL=MatchRoom.model.js.map