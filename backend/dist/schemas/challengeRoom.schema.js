"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.challengeRoomTypeDefs = void 0;
const graphql_tag_1 = require("graphql-tag");
exports.challengeRoomTypeDefs = (0, graphql_tag_1.gql) `
  enum Status {
    WAITING
    ACTIVE
    FINISHED
  }

  type ChallengeRoom {
    id: ID!
    challengeId: ID!
    challengerId: ID!
    opponentId: ID!
    status: Status!
    winnerId: ID
    challengerScore: Int!
    opponentScore: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input ChallengeRoomInput {
    challengeId: ID!
    challengerId: ID!
    opponentId: ID!
  }

  input UpdateChallengeRoomInput {
    roomId: ID!
    status: Status
    winnerId: ID
    challengerScore: Int
    opponentScore: Int
  }

  type Query {
    getChallengeRoom(id: ID!): ChallengeRoom!
    listChallengeRoomsByStudent(studentId: ID!): [ChallengeRoom!]!
  }

  type Mutation {
    createChallengeRoom(input: ChallengeRoomInput!): ChallengeRoom!
    updateChallengeRoom(input: UpdateChallengeRoomInput!): ChallengeRoom!
  }
`;
//# sourceMappingURL=challengeRoom.schema.js.map