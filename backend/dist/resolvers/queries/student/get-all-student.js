"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllStudent = void 0;
const models_1 = require("../../../models");
const graphql_1 = require("graphql");
const getAllStudent = async () => {
    try {
        const students = await models_1.StudentModel.find();
        return students;
    }
    catch (error) {
        throw new graphql_1.GraphQLError(error.message);
    }
};
exports.getAllStudent = getAllStudent;
//# sourceMappingURL=get-all-student.js.map