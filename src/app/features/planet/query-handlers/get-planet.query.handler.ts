import { QueryHandler } from "@tshio/query-bus";
import { GET_PLANET_QUERY_TYPE, GetPlanetQuery, GetPlanetQueryResult } from "../queries/get-planet";
import { ResourcesType, StarWarsApi, StarWarsPlanet } from "../../../../shared/integrations/starwars-api/starwars-api";

interface GetPlanetQueryDependencies {
  starWarsApi: StarWarsApi;
}
export default class GetPlanetQueryHandler implements QueryHandler<GetPlanetQuery, GetPlanetQueryResult> {
  public queryType: string = GET_PLANET_QUERY_TYPE;

  constructor(private dependencies: GetPlanetQueryDependencies) {}

  async execute(query: GetPlanetQuery): Promise<GetPlanetQueryResult> {
    const { id } = query.payload;

    const planet = await this.dependencies.starWarsApi.getResource<StarWarsPlanet>(ResourcesType.Planets, id);

    if (!planet) {
      return new GetPlanetQueryResult(null);
    }
    const resultPlanet = { filmsUrl: planet.films, ...planet };

    return new GetPlanetQueryResult(resultPlanet);
  }
}
