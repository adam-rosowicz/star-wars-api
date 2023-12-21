import { QueryHandler } from "@tshio/query-bus";
import { Logger } from "@tshio/logger";
import { GET_PLANET_QUERY_TYPE, GetPlanetQuery, GetPlanetQueryResult } from "../queries/get-planet";
import { StarWarsApi } from "../../../../shared/integrations/starwars-api/starwars-api";
import { StarWarsPlanet, ResourcesType } from "../../../../shared/types/starwars.types";

interface GetPlanetQueryDependencies {
  starWarsApi: StarWarsApi;
  logger: Logger;
}
export default class GetPlanetQueryHandler implements QueryHandler<GetPlanetQuery, GetPlanetQueryResult> {
  public queryType: string = GET_PLANET_QUERY_TYPE;

  constructor(private dependencies: GetPlanetQueryDependencies) {}

  async execute(query: GetPlanetQuery): Promise<GetPlanetQueryResult> {
    const { id } = query.payload;
    const { logger, starWarsApi } = this.dependencies;

    logger.info("Query GetPlanet executed");

    const planet = await starWarsApi.getResource<StarWarsPlanet>(ResourcesType.Planets, id);

    if (!planet) {
      return new GetPlanetQueryResult(null);
    }
    const resultPlanet = { filmsUrl: planet.films, ...planet };

    return new GetPlanetQueryResult(resultPlanet);
  }
}
