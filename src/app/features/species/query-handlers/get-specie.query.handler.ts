import { QueryHandler } from "@tshio/query-bus";
import { Logger } from "@tshio/logger";
import { GET_SPECIE_QUERY_TYPE, GetSpecieQuery, GetSpecieQueryResult } from "../queries/get-specie";
import { StarWarsApi } from "../../../../shared/integrations/starwars-api/starwars-api";
import { StarWarsSpecie, ResourcesType } from "../../../../shared/types/starwars.types";

interface GetSpecieQueryDependencies {
  starWarsApi: StarWarsApi;
  logger: Logger;
}
export default class GetSpecieQueryHandler implements QueryHandler<GetSpecieQuery, GetSpecieQueryResult> {
  public queryType: string = GET_SPECIE_QUERY_TYPE;

  constructor(private dependencies: GetSpecieQueryDependencies) {}

  async execute(query: GetSpecieQuery): Promise<GetSpecieQueryResult> {
    const { id } = query.payload;
    const { logger, starWarsApi } = this.dependencies;

    logger.info("Query GetSpecie executed");

    const specie = await starWarsApi.getResource<StarWarsSpecie>(ResourcesType.Species, id);

    if (!specie) {
      return new GetSpecieQueryResult(null);
    }

    const resultSpecie = { filmsUrl: specie.films, ...specie };

    return new GetSpecieQueryResult(resultSpecie);
  }
}
