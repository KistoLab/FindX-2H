import * as Query from "./queries";
import * as Mutation from "./mutations";
import { blockchainResolvers } from "./blockchain.resolver";

export const resolvers = {
  Query: {
    ...Query,
    ...blockchainResolvers.Query,
  },
  Mutation: {
    ...Mutation,
    ...blockchainResolvers.Mutation,
  },
};
