import { QueryResult } from "@tshio/query-bus";
import { StarWarsSpecie } from "../../../../../shared/integrations/starwars-api";

export class GetSpecieQueryResult implements QueryResult<any> {
  constructor(public result: StarWarsSpecie | null) {}
}
