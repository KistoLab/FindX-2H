"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionModel = void 0;
const mongoose_1 = require("mongoose");
const questionSchema = new mongoose_1.Schema({
    classTypeId: { type: mongoose_1.Schema.Types.ObjectId, ref: "ClassType", required: true },
    questionName: { type: String, required: true },
    maxScore: { type: Number, required: true },
}, { timestamps: true });
exports.QuestionModel = mongoose_1.models["Question"] || (0, mongoose_1.model)("Question", questionSchema);
//# sourceMappingURL=Question.model.js.map