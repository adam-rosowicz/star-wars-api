import { QueryHandler } from "@tshio/query-bus";
import { GET_VEHICLES_QUERY_TYPE, GetVehiclesQuery, GetVehiclesQueryResult } from "../queries/get-vehicles";
import { StarWarsClient } from "../../../../shared/clients/star-wars.client";

interface GetVehiclesQueryDependencies {
  starWarsClient: StarWarsClient;
}

export default class GetVehiclesQueryHandler implements QueryHandler<GetVehiclesQuery, GetVehiclesQueryResult> {
  public queryType: string = GET_VEHICLES_QUERY_TYPE;

  constructor(private dependencies: GetVehiclesQueryDependencies) {}

  async execute(query: GetVehiclesQuery): Promise<GetVehiclesQueryResult> {
    const { filter } = query.payload;
    const vehicles = await this.dependencies.starWarsClient.getVehicles(filter);

    return new GetVehiclesQueryResult({ items: vehicles });
  }
}
