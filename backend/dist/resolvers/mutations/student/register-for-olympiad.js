"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerForOlympiad = void 0;
const models_1 = require("@/models");
const models_2 = require("@/models");
const graphql_1 = require("graphql");
const registerForOlympiad = async (_, { input }) => {
    try {
        const { studentId, classTypeId } = input;
        console.log('🎯 Registering student:', studentId, 'for class type:', classTypeId);
        // Check if student exists
        const student = await models_1.StudentModel.findById(studentId);
        if (!student) {
            throw new graphql_1.GraphQLError("Student not found");
        }
        // Check if class type exists
        const classType = await models_2.ClassTypeModel.findById(classTypeId);
        if (!classType) {
            throw new graphql_1.GraphQLError("Class type not found");
        }
        console.log('📊 Student:', student.name, 'Grade:', student.class);
        console.log('📚 Class Type:', classType.classYear, 'Olympiad:', classType.olympiadId);
        // Check if student is already registered for this class type
        if (classType.participants.includes(studentId)) {
            throw new graphql_1.GraphQLError("Student is already registered for this class type");
        }
        // Add student to participants array
        const updatedClassType = await models_2.ClassTypeModel.findByIdAndUpdate(classTypeId, { $push: { participants: studentId } }, { new: true });
        console.log('✅ Added student to participants. Total participants:', updatedClassType?.participants.length);
        // Also add the olympiad to student's participatedOlympiads array
        const updatedStudent = await models_1.StudentModel.findByIdAndUpdate(studentId, { $addToSet: { participatedOlympiads: classType.olympiadId } }, { new: true });
        console.log('✅ Added olympiad to student. Total participated olympiads:', updatedStudent?.participatedOlympiads.length);
        return true;
    }
    catch (error) {
        console.error('❌ Registration error:', error);
        if (error instanceof graphql_1.GraphQLError) {
            throw error;
        }
        throw new graphql_1.GraphQLError(error.message || "Failed to register student for olympiad");
    }
};
exports.registerForOlympiad = registerForOlympiad;
//# sourceMappingURL=register-for-olympiad.js.map