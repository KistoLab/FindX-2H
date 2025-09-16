"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OlympiadTypeDefs = void 0;
const graphql_tag_1 = require("graphql-tag");
exports.OlympiadTypeDefs = (0, graphql_tag_1.gql) `
  type Olympiad {
    id: ID!
    name: String!
    description: String!
    date: String!
    location: String!
    organizer: Organizer
    classtypes: [ClassType!]!
    scoreOfAward: Int
    status: String!
  }

  type Organizer {
    id: ID!
    organizationName: String!
    email: String!
    Olympiads: [Olympiad!]
  }

  input CreateOlympiadRequestInput {
    organizerId: ID!
    name: String!
    description: String!
    date: String!
    location: String!
    classtypes: [CreateClassTypeInput!]!
  }

  input ApproveOlympiadInput {
    scoreOfAward: Int!
  }

  input UpdateOlympiadInput {
    description: String
    date: String
    location: String
  }

  type Mutation {
    requestOlympiad(input: CreateOlympiadRequestInput!): Olympiad!
    approveOlympiad(id: ID!, input: ApproveOlympiadInput!): Olympiad!
    updateOlympiad(id: ID!, input: UpdateOlympiadInput!): Olympiad!
    deleteOlympiad(id: ID!): Boolean!
  }

  type Query {
    olympiad(id: ID!): Olympiad!
    allOlympiads: [Olympiad!]!
    getPendingOlympiads: [Olympiad!]!
    getAllApprovedOlympiads: [Olympiad!]!
    getOlympiadByClassYear(classYear: ClassYear!): [Olympiad!]!
  }
`;
//# sourceMappingURL=olympiad.schema.js.map