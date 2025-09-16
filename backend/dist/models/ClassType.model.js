"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassTypeModel = exports.ClassYear = void 0;
const mongoose_1 = require("mongoose");
var ClassYear;
(function (ClassYear) {
    ClassYear["GRADE_1"] = "1\u0440 \u0430\u043D\u0433\u0438";
    ClassYear["GRADE_2"] = "2\u0440 \u0430\u043D\u0433\u0438";
    ClassYear["GRADE_3"] = "3\u0440 \u0430\u043D\u0433\u0438";
    ClassYear["GRADE_4"] = "4\u0440 \u0430\u043D\u0433\u0438";
    ClassYear["GRADE_5"] = "5\u0440 \u0430\u043D\u0433\u0438";
    ClassYear["GRADE_6"] = "6\u0440 \u0430\u043D\u0433\u0438";
    ClassYear["GRADE_7"] = "7\u0440 \u0430\u043D\u0433\u0438";
    ClassYear["GRADE_8"] = "8\u0440 \u0430\u043D\u0433\u0438";
    ClassYear["GRADE_9"] = "9\u0440 \u0430\u043D\u0433\u0438";
    ClassYear["GRADE_10"] = "10\u0440 \u0430\u043D\u0433\u0438";
    ClassYear["GRADE_11"] = "11\u0440 \u0430\u043D\u0433\u0438";
    ClassYear["GRADE_12"] = "12\u0440 \u0430\u043D\u0433\u0438";
})(ClassYear || (exports.ClassYear = ClassYear = {}));
const classTypeSchema = new mongoose_1.Schema({
    olympiadId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Olympiad", required: true },
    classYear: { type: String, enum: Object.values(ClassYear), required: true },
    maxScore: { type: Number, required: true },
    questions: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Question" }],
    participants: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Student", default: [] }],
    studentsResults: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "StudentAnswer", default: [] }],
    medalists: { type: Number, required: true },
}, { timestamps: true });
exports.ClassTypeModel = mongoose_1.models["ClassType"] || (0, mongoose_1.model)("ClassType", classTypeSchema);
//# sourceMappingURL=ClassType.model.js.map