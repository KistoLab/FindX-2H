"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tournamentTypeDefs = void 0;
const graphql_tag_1 = require("graphql-tag");
exports.tournamentTypeDefs = (0, graphql_tag_1.gql) `
enum Status {
  OPENING
  ONGOING
  FINISHED
}

type Tournament {
  id: ID!
  name: String!
  description: String!
  date: String!
  size: Int!
  maxScore: Int!
  piPoints: Int!
  piWards: [ID!]!        # PiWard-г ID-ээр харуулна
  closedAt: String!
  rounds: [MatchRoom!]!
  participants: [ID!]!   # Student ID-ууд
  status: Status!
  topic: String!
  createdAt: String!
  updatedAt: String!
}

input TournamentInput {
  name: String!
  description: String!
  date: String!
  size: Int!
  maxScore: Int!
  piPoints: Int!
  closedAt: String!
  status: Status
  topic: String!
}

type Response {
  success: Boolean!
  message: String
}

type Query {
  getTournaments: [Tournament!]!
  getTournament(id: ID!): Tournament
}

type Mutation {
  createTournament(tournamentInput: TournamentInput!): Response!
  updateTournamentStatus(id: ID!, status: Status!): Response!
  deleteTournament(id: ID!): Response!
  registerStudentToTournament(tournamentId: ID!, studentId: ID!): Response!
}
`;
//# sourceMappingURL=tournement.schema.js.map