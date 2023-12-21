import { QueryHandler } from "@tshio/query-bus";
import { Logger } from "@tshio/logger";
import { GET_VEHICLES_QUERY_TYPE, GetVehiclesQuery, GetVehiclesQueryResult } from "../queries/get-vehicles";
import { StarWarsApi } from "../../../../shared/integrations/starwars-api/starwars-api";
import { StarWarsVehicle, ResourcesType } from "../../../../shared/types/starwars.types";

interface GetVehiclesQueryDependencies {
  starWarsApi: StarWarsApi;
  logger: Logger;
}

export default class GetVehiclesQueryHandler implements QueryHandler<GetVehiclesQuery, GetVehiclesQueryResult> {
  public queryType: string = GET_VEHICLES_QUERY_TYPE;

  constructor(private dependencies: GetVehiclesQueryDependencies) {}

  async execute(query: GetVehiclesQuery): Promise<GetVehiclesQueryResult> {
    const { filter, page } = query.payload;
    const { logger, starWarsApi } = this.dependencies;

    logger.info("Query GetVehicles executed");

    const vehicles = await starWarsApi.getResources<StarWarsVehicle>(ResourcesType.Vehicles, filter, page);

    const resultVehicles = vehicles.map((vehicle) => {
      return {
        ...vehicle,
        filmsUrl: vehicle.films,
      };
    });

    return new GetVehiclesQueryResult({ items: resultVehicles, total: resultVehicles.length });
  }
}
