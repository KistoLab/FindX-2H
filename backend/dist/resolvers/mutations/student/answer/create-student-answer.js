"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStudentAnswer = void 0;
const models_1 = require("../../../../models");
const graphql_1 = require("graphql");
const createStudentAnswer = async (_, { input }) => {
    try {
        const { studentId, classTypeId, answers } = input;
        const existingStudent = await models_1.StudentModel.findById(studentId);
        if (!existingStudent)
            throw new graphql_1.GraphQLError("Student does not exist");
        const totalScoreofOlympiad = Array.isArray(answers)
            ? answers.reduce((sum, a) => sum + (a?.score ?? 0), 0)
            : 0;
        const studentAnswer = new models_1.StudentAnswerModel({
            studentId,
            classTypeId,
            answers,
            totalScoreofOlympiad,
        });
        await studentAnswer.save();
        const created = studentAnswer.toObject();
        return { id: String(created._id), ...created };
    }
    catch (error) {
        throw new graphql_1.GraphQLError(error.message);
    }
};
exports.createStudentAnswer = createStudentAnswer;
//# sourceMappingURL=create-student-answer.js.map