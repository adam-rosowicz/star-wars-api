import { QueryResult } from "@tshio/query-bus";
import { StarWarsSpecie } from "../../../../../shared/types/starwars.types";

interface GetSpeciesResult {
  items: StarWarsSpecie[];
  total: number;
}

export class GetSpeciesQueryResult implements QueryResult<any> {
  constructor(public result: GetSpeciesResult) {}
}
