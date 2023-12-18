import { QueryResult } from "@tshio/query-bus";
import { StarWarsFilm } from "../../../../../shared/integrations/starwars-api";

export class GetFilmQueryResult implements QueryResult<any> {
  constructor(public result: StarWarsFilm) {}
}
