import { CommandBus } from "@tshio/command-bus";
import { QueryBus } from "@tshio/query-bus";
import { Resolvers } from "../types";
import { getFilmsQuery } from "../../app/features/film/graphql/queries/get-films.query";
import { getSpeciesQuery } from "../../app/features/species/graphql/queries/get-species.query";
import { getVehiclesQuery } from "../../app/features/vehicle/graphql/queries/get-vehicles.query";
import { getStarshipsQuery } from "../../app/features/starship/graphql/queries/get-starships.query";
import { getPlanetsQuery } from "../../app/features/planet/graphql/queries/get-planets.query";
import { getFilmQuery } from "../../app/features/film/graphql/queries/get-film.query";
import { getPlanetQuery } from "../../app/features/planet/graphql/queries/get-planet.query";
import { getSpecieQuery } from "../../app/features/species/graphql/queries/get-specie.query";
import { getStarshipQuery } from "../../app/features/starship/graphql/queries/get-starship.query";
import { getVehicleQuery } from "../../app/features/vehicle/graphql/queries/get-vehicle.query";
import { getFilmsByIdsQuery } from "../../app/features/film/graphql/queries/get-films-by-ids.query";
import { getSpeciesByIdsQuery } from "../../app/features/species/graphql/queries/get-species-by-ids.query";
import { getVehiclesByIdsQuery } from "../../app/features/vehicle/graphql/queries/get-vehicles-by-ids.query";
import { getPlanetsByIdsQuery } from "../../app/features/planet/graphql/queries/get-planets-by-ids.query";
import { getStarshipsByIdsQuery } from "../../app/features/starship/graphql/queries/get-starships-by-ids.query";
import { getUniqueWordsQuery } from "../../app/features/film/graphql/queries/get-unique-words.query";
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
      getFilm: getFilmQuery,
      getPlanet: getPlanetQuery,
      getSpecie: getSpecieQuery,
      getStarship: getStarshipQuery,
      getVehicle: getVehicleQuery,
      getUniqueWords: getUniqueWordsQuery,
      // GRAPHQL_QUERIES
    },

    Starship: {
      films: getFilmsByIdsQuery,
    },
    Film: {
      species: getSpeciesByIdsQuery,
      vehicles: getVehiclesByIdsQuery,
      planets: getPlanetsByIdsQuery,
      starships: getStarshipsByIdsQuery,
    },
    Planet: {
      films: getFilmsByIdsQuery,
    },
    Vehicle: {
      films: getFilmsByIdsQuery,
    },
    Specie: {
      films: getFilmsByIdsQuery,
    },
  };
};
