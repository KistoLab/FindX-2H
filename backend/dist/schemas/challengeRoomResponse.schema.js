"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.challengeRoomResponseTypeDefs = void 0;
const graphql_tag_1 = require("graphql-tag");
exports.challengeRoomResponseTypeDefs = (0, graphql_tag_1.gql) `
  type ChallengeRoomResponse {
    id: ID!
    challengeRoomId: ID!
    studentId: ID!
    submittedAnswer: String!
    isCorrect: Boolean!
    points: Int!
    submittedAt: DateTime!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input ChallengeRoomResponseInput {
    challengeRoomId: ID!
    studentId: ID!
    submittedAnswer: String!
  }

  type Mutation {
    createChallengeRoomResponse(
      input: ChallengeRoomResponseInput!
    ): ChallengeRoomResponse!
  }

  type Query {
    getChallengeRoomResponse(id: ID!): ChallengeRoomResponse
    listChallengeRoomResponses(roomId: ID!): [ChallengeRoomResponse!]!
    listStudentChallengeResponses(studentId: ID!): [ChallengeRoomResponse!]!
  }
`;
//# sourceMappingURL=challengeRoomResponse.schema.js.map