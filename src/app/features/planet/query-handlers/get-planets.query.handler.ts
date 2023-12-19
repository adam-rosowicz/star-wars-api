import { QueryHandler } from "@tshio/query-bus";
import { GET_PLANETS_QUERY_TYPE, GetPlanetsQuery, GetPlanetsQueryResult } from "../queries/get-planets";
import { ResourcesType, StarWarsApi, StarWarsPlanet } from "../../../../shared/integrations/starwars-api";

interface GetPlanetsQueryDependencies {
  starWarsApi: StarWarsApi;
}

export default class GetPlanetsQueryHandler implements QueryHandler<GetPlanetsQuery, GetPlanetsQueryResult> {
  public queryType: string = GET_PLANETS_QUERY_TYPE;

  constructor(private dependencies: GetPlanetsQueryDependencies) {}

  async execute(query: GetPlanetsQuery): Promise<GetPlanetsQueryResult> {
    const { filter, page } = query.payload;
    const planets = await this.dependencies.starWarsApi.getResources<StarWarsPlanet>(
      ResourcesType.Planets,
      filter,
      page,
    );

    const resultPlanets = planets.map((planet) => {
      return {
        filmsUrl: planet.films,
        ...planet,
      };
    });

    return new GetPlanetsQueryResult({ items: resultPlanets, total: resultPlanets.length });
  }
}
