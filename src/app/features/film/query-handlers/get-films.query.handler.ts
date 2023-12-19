import { QueryHandler } from "@tshio/query-bus";
import { GET_FILMS_QUERY_TYPE, GetFilmsQuery, GetFilmsQueryResult } from "../queries/get-films";
import { ResourcesType, StarWarsApi, StarWarsFilm } from "../../../../shared/integrations/starwars-api";

interface GetFilmsQueryDependencies {
  starWarsApi: StarWarsApi;
}

export default class GetFilmsQueryHandler implements QueryHandler<GetFilmsQuery, GetFilmsQueryResult> {
  public queryType: string = GET_FILMS_QUERY_TYPE;

  constructor(private dependencies: GetFilmsQueryDependencies) {}

  async execute(query: GetFilmsQuery): Promise<GetFilmsQueryResult> {
    const { filter, page } = query.payload;
    const films = await this.dependencies.starWarsApi.getResources<StarWarsFilm>(ResourcesType.Films, filter, page);

    const resultFilms = films.map((film) => {
      return {
        planetsUrl: film.planets,
        speciesUrl: film.species,
        starshipsUrl: film.starships,
        vehiclesUrl: film.vehicles,
        ...film,
      };
    });

    return new GetFilmsQueryResult({ items: resultFilms, total: resultFilms.length });
  }
}
