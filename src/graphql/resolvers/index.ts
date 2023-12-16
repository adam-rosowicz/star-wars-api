import { CommandBus } from "@tshio/command-bus";
import { QueryBus } from "@tshio/query-bus";
import { Resolvers } from "../types";
import { getFilmsQuery } from "../../app/features/film/graphql/queries/get-films.query";
// QUERY_IMPORTS
// MUTATION_IMPORTS

export type MutationContext = {
  commandBus: CommandBus;
};

export type QueryContext = {
  queryBus: QueryBus<any>;
};

interface ResolversDependencies {}

export const createResolvers = (_dependencies: ResolversDependencies): Resolvers => {
  // Provide resolver functions for your schema fields
  return {
    Query: {
      getFilms: getFilmsQuery,
      // GRAPHQL_QUERIES
    },
  };
};
