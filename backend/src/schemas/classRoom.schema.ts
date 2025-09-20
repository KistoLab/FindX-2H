import { gql } from "graphql-tag";

export const ClassRoomTypeDefs = gql`
  type ClassRoom {
    id: ID!
    roomNumber: String!
    mandatNumber: [String!]!
  }

  input CreateClassRoomInput {
    roomNumber: String!
  }

  input UpdateClassRoomInput {
    roomNumber: String!
  }

  type Mutation {
    createClassRoom(input: CreateClassRoomInput!): ClassRoom!
    updateClassRoom(id: ID!, input: UpdateClassRoomInput!): ClassRoom!
  }

  type Query {
    classRoom(id: ID!): ClassRoom!
    allClassRooms: [ClassRoom!]!
  }
`;