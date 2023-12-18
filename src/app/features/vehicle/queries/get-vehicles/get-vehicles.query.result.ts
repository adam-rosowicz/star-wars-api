import { QueryResult } from "@tshio/query-bus";
import { StarWarsVehicle } from "../../../../../shared/integrations/starwars-api";

interface GetVehiclesResult {
  items: StarWarsVehicle[];
}

export class GetVehiclesQueryResult implements QueryResult<any> {
  constructor(public result: GetVehiclesResult) {}
}
