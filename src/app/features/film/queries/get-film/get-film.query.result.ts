import { QueryResult } from "@tshio/query-bus";
import { StarWarsFilm } from "../../../../../shared/integrations/starwars-api/starwars-api";

export class GetFilmQueryResult implements QueryResult<any> {
  constructor(public result: StarWarsFilm | null) {}
}
