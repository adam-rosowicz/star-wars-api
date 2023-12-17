import { QueryHandler } from "@tshio/query-bus";
import { GET_STARSHIPS_QUERY_TYPE, GetStarshipsQuery, GetStarshipsQueryResult } from "../queries/get-starships";
import { StarWarsClient } from "../../../../shared/clients/star-wars.client";

interface GetStarshipsQueryDependencies {
  starWarsClient: StarWarsClient;
}

export default class GetStarshipsQueryHandler implements QueryHandler<GetStarshipsQuery, GetStarshipsQueryResult> {
  public queryType: string = GET_STARSHIPS_QUERY_TYPE;

  constructor(private dependencies: GetStarshipsQueryDependencies) {}

  async execute(query: GetStarshipsQuery): Promise<GetStarshipsQueryResult> {
    const { filter } = query.payload;
    const starships = await this.dependencies.starWarsClient.getStarships(filter);

    return new GetStarshipsQueryResult({ items: starships });
  }
}
