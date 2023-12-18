import { QueryResult } from "@tshio/query-bus";
import { StarWarsStarship } from "../../../../../shared/integrations/starwars-api";

export class GetStarshipQueryResult implements QueryResult<any> {
  constructor(public result: StarWarsStarship) {}
}
