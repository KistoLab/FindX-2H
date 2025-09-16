"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTournament = void 0;
const Tournament_model_1 = require("../../../models/tournement/Tournament.model");
const createTournament = async (_, { tournamentInput }) => {
    const tournament = await Tournament_model_1.TournamentModel.create(tournamentInput);
    return {
        success: true,
        message: "Tournament created successfully",
    };
};
exports.createTournament = createTournament;
//# sourceMappingURL=create-tournement.js.map