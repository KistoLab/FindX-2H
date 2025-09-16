"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentAnswerModel = void 0;
const mongoose_1 = require("mongoose");
const studentAnswerSchema = new mongoose_1.Schema({
    studentId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Student", required: true },
    classTypeId: { type: mongoose_1.Schema.Types.ObjectId, ref: "ClassType", required: true },
    answers: [
        {
            questionId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Question", required: true },
            score: { type: Number, required: true },
        },
    ],
    totalScoreofOlympiad: { type: Number, default: 0 },
}, { timestamps: true });
exports.StudentAnswerModel = mongoose_1.models["StudentAnswer"] || (0, mongoose_1.model)("StudentAnswer", studentAnswerSchema);
//# sourceMappingURL=StudentAnswer.model.js.map