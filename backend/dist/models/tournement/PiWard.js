"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PiWardModel = void 0;
const mongoose_1 = require("mongoose");
const piWardSchema = new mongoose_1.Schema({
    tournamentId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Tournament", required: true },
    students: [
        {
            studentId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Student", required: true },
            points: { type: Number, required: true },
            place: { type: Number, required: true },
        },
    ],
}, { timestamps: true } // createdAt, updatedAt автоматаар үүснэ
);
exports.PiWardModel = mongoose_1.models["PiWard"] || (0, mongoose_1.model)("PiWard", piWardSchema);
//# sourceMappingURL=PiWard.js.map