"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStudent = void 0;
const models_1 = require("../../../models");
const graphql_1 = require("graphql");
const getStudent = async (_, { id }) => {
    try {
        console.log('🔍 getStudent called with ID:', id);
        const student = await models_1.StudentModel.findById(id);
        console.log('📊 Student found:', student ? 'YES' : 'NO');
        if (student) {
            console.log('👤 Student details:', {
                id: student._id,
                name: student.name,
                email: student.email
            });
            return {
                ...student.toObject(),
                id: student._id.toString()
            };
        }
        return null;
    }
    catch (error) {
        console.error('❌ Error in getStudent:', error);
        throw new graphql_1.GraphQLError(error.message);
    }
};
exports.getStudent = getStudent;
//# sourceMappingURL=get-student-by-id.js.map