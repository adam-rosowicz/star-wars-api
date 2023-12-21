import { QueryResult } from "@tshio/query-bus";
import { StarWarsStarship } from "../../../../../shared/types/starwars.types";

export class GetStarshipQueryResult implements QueryResult<any> {
  constructor(public result: StarWarsStarship | null) {}
}
