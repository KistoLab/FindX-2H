"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const common_schema_1 = require("./common.schema");
const classType_schema_1 = require("./classType.schema");
const studentAnswer_schema_1 = require("./studentAnswer.schema");
const question_schema_1 = require("./question.schema");
const student_schema_1 = require("./student.schema");
const olympiad_schema_1 = require("./olympiad.schema");
const organizer_schema_1 = require("./organizer.schema");
const task_schema_1 = require("./task.schema");
const challenge_schema_1 = require("./challenge.schema");
const challengeRoom_schema_1 = require("./challengeRoom.schema");
const challengeRoomResponse_schema_1 = require("./challengeRoomResponse.schema");
const tournement_1 = require("./tournement");
exports.typeDefs = [
    common_schema_1.commonTypeDefs,
    classType_schema_1.ClassTypeTypeDefs,
    question_schema_1.QuestionTypeDefs,
    student_schema_1.StudentTypeDefs,
    studentAnswer_schema_1.StudentAnswerTypeDefs,
    olympiad_schema_1.OlympiadTypeDefs,
    organizer_schema_1.OrganizerTypeDefs,
    challenge_schema_1.challengeTypeDefs,
    challengeRoom_schema_1.challengeRoomTypeDefs,
    challengeRoomResponse_schema_1.challengeRoomResponseTypeDefs,
    task_schema_1.taskTypeDefs,
    tournement_1.matchRoomTypeDefs,
    tournement_1.tournamentTypeDefs,
    tournement_1.piWardTypeDefs
];
//# sourceMappingURL=index.js.map