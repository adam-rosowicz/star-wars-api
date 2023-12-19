import { QueryHandler } from "@tshio/query-bus";
import { GET_VEHICLE_QUERY_TYPE, GetVehicleQuery, GetVehicleQueryResult } from "../queries/get-vehicle";
import { StarWarsApi, StarWarsVehicle, ResourcesType } from "../../../../shared/integrations/starwars-api";

interface GetVehicleQueryDependencies {
  starWarsApi: StarWarsApi;
}

export default class GetVehicleQueryHandler implements QueryHandler<GetVehicleQuery, GetVehicleQueryResult> {
  public queryType: string = GET_VEHICLE_QUERY_TYPE;

  constructor(private dependencies: GetVehicleQueryDependencies) {}

  async execute(query: GetVehicleQuery): Promise<GetVehicleQueryResult> {
    const { id } = query.payload;

    const vehicle = await this.dependencies.starWarsApi.getResource<StarWarsVehicle>(ResourcesType.Vehicles, id);

    if (!vehicle) {
      return new GetVehicleQueryResult(null);
    }

    const resultVehicle = { filmsUrl: vehicle.films, ...vehicle };

    return new GetVehicleQueryResult(resultVehicle);
  }
}
