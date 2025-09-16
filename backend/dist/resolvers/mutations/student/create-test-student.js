"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTestStudent = void 0;
const models_1 = require("@/models");
const graphql_1 = require("graphql");
const createTestStudent = async () => {
    try {
        // Check if student already exists
        const existingStudent = await models_1.StudentModel.findById('68c54f3c22ed3250680b05c8');
        if (existingStudent) {
            return existingStudent;
        }
        // Create new student with specific ID
        const student = new models_1.StudentModel({
            _id: '68c54f3c22ed3250680b05c8',
            name: 'Batbayar Enkhbold',
            email: 'batbayar.enkhbold@example.com',
            school: 'Mongolian National University',
            class: '12р анги',
            location: 'Ulaanbaatar, Mongolia',
            profilePicture: 'https://via.placeholder.com/150',
            totalScore: 285,
            piPoints: 1850,
            participatedOlympiads: []
        });
        await student.save();
        return student;
    }
    catch (error) {
        throw new graphql_1.GraphQLError(error.message || "Failed to create test student");
    }
};
exports.createTestStudent = createTestStudent;
//# sourceMappingURL=create-test-student.js.map