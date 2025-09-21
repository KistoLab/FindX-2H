import { gql } from "graphql-tag";

export const StudentAnswerTypeDefs = gql`
  type StudentAnswerItem {
    questionId: ID!
    score: Int!
    description: String!
  }

  type StudentAnswer {
    id: ID!
    studentId: ID!
    classTypeId: ID!
    answers: [StudentAnswerItem!]!
    totalScoreofOlympiad: Int
    createdAt: String!
    updatedAt: String!
    image: [String!]!
    mandatNumber: String
    roomNumber: Int
  }

  input StudentAnswerItemInput {
    questionId: ID!
    score: Int!
    description: String!
  }

  input CreateStudentAnswerInput {
    studentId: ID!
    classTypeId: ID!
    answers: [StudentAnswerItemInput!]!
    image: [String!]!
    mandatNumber: String
    roomNumber: Int
  }

  input UpdateStudentAnswerInput {
    studentId: ID
    classTypeId: ID
    answers: [StudentAnswerItemInput!]
    totalScoreofOlympiad: Int
    image: [String!]
    mandatNumber: String
    roomNumber: Int
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
    addMandatNumberToStudentAnswer(
      id: ID!
      mandatNumber: String
    ): StudentAnswer!
    removeMandatNumberFromStudentAnswer(
      id: ID!
      mandatNumber: String
    ): StudentAnswer!
  }

  type MandatNumberInfo {
    studentId: ID!
    classTypeId: ID!
    mandatNumber: String
  }

  type Query {
    studentAnswer(id: ID!): StudentAnswer
    allStudentAnswers: [StudentAnswer!]!
    studentAnswersByClassType(classTypeId: ID!): [StudentAnswer!]!
    getStudentsByOlympiadId(olympiadId: ID!): [StudentAnswer!]!
    getStudentsByStudentId(studentId: ID!): [StudentAnswer!]!
    getStudentsByMandatNumber(mandatNumber: String!): [StudentAnswer!]!
    getStudentsByRoomNumber(roomNumber: ID!): [StudentAnswer!]!
    getMandatNumberForStudent(
      studentId: ID!
      classTypeId: ID!
    ): MandatNumberInfo!
  }
`;
