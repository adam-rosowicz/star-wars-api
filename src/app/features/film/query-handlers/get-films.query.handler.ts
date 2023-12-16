import { QueryHandler } from "@tshio/query-bus";
import { GET_FILMS_QUERY_TYPE, GetFilmsQuery, GetFilmsQueryResult } from "../queries/get-films";
import { StarWarsClient } from "../../../../shared/clients/star-wars.client";

interface GetFilmsQueryDependencies {
  starWarsClient: StarWarsClient;
}

export default class GetFilmsQueryHandler implements QueryHandler<GetFilmsQuery, GetFilmsQueryResult> {
  public queryType: string = GET_FILMS_QUERY_TYPE;

  constructor(private dependencies: GetFilmsQueryDependencies) {}

  async execute(query: GetFilmsQuery): Promise<GetFilmsQueryResult> {
    const { filter } = query.payload;
    const films = await this.dependencies.starWarsClient.getFilms(filter);

    return new GetFilmsQueryResult({ items: films.results });
  }
}
