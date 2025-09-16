"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentsByClassType = void 0;
const models_1 = require("../../../models");
const graphql_1 = require("graphql");
const mongoose_1 = require("mongoose");
const studentsByClassType = async (_, { classTypeId }) => {
    try {
        console.log("🔍 studentsByClassType called with classTypeId:", classTypeId);
        const classTypeObjectId = new mongoose_1.Types.ObjectId(classTypeId);
        // Find all StudentAnswers for this classType
        const studentAnswers = await models_1.StudentAnswerModel.find({
            classTypeId: classTypeObjectId,
        }).lean();
        console.log("📝 Found StudentAnswers:", studentAnswers.length);
        if (studentAnswers.length === 0) {
            console.log("❌ No StudentAnswers found for this classType");
            return [];
        }
        // Get unique student IDs from the StudentAnswers
        const studentIds = [...new Set(studentAnswers.map((sa) => sa.studentId))];
        console.log("👥 Unique student IDs:", studentIds.length);
        // Find all students with these IDs
        const students = await models_1.StudentModel.find({
            _id: { $in: studentIds },
        }).lean();
        console.log("📊 Found students:", students.length);
        const result = students.map((doc) => {
            const { _id, ...rest } = doc;
            return { id: String(_id), ...rest };
        });
        console.log("✅ Returning", result.length, "students");
        return result;
    }
    catch (error) {
        console.error("❌ Error in studentsByClassType:", error);
        throw new graphql_1.GraphQLError(error.message);
    }
};
exports.studentsByClassType = studentsByClassType;
//# sourceMappingURL=get-students-by-class-type-id.js.map