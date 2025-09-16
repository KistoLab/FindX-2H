"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonTypeDefs = void 0;
const graphql_tag_1 = require("graphql-tag");
exports.commonTypeDefs = (0, graphql_tag_1.gql) `
  scalar DateTime

  enum Response {
    Success
    NOT_FOUND
  }
`;
//# sourceMappingURL=common.schema.js.map