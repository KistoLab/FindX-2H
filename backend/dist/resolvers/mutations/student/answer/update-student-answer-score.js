"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStudentAnswerScore = void 0;
const graphql_1 = require("graphql");
const models_1 = require("../../../../models");
const updateStudentAnswerScore = async (_, { studentAnswerId, questionId, score, }) => {
    try {
        const existing = await models_1.StudentAnswerModel.findById(studentAnswerId);
        if (!existing)
            throw new graphql_1.GraphQLError("Student answer not found");
        const answers = existing.answers || [];
        const idx = answers.findIndex((a) => String(a.questionId) === String(questionId));
        if (idx === -1) {
            answers.push({ questionId: questionId, score });
        }
        else {
            answers[idx].score = score;
        }
        const totalScoreofOlympiad = answers.reduce((sum, a) => sum + (a?.score ?? 0), 0);
        const updated = await models_1.StudentAnswerModel.findByIdAndUpdate(studentAnswerId, { answers, totalScoreofOlympiad }, { new: true }).lean();
        if (!updated)
            throw new graphql_1.GraphQLError("Failed to update score");
        const { _id, ...rest } = updated;
        return { id: String(_id), ...rest };
    }
    catch (error) {
        throw new graphql_1.GraphQLError(error.message);
    }
};
exports.updateStudentAnswerScore = updateStudentAnswerScore;
//# sourceMappingURL=update-student-answer-score.js.map