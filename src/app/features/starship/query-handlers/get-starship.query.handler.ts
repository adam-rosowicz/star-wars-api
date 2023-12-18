import { QueryHandler } from "@tshio/query-bus";
import { GET_STARSHIP_QUERY_TYPE, GetStarshipQuery, GetStarshipQueryResult } from "../queries/get-starship";
import { ResourcesType, StarWarsApi, StarWarsStarship } from "../../../../shared/integrations/starwars-api";

interface GetStarshipQueryDependencies {
  starWarsApi: StarWarsApi;
}
export default class GetStarshipQueryHandler implements QueryHandler<GetStarshipQuery, GetStarshipQueryResult> {
  public queryType: string = GET_STARSHIP_QUERY_TYPE;

  constructor(private dependencies: GetStarshipQueryDependencies) {}

  async execute(query: GetStarshipQuery): Promise<GetStarshipQueryResult> {
    const { id } = query.payload;

    return new GetStarshipQueryResult(starship);
  }
}
