"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMatchRoom = void 0;
const models_1 = require("../../../models");
const getMatchRoom = async (_, { id }) => {
    const match = await models_1.MatchRoomModel.findById(id).populate(["slotA", "slotB"]);
    if (!match) {
        throw new Error("Match not found");
    }
    return {
        id: match._id.toString(),
        round: match.round,
        scheduleAt: match.scheduleAt.toISOString(),
        slotA: match.slotA.toString(),
        slotB: match.slotB.toString(),
        tournament: match.tournament.toString(),
        tournamentId: match.tournament.toString(),
        winner: match.winner?.toString(),
        task: match.task,
        status: "PENDING",
    };
};
exports.getMatchRoom = getMatchRoom;
//# sourceMappingURL=get-match.js.map