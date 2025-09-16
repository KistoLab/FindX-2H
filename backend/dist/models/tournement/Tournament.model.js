"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TournamentModel = void 0;
const mongoose_1 = require("mongoose");
var Status;
(function (Status) {
    Status["OPENING"] = "OPENING";
    Status["ONGOING"] = "ONGOING";
    Status["FINISHED"] = "FINISHED";
})(Status || (Status = {}));
const tournamentSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    participants: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "Student",
        required: true,
    },
    date: { type: Date, required: true },
    size: { type: Number, required: true },
    maxScore: { type: Number, required: true },
    piPoints: { type: Number, required: true },
    piWards: { type: [mongoose_1.Schema.Types.ObjectId], ref: "PiWard", required: true },
    closedAt: { type: Date, required: true },
    rounds: { type: [mongoose_1.Schema.Types.ObjectId], ref: "MatchRoom", required: true },
    status: {
        type: String,
        enum: Object.values(Status),
        required: true,
        default: Status.OPENING
    },
    topic: { type: String, required: true },
}, { timestamps: true });
exports.TournamentModel = mongoose_1.models["Tournament"] || (0, mongoose_1.model)("Tournament", tournamentSchema);
//# sourceMappingURL=Tournament.model.js.map