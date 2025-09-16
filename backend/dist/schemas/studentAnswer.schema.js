"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentAnswerTypeDefs = void 0;
const graphql_tag_1 = require("graphql-tag");
exports.StudentAnswerTypeDefs = (0, graphql_tag_1.gql) `
  type StudentAnswerItem {
    questionId: ID!
    score: Int!
  }

  type StudentAnswer {
    id: ID!
    studentId: ID!
    classTypeId: ID!
    answers: [StudentAnswerItem!]!
    totalScoreofOlympiad: Int!
    createdAt: String!
    updatedAt: String!
  }

  input StudentAnswerItemInput {
    questionId: ID!
    score: Int!
  }

  input CreateStudentAnswerInput {
    studentId: ID!
    classTypeId: ID!
    answers: [StudentAnswerItemInput!]!
  }

  input UpdateStudentAnswerInput {
    id: ID!
    studentId: ID
    classTypeId: ID
    answers: [StudentAnswerItemInput!]
  }

  type Mutation {
    createStudentAnswer(input: CreateStudentAnswerInput!): StudentAnswer!
    updateStudentAnswer(
      id: ID!
      input: UpdateStudentAnswerInput!
    ): StudentAnswer!
    updateStudentAnswerScore(
      studentAnswerId: ID!
      questionId: ID!
      score: Int!
    ): StudentAnswer!
    deleteStudentAnswer(id: ID!): Boolean!
  }

  type Query {
    studentAnswer(id: ID!): StudentAnswer
    allStudentAnswers: [StudentAnswer!]!
    studentAnswersByClassType(classTypeId: ID!): [StudentAnswer!]!
    debugOlympiadData(olympiadId: ID!): String!
  }
`;
//# sourceMappingURL=studentAnswer.schema.js.map