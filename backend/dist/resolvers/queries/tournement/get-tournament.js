"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTournament = void 0;
const Tournament_model_1 = require("@/models/tournement/Tournament.model");
const getTournament = async (_, { id }) => {
    const tournament = await Tournament_model_1.TournamentModel.findById(id).populate("rounds");
    if (!tournament)
        throw new Error("Tournament not found");
    return {
        id: tournament._id.toString(),
        name: tournament.name,
        description: tournament.description,
        date: tournament.date.toISOString(),
        size: tournament.size,
        maxScore: tournament.maxScore,
        piPoints: tournament.piPoints,
        piWards: tournament.piWards.map((id) => id.toString()),
        closedAt: tournament.closedAt.toISOString(),
        rounds: tournament.rounds,
        participants: tournament.participants.map((id) => id.toString()),
        status: tournament.status,
        topic: tournament.topic,
        createdAt: tournament.createdAt.toISOString(),
        updatedAt: tournament.updatedAt.toISOString(),
    };
};
exports.getTournament = getTournament;
//# sourceMappingURL=get-tournament.js.map