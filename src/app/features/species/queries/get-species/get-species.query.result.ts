import { QueryResult } from "@tshio/query-bus";
import { StarWarsSpecie } from "../../../../../shared/integrations/starwars-api";

interface GetSpeciesResult {
  items: StarWarsSpecie[];
  total: number;
}

export class GetSpeciesQueryResult implements QueryResult<any> {
  constructor(public result: GetSpeciesResult) {}
}
