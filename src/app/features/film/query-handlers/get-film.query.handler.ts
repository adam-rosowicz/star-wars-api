import { QueryHandler } from "@tshio/query-bus";
import { GET_FILM_QUERY_TYPE, GetFilmQuery, GetFilmQueryResult } from "../queries/get-film";
import { ResourcesType, StarWarsApi, StarWarsFilm } from "../../../../shared/integrations/starwars-api";

interface GetFilmQueryDependencies {
  starWarsApi: StarWarsApi;
}
export default class GetFilmQueryHandler implements QueryHandler<GetFilmQuery, GetFilmQueryResult> {
  public queryType: string = GET_FILM_QUERY_TYPE;

  constructor(private dependencies: GetFilmQueryDependencies) {}

  async execute(query: GetFilmQuery): Promise<GetFilmQueryResult> {
    const { id } = query.payload;

    const film = await this.dependencies.starWarsApi.getResource<StarWarsFilm>(ResourcesType.Films, id);
    return new GetFilmQueryResult(film);
  }
}
