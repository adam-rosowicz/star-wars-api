import { QueryHandler } from "@tshio/query-bus";
import { Logger } from "@tshio/logger";
import { GET_STARSHIPS_QUERY_TYPE, GetStarshipsQuery, GetStarshipsQueryResult } from "../queries/get-starships";
import { StarWarsApi } from "../../../../shared/integrations/starwars-api/starwars-api";
import { StarWarsStarship, ResourcesType } from "../../../../shared/types/starwars.types";

interface GetStarshipsQueryDependencies {
  starWarsApi: StarWarsApi;
  logger: Logger;
}

export default class GetStarshipsQueryHandler implements QueryHandler<GetStarshipsQuery, GetStarshipsQueryResult> {
  public queryType: string = GET_STARSHIPS_QUERY_TYPE;

  constructor(private dependencies: GetStarshipsQueryDependencies) {}

  async execute(query: GetStarshipsQuery): Promise<GetStarshipsQueryResult> {
    const { filter, page } = query.payload;
    const { logger, starWarsApi } = this.dependencies;

    logger.info("Query GetStarships executed");

    const starships = await starWarsApi.getResources<StarWarsStarship>(ResourcesType.Starships, filter, page);

    const resultStarships = starships.map((starship) => {
      return {
        ...starship,
        filmsUrl: starship.films,
      };
    });

    return new GetStarshipsQueryResult({ items: resultStarships, total: resultStarships.length });
  }
}
