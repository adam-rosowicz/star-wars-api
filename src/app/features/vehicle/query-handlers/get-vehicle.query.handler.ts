import { QueryHandler } from "@tshio/query-bus";
import { Logger } from "@tshio/logger";
import { GET_VEHICLE_QUERY_TYPE, GetVehicleQuery, GetVehicleQueryResult } from "../queries/get-vehicle";
import { StarWarsApi } from "../../../../shared/integrations/starwars-api/starwars-api";
import { StarWarsVehicle, ResourcesType } from "../../../../shared/types/starwars.types";

interface GetVehicleQueryDependencies {
  starWarsApi: StarWarsApi;
  logger: Logger;
}

export default class GetVehicleQueryHandler implements QueryHandler<GetVehicleQuery, GetVehicleQueryResult> {
  public queryType: string = GET_VEHICLE_QUERY_TYPE;

  constructor(private dependencies: GetVehicleQueryDependencies) {}

  async execute(query: GetVehicleQuery): Promise<GetVehicleQueryResult> {
    const { id } = query.payload;
    const { logger, starWarsApi } = this.dependencies;

    logger.info("Query GetVehicle executed");

    const vehicle = await starWarsApi.getResource<StarWarsVehicle>(ResourcesType.Vehicles, id);

    if (!vehicle) {
      return new GetVehicleQueryResult(null);
    }

    const resultVehicle = { filmsUrl: vehicle.films, ...vehicle };

    return new GetVehicleQueryResult(resultVehicle);
  }
}
