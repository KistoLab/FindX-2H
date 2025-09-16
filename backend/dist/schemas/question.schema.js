"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionTypeDefs = void 0;
const graphql_tag_1 = require("graphql-tag");
exports.QuestionTypeDefs = (0, graphql_tag_1.gql) `
  type Question {
    id: ID!
    classTypeId: ID!
    questionName: String!
    maxScore: Int!
  }

  input CreateQuestionInput {
    questionName: String!
    maxScore: Int!
  }

  input UpdateQuestionInput {
    questionName: String!
    maxScore: Int!
  }
  
  type Mutation {
    createQuestion(input: CreateQuestionInput!): Question!
    updateQuestion(id: ID!, input: UpdateQuestionInput!): Question!
    deleteQuestion(id: ID!): Boolean!
  }

  type Query {
    questionsByClassType(classTypeId: ID!): [Question!]!
    question(id: ID!): Question!
  }
`;
//# sourceMappingURL=question.schema.js.map