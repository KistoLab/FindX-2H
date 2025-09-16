"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStudent = void 0;
const models_1 = require("../../../models");
const graphql_1 = require("graphql");
const createStudent = async (_, { input }) => {
    try {
        const { name, email, school, class: classYear, location, profilePicture, } = input;
        const existingStudent = await models_1.StudentModel.findOne({ email });
        if (existingStudent) {
            throw new graphql_1.GraphQLError("Student with this email already exists");
        }
        const student = new models_1.StudentModel({
            name,
            email,
            school,
            class: classYear,
            location,
            profilePicture,
        });
        await student.save();
        return student;
    }
    catch (error) {
        throw new graphql_1.GraphQLError(error.message);
    }
};
exports.createStudent = createStudent;
//# sourceMappingURL=create-student.js.map