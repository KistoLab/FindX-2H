"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMatch = void 0;
const models_1 = require("@/models");
const MatchRoom_model_1 = require("@/models/tournement/MatchRoom.model");
const get_round_name_1 = require("./get-round-name");
function shuffleArray(array) {
    return array
        .map((item) => ({ item, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ item }) => item);
}
const createMatch = async (_, { input }) => {
    const tournament = await models_1.TournamentModel.findById(input.tournamentId);
    if (!tournament)
        throw new Error("Tournament олдсонгүй");
    const participants = [...tournament.participants];
    if (participants.length !== tournament.size) {
        throw new Error(`Тэмцээнд ${tournament.size}-с бага оролцогч байна`);
    }
    // 🔹 Shuffle оролцогчид
    const shuffled = shuffleArray(participants);
    // 🔹 Round нэрийг автоматаар тодорхойлох
    const currentRound = (0, get_round_name_1.getRoundName)(shuffled.length);
    const matchesThisRound = [];
    for (let i = 0; i < shuffled.length; i += 2) {
        if (!shuffled[i + 1]) {
            // 🆕 Odd бол bye өгөөд шууд дараагийн шатанд гаргана
            const byeMatch = await MatchRoom_model_1.MatchRoomModel.create({
                task: "Bye match",
                round: currentRound,
                scheduleAt: new Date(input.scheduleAt),
                slotA: shuffled[i],
                slotB: null,
                winner: shuffled[i],
                tournament: tournament._id,
                status: MatchRoom_model_1.MatchStatus.COMPLETED,
            });
            tournament.rounds.push(byeMatch._id);
            matchesThisRound.push(byeMatch);
            continue;
        }
        const match = await MatchRoom_model_1.MatchRoomModel.create({
            task: input.task,
            round: currentRound,
            scheduleAt: new Date(input.scheduleAt),
            slotA: shuffled[i],
            slotB: shuffled[i + 1],
            tournament: tournament._id,
            status: MatchRoom_model_1.MatchStatus.PENDING,
        });
        tournament.rounds.push(match._id);
        matchesThisRound.push(match);
    }
    await tournament.save();
    return {
        success: true,
        message: `${currentRound} шатны ${matchesThisRound.length} match үүсгэсэн`,
    };
};
exports.createMatch = createMatch;
//# sourceMappingURL=create-match.js.map