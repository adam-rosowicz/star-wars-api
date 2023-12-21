import { QueryResult } from "@tshio/query-bus";
import { StarWarsFilm } from "../../../../../shared/types/starwars.types";

export class GetFilmQueryResult implements QueryResult<any> {
  constructor(public result: StarWarsFilm | null) {}
}
