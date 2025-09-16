"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizerTypeDefs = void 0;
const graphql_tag_1 = require("graphql-tag");
exports.OrganizerTypeDefs = (0, graphql_tag_1.gql) `

  type Olympiad {
    id: ID!
    name: String!
  }

  type Organizer {
    id: ID!
    organizationName: String!
    email: String!
    Olympiads: [Olympiad!]
  }

  input CreateOrganizerInput {
    organizationName: String!
    email: String!
  }

  type Mutation {
    createOrganizer(input: CreateOrganizerInput!): Organizer!
    updateOrganizer(id: ID!, input: CreateOrganizerInput!): Organizer!
  }

  type Query {
    getOrganizer(id: ID!): Organizer!
    getAllOrganizers: [Organizer!]!
  }
`;
//# sourceMappingURL=organizer.schema.js.map