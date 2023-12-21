import { QueryHandler } from "@tshio/query-bus";
import { Logger } from "@tshio/logger";
import { GET_SPECIES_QUERY_TYPE, GetSpeciesQuery, GetSpeciesQueryResult } from "../queries/get-species";
import { StarWarsApi } from "../../../../shared/integrations/starwars-api/starwars-api";
import { StarWarsSpecie, ResourcesType } from "../../../../shared/types/starwars.types";

interface GetSpeciesQueryDependencies {
  starWarsApi: StarWarsApi;
  logger: Logger;
}

export default class GetSpeciesQueryHandler implements QueryHandler<GetSpeciesQuery, GetSpeciesQueryResult> {
  public queryType: string = GET_SPECIES_QUERY_TYPE;

  constructor(private dependencies: GetSpeciesQueryDependencies) {}

  async execute(query: GetSpeciesQuery): Promise<GetSpeciesQueryResult> {
    const { filter, page } = query.payload;
    const { logger, starWarsApi } = this.dependencies;

    logger.info("Query GetSpecies executed");

    const species = await starWarsApi.getResources<StarWarsSpecie>(ResourcesType.Species, filter, page);

    const resultSpecies = species.map((specie) => {
      return {
        filmsUrl: specie.films,
        ...specie,
      };
    });

    return new GetSpeciesQueryResult({ items: resultSpecies, total: resultSpecies.length });
  }
}
