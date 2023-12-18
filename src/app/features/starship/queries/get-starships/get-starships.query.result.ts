import { QueryResult } from "@tshio/query-bus";
import { StarWarsStarship } from "../../../../../shared/integrations/starwars-api";

interface GetStarshipsResult {
  items: StarWarsStarship[];
}

export class GetStarshipsQueryResult implements QueryResult<any> {
  constructor(public result: GetStarshipsResult) {}
}
