import { QueryResult } from "@tshio/query-bus";
import { StarWarsSpecie } from "../../../../../shared/types/starwars.types";

export class GetSpecieQueryResult implements QueryResult<any> {
  constructor(public result: StarWarsSpecie | null) {}
}
