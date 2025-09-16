"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OlympiadModel = void 0;
const mongoose_1 = require("mongoose");
const olympiadSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    organizer: { type: mongoose_1.Schema.Types.ObjectId, ref: "Organizer", required: true },
    classtypes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "ClassType" }],
    scoreOfAward: { type: Number, default: null },
    status: { type: String, enum: ["PENDING", "APPROVED"], default: "PENDING" },
}, { timestamps: true });
exports.OlympiadModel = mongoose_1.models["Olympiad"] || (0, mongoose_1.model)("Olympiad", olympiadSchema);
//# sourceMappingURL=Olympiad.model.js.map