import { QueryHandler } from "@tshio/query-bus";
import { Logger } from "@tshio/logger";
import { GET_PLANETS_QUERY_TYPE, GetPlanetsQuery, GetPlanetsQueryResult } from "../queries/get-planets";
import { StarWarsApi } from "../../../../shared/integrations/starwars-api/starwars-api";
import { StarWarsPlanet, ResourcesType } from "../../../../shared/types/starwars.types";

interface GetPlanetsQueryDependencies {
  starWarsApi: StarWarsApi;
  logger: Logger;
}

export default class GetPlanetsQueryHandler implements QueryHandler<GetPlanetsQuery, GetPlanetsQueryResult> {
  public queryType: string = GET_PLANETS_QUERY_TYPE;

  constructor(private dependencies: GetPlanetsQueryDependencies) {}

  async execute(query: GetPlanetsQuery): Promise<GetPlanetsQueryResult> {
    const { filter, page } = query.payload;
    const { logger, starWarsApi } = this.dependencies;

    logger.info("Query GetPlanets executed");

    const planets = await starWarsApi.getResources<StarWarsPlanet>(ResourcesType.Planets, filter, page);

    const resultPlanets = planets.map((planet) => {
      return {
        filmsUrl: planet.films,
        ...planet,
      };
    });

    return new GetPlanetsQueryResult({ items: resultPlanets, total: resultPlanets.length });
  }
}
