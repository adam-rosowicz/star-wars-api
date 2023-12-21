import { QueryHandler } from "@tshio/query-bus";
import { Logger } from "@tshio/logger";
import { GET_STARSHIP_QUERY_TYPE, GetStarshipQuery, GetStarshipQueryResult } from "../queries/get-starship";
import { StarWarsApi } from "../../../../shared/integrations/starwars-api/starwars-api";
import { StarWarsStarship, ResourcesType } from "../../../../shared/types/starwars.types";

interface GetStarshipQueryDependencies {
  starWarsApi: StarWarsApi;
  logger: Logger;
}
export default class GetStarshipQueryHandler implements QueryHandler<GetStarshipQuery, GetStarshipQueryResult> {
  public queryType: string = GET_STARSHIP_QUERY_TYPE;

  constructor(private dependencies: GetStarshipQueryDependencies) {}

  async execute(query: GetStarshipQuery): Promise<GetStarshipQueryResult> {
    const { id } = query.payload;
    const { logger, starWarsApi } = this.dependencies;

    logger.info("Query GetStarship executed");

    const starship = await starWarsApi.getResource<StarWarsStarship>(ResourcesType.Starships, id);

    if (!starship) {
      return new GetStarshipQueryResult(null);
    }
    const resultStarship = { filmsUrl: starship.films, ...starship };

    return new GetStarshipQueryResult(resultStarship);
  }
}
