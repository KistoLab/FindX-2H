"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWinner = void 0;
const MatchRoom_model_1 = require("@/models/tournement/MatchRoom.model");
const Tournament_model_1 = require("@/models/tournement/Tournament.model");
const get_round_name_1 = require("./get-round-name");
const updateWinner = async (_, { input }) => {
    const match = await MatchRoom_model_1.MatchRoomModel.findById(input.matchId);
    if (!match)
        throw new Error("Match олдсонгүй");
    // Winner орсон үед loser-ийг автоматаар оруулах
    if (match.slotB) {
        const validWinnerIds = [match.slotA?.toString(), match.slotB?.toString()];
        if (!validWinnerIds.includes(input.winnerId)) {
            throw new Error("Ялагч нь зөвхөн тухайн тоглолтын оролцогчдын нэг байх ёстой");
        }
        match.winner = input.winnerId;
        match.loser =
            match.slotA?.toString() === input.winnerId ? match.slotB : match.slotA;
    }
    else {
        // Bye match
        match.winner = match.slotA;
        match.loser = null;
    }
    match.status = MatchRoom_model_1.MatchStatus.COMPLETED;
    await match.save();
    const tournament = await Tournament_model_1.TournamentModel.findById(match.tournament);
    if (!tournament)
        throw new Error("Tournament олдсонгүй");
    // Энэ шатны бүх тоглолт дууссан эсэхийг шалгах
    const currentRound = match.round;
    const finishedMatches = await MatchRoom_model_1.MatchRoomModel.find({
        _id: { $in: tournament.rounds },
        round: currentRound,
        status: MatchRoom_model_1.MatchStatus.COMPLETED,
    });
    const totalMatchesThisRound = await MatchRoom_model_1.MatchRoomModel.countDocuments({
        _id: { $in: tournament.rounds },
        round: currentRound,
    });
    if (finishedMatches.length === totalMatchesThisRound) {
        // Дараагийн шатны winners
        const winners = finishedMatches
            .map((m) => m.winner?.toString())
            .filter(Boolean);
        if (winners.length > 1) {
            const nextRound = (0, get_round_name_1.getRoundName)(winners.length);
            for (let i = 0; i < winners.length; i += 2) {
                if (!winners[i + 1]) {
                    // Odd бол bye match
                    const byeMatch = await MatchRoom_model_1.MatchRoomModel.create({
                        task: "Bye match",
                        round: nextRound,
                        scheduleAt: new Date(),
                        slotA: winners[i],
                        slotB: null,
                        winner: winners[i],
                        status: MatchRoom_model_1.MatchStatus.COMPLETED,
                        tournament: tournament._id,
                    });
                    tournament.rounds.push(byeMatch._id);
                    continue;
                }
                const nextMatch = await MatchRoom_model_1.MatchRoomModel.create({
                    task: "Автомат тоглолт",
                    round: nextRound,
                    scheduleAt: new Date(),
                    slotA: winners[i],
                    slotB: winners[i + 1],
                    tournament: tournament._id,
                    status: MatchRoom_model_1.MatchStatus.PENDING,
                });
                tournament.rounds.push(nextMatch._id);
            }
            await tournament.save();
        }
    }
    return {
        success: true,
        message: "Ялагч болон loser автоматаар орууллаа, шаардлагатай бол next round match үүсгэв",
    };
};
exports.updateWinner = updateWinner;
//# sourceMappingURL=updata-match.js.map