import { QueryResult } from "@tshio/query-bus";
import { StarWarsFilm } from "../../../../../shared/integrations/starwars-api";

interface GetFilmsResult {
  items: StarWarsFilm[];
}

export class GetFilmsQueryResult implements QueryResult<any> {
  constructor(public result: GetFilmsResult) {}
}
