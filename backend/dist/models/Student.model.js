"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModel = void 0;
const mongoose_1 = require("mongoose");
const studentSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    school: { type: String, required: true },
    class: { type: String, required: true },
    location: { type: String, required: true },
    profilePicture: { type: String, required: true },
    totalScore: { type: Number, required: true, default: 0 },
    piPoints: { type: Number, required: true, default: 1000 },
    participatedOlympiads: [
        { type: mongoose_1.Schema.Types.ObjectId, ref: "Olympiad", required: true, default: [] },
    ],
}, { timestamps: true });
exports.StudentModel = mongoose_1.models["Student"] || (0, mongoose_1.model)("Student", studentSchema);
//# sourceMappingURL=Student.model.js.map