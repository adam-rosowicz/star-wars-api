import { QueryResult } from "@tshio/query-bus";
import { StarWarsVehicle } from "../../../../../shared/integrations/starwars-api";

export class GetVehicleQueryResult implements QueryResult<any> {
  constructor(public result: StarWarsVehicle) {}
}
