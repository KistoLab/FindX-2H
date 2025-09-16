"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerStudentToTournament = void 0;
const models_1 = require("../../../models");
const models_2 = require("../../../models");
const registerStudentToTournament = async (_, { tournamentId, studentId }) => {
    const tournament = await models_1.TournamentModel.findById(tournamentId);
    if (!tournament)
        throw new Error("Tournament олдсонгүй");
    const student = await models_2.StudentModel.findById(studentId);
    if (!student)
        throw new Error("Student олдсонгүй");
    if (tournament.participants.some((id) => id.toString() === student._id.toString())) {
        throw new Error("Сурагч аль хэдийн бүртгэгдсэн байна");
    }
    tournament.participants.push(student._id);
    await tournament.save();
    return {
        success: true,
        message: "Student registered successfully",
    };
};
exports.registerStudentToTournament = registerStudentToTournament;
//# sourceMappingURL=register-student.js.map