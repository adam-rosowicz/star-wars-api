import { QueryResult } from "@tshio/query-bus";
import { StarWarsFilm } from "../../../../../shared/integrations/starwars-api/starwars-api";

interface GetFilmsResult {
  items: StarWarsFilm[];
  total: number;
}

export class GetFilmsQueryResult implements QueryResult<any> {
  constructor(public result: GetFilmsResult) {}
}
