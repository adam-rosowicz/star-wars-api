import { CommandBus } from "@tshio/command-bus";
import { QueryBus } from "@tshio/query-bus";
import { Resolvers } from "../types";
import { getFilmsQuery } from "../../app/features/film/graphql/queries/get-films.query";
import { getSpeciesQuery } from "../../app/features/species/graphql/queries/get-species.query";
import { getVehiclesQuery } from "../../app/features/vehicle/graphql/queries/get-vehicles.query";
import { getStarshipsQuery } from "../../app/features/starship/graphql/queries/get-starships.query";
import { getPlanetsQuery } from "../../app/features/planet/graphql/queries/get-planets.query";
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
      getSpecies: getSpeciesQuery,
      getVehicles: getVehiclesQuery,
      getStarships: getStarshipsQuery,
      getPlanets: getPlanetsQuery,
      // GRAPHQL_QUERIES
    },
  };
};
