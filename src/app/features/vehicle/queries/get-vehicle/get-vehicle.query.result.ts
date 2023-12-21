import { QueryResult } from "@tshio/query-bus";
import { StarWarsVehicle } from "../../../../../shared/types/starwars.types";

export class GetVehicleQueryResult implements QueryResult<any> {
  constructor(public result: StarWarsVehicle | null) {}
}
