import { QueryHandler } from "@tshio/query-bus";
import { GET_VEHICLES_QUERY_TYPE, GetVehiclesQuery, GetVehiclesQueryResult } from "../queries/get-vehicles";
import { ResourcesType, StarWarsApi, StarWarsVehicle } from "../../../../shared/integrations/starwars-api/starwars-api";

interface GetVehiclesQueryDependencies {
  starWarsApi: StarWarsApi;
}

export default class GetVehiclesQueryHandler implements QueryHandler<GetVehiclesQuery, GetVehiclesQueryResult> {
  public queryType: string = GET_VEHICLES_QUERY_TYPE;

  constructor(private dependencies: GetVehiclesQueryDependencies) {}

  async execute(query: GetVehiclesQuery): Promise<GetVehiclesQueryResult> {
    const { filter, page } = query.payload;
    const vehicles = await this.dependencies.starWarsApi.getResources<StarWarsVehicle>(
      ResourcesType.Vehicles,
      filter,
      page,
    );

    const resultVehicles = vehicles.map((vehicle) => {
      return {
        ...vehicle,
        filmsUrl: vehicle.films,
      };
    });

    return new GetVehiclesQueryResult({ items: resultVehicles, total: resultVehicles.length });
  }
}
