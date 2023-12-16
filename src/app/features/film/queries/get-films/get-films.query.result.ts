import { QueryResult } from "@tshio/query-bus";
import { StarWarsFilm } from "../../../../../shared/clients/star-wars.client";

interface GetFilmsResult {
  items: StarWarsFilm[];
}

export class GetFilmsQueryResult implements QueryResult<any> {
  constructor(public result: GetFilmsResult) {}
}
