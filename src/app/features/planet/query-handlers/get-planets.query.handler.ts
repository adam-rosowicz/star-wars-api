import { QueryHandler } from "@tshio/query-bus";
import { GET_PLANETS_QUERY_TYPE, GetPlanetsQuery, GetPlanetsQueryResult } from "../queries/get-planets";
import { StarWarsClient } from "../../../../shared/clients/star-wars.client";

interface GetPlanetsQueryDependencies {
  starWarsClient: StarWarsClient;
}

export default class GetPlanetsQueryHandler implements QueryHandler<GetPlanetsQuery, GetPlanetsQueryResult> {
  public queryType: string = GET_PLANETS_QUERY_TYPE;

  constructor(private dependencies: GetPlanetsQueryDependencies) {}

  async execute(query: GetPlanetsQuery): Promise<GetPlanetsQueryResult> {
    const { filter } = query.payload;
    const planets = await this.dependencies.starWarsClient.getPlanets(filter);

    return new GetPlanetsQueryResult({ items: planets });
  }
}
