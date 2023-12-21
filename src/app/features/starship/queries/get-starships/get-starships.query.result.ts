import { QueryResult } from "@tshio/query-bus";
import { StarWarsStarship } from "../../../../../shared/integrations/starwars-api/starwars-api";

interface GetStarshipsResult {
  items: StarWarsStarship[];
  total: number;
}

export class GetStarshipsQueryResult implements QueryResult<any> {
  constructor(public result: GetStarshipsResult) {}
}
