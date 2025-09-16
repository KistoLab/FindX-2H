"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.piWardTypeDefs = void 0;
const graphql_tag_1 = require("graphql-tag");
exports.piWardTypeDefs = (0, graphql_tag_1.gql) `
  type PiWardStudent {
    studentId: ID!
    points: Int!
    place: Int!
  }

  type PiWard {
    id: ID!
    tournamentId: ID!
    students: [PiWardStudent!]!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    getPiWard(tournamentId: ID!): PiWard
    getAllPiWards: [PiWard!]!
  }

  type Mutation {
    # Автоматаар оноо тооцоолж хадгална
    createPiWard(tournamentId: ID!): Response!
  }
`;
//# sourceMappingURL=pi-ward.schema.js.map