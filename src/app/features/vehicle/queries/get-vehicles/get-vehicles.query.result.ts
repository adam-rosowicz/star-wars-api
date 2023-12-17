import { QueryResult } from "@tshio/query-bus";
import { StarWarsVehicle } from "../../../../../shared/clients/star-wars.client";

interface GetVehiclesResult {
  items: StarWarsVehicle[];
}

export class GetVehiclesQueryResult implements QueryResult<any> {
  constructor(public result: GetVehiclesResult) {}
}
