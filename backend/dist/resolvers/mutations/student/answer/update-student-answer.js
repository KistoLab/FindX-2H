"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStudentAnswer = void 0;
const models_1 = require("../../../../models");
const graphql_1 = require("graphql");
const updateStudentAnswer = async (_, { input }) => {
    try {
        const { id, answers, studentId, classTypeId } = input;
        const existingStudentAnswer = await models_1.StudentAnswerModel.findById(id);
        if (!existingStudentAnswer) {
            throw new graphql_1.GraphQLError("Student answer does not exist");
        }
        const totalScoreofOlympiad = Array.isArray(answers)
            ? answers.reduce((sum, a) => sum + (a?.score ?? 0), 0)
            : existingStudentAnswer.totalScoreofOlympiad ?? 0;
        const updatedStudentAnswer = await models_1.StudentAnswerModel.findByIdAndUpdate(id, { answers, studentId, classTypeId, totalScoreofOlympiad }, { new: true }).lean();
        if (!updatedStudentAnswer) {
            throw new graphql_1.GraphQLError("Failed to update student answer");
        }
        const { _id, ...rest } = updatedStudentAnswer;
        return { id: String(_id), ...rest };
    }
    catch (error) {
        throw new graphql_1.GraphQLError(error.message);
    }
};
exports.updateStudentAnswer = updateStudentAnswer;
//# sourceMappingURL=update-student-answer.js.map