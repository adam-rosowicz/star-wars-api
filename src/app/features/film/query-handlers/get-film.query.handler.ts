import { QueryHandler } from "@tshio/query-bus";
import { Logger } from "@tshio/logger";
import { GET_FILM_QUERY_TYPE, GetFilmQuery, GetFilmQueryResult } from "../queries/get-film";
import { StarWarsApi } from "../../../../shared/integrations/starwars-api/starwars-api";
import { StarWarsFilm, ResourcesType } from "../../../../shared/types/starwars.types";

interface GetFilmQueryDependencies {
  starWarsApi: StarWarsApi;
  logger: Logger;
}
export default class GetFilmQueryHandler implements QueryHandler<GetFilmQuery, GetFilmQueryResult> {
  public queryType: string = GET_FILM_QUERY_TYPE;

  constructor(private dependencies: GetFilmQueryDependencies) {}

  async execute(query: GetFilmQuery): Promise<GetFilmQueryResult> {
    const { id } = query.payload;
    const { starWarsApi, logger } = this.dependencies;

    logger.info("Query GetFilm executed");

    const film = await starWarsApi.getResource<StarWarsFilm>(ResourcesType.Films, id);

    if (!film) {
      return new GetFilmQueryResult(null);
    }

    const resultFilm = {
      planetsUrl: film.planets,
      speciesUrl: film.species,
      starshipsUrl: film.starships,
      vehiclesUrl: film.vehicles,
      ...film,
    };

    return new GetFilmQueryResult(resultFilm);
  }
}
