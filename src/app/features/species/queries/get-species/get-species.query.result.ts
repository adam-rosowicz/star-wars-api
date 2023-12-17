import { QueryResult } from "@tshio/query-bus";
import { StarWarsSpecie } from "../../../../../shared/clients/star-wars.client";

interface GetSpeciesResult {
  items: StarWarsSpecie[];
}

export class GetSpeciesQueryResult implements QueryResult<any> {
  constructor(public result: GetSpeciesResult) {}
}
