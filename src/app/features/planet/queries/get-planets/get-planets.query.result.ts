import { QueryResult } from "@tshio/query-bus";
import { StarWarsPlanet } from "../../../../../shared/clients/star-wars.client";

interface GetPlanetsResult {
  items: StarWarsPlanet[];
}

export class GetPlanetsQueryResult implements QueryResult<any> {
  constructor(public result: GetPlanetsResult) {}
}
