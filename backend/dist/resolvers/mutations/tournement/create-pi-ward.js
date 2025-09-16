"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPiWard = void 0;
const MatchRoom_model_1 = require("@/models/tournement/MatchRoom.model");
const Tournament_model_1 = require("@/models/tournement/Tournament.model");
const PiWard_1 = require("@/models/tournement/PiWard");
const mongoose_1 = __importDefault(require("mongoose"));
// Байрын дагуу PiPoints оноох функц
function allocatePiPoints(results, totalPiPoints) {
    return results.map((r) => {
        let percent = 7.5; // Default 5-8 байр
        if (r.place === 1)
            percent = 35;
        else if (r.place === 2)
            percent = 20;
        else if (r.place === 3 || r.place === 4)
            percent = 15;
        const points = Math.floor((totalPiPoints * percent) / 100);
        return { ...r, points };
    });
}
const createPiWard = async (_, { tournamentId }) => {
    const tournament = await Tournament_model_1.TournamentModel.findById(tournamentId);
    if (!tournament)
        throw new Error("Tournament олдсонгүй");
    const finishedMatches = await MatchRoom_model_1.MatchRoomModel.find({
        _id: { $in: tournament.rounds },
        status: MatchRoom_model_1.MatchStatus.COMPLETED,
    });
    if (!finishedMatches.length)
        throw new Error("Дууссан тоглолт байхгүй");
    // Round-ийг эрэмбэлэх
    const roundOrder = {
        Final: 1,
        Semifinal: 2,
        Quarterfinal: 3,
    };
    const sortedMatches = finishedMatches.sort((a, b) => (roundOrder[a.round] || 999) - (roundOrder[b.round] || 999));
    const topPlayers = [];
    // 1-2 байр (Final)
    const finalMatch = sortedMatches.find((m) => m.round === "Final");
    if (!finalMatch?.winner || !finalMatch?.loser)
        throw new Error("Final тоглолт бүрэн бус байна");
    topPlayers.push({ studentId: finalMatch.winner.toString(), place: 1 }); // Winner
    topPlayers.push({ studentId: finalMatch.loser.toString(), place: 2 }); // Loser
    // 3-4 байр (Semifinal loser)
    const semiMatches = sortedMatches.filter((m) => m.round === "Semifinal");
    semiMatches.forEach((m) => {
        if (m.loser)
            topPlayers.push({
                studentId: m.loser.toString(),
                place: 3 + topPlayers.filter((p) => p.place >= 3).length,
            });
    });
    // 5-8 байр (Quarterfinal loser)
    const quarterMatches = sortedMatches.filter((m) => m.round === "Quarterfinal");
    quarterMatches.forEach((m) => {
        if (m.loser)
            topPlayers.push({
                studentId: m.loser.toString(),
                place: 5 + topPlayers.filter((p) => p.place >= 5).length,
            });
    });
    // Pi оноо оноох
    const piResults = allocatePiPoints(topPlayers, tournament.piPoints);
    // PiWard үүсгэх
    const piWardDoc = await PiWard_1.PiWardModel.create({
        tournamentId: tournament._id,
        students: piResults.map((s) => ({
            studentId: new mongoose_1.default.Types.ObjectId(s.studentId),
            points: s.points,
            place: s.place,
        })),
    });
    // Tournament-д холбох
    tournament.piWards.push(piWardDoc._id);
    await tournament.save();
    return {
        message: "PiPoints 1-8 байр хүртэл тараалаа, Tournament-д холбогдлоо",
        success: true,
    };
};
exports.createPiWard = createPiWard;
//# sourceMappingURL=create-pi-ward.js.map