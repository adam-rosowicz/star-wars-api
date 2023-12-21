import { QueryHandler } from "@tshio/query-bus";
import { GET_STARSHIPS_QUERY_TYPE, GetStarshipsQuery, GetStarshipsQueryResult } from "../queries/get-starships";
import {
  ResourcesType,
  StarWarsApi,
  StarWarsStarship,
} from "../../../../shared/integrations/starwars-api/starwars-api";

interface GetStarshipsQueryDependencies {
  starWarsApi: StarWarsApi;
}

export default class GetStarshipsQueryHandler implements QueryHandler<GetStarshipsQuery, GetStarshipsQueryResult> {
  public queryType: string = GET_STARSHIPS_QUERY_TYPE;

  constructor(private dependencies: GetStarshipsQueryDependencies) {}

  async execute(query: GetStarshipsQuery): Promise<GetStarshipsQueryResult> {
    const { filter, page } = query.payload;
    const starships = await this.dependencies.starWarsApi.getResources<StarWarsStarship>(
      ResourcesType.Starships,
      filter,
      page,
    );

    const resultStarships = starships.map((starship) => {
      return {
        ...starship,
        filmsUrl: starship.films,
      };
    });

    return new GetStarshipsQueryResult({ items: resultStarships, total: resultStarships.length });
  }
}
