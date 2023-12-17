import { QueryResult } from "@tshio/query-bus";
import { StarWarsStarship } from "../../../../../shared/clients/star-wars.client";

interface GetStarshipsResult {
  items: StarWarsStarship[];
}

export class GetStarshipsQueryResult implements QueryResult<any> {
  constructor(public result: GetStarshipsResult) {}
}
