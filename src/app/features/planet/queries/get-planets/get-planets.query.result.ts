import { QueryResult } from "@tshio/query-bus";
import { StarWarsPlanet } from "../../../../../shared/integrations/starwars-api";

interface GetPlanetsResult {
  items: StarWarsPlanet[];
  total: number;
}

export class GetPlanetsQueryResult implements QueryResult<any> {
  constructor(public result: GetPlanetsResult) {}
}
