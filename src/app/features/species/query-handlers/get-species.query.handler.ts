import { QueryHandler } from "@tshio/query-bus";
import { GET_SPECIES_QUERY_TYPE, GetSpeciesQuery, GetSpeciesQueryResult } from "../queries/get-species";
import { StarWarsClient } from "../../../../shared/clients/star-wars.client";

interface GetSpeciesQueryDependencies {
  starWarsClient: StarWarsClient;
}

export default class GetSpeciesQueryHandler implements QueryHandler<GetSpeciesQuery, GetSpeciesQueryResult> {
  public queryType: string = GET_SPECIES_QUERY_TYPE;

  constructor(private dependencies: GetSpeciesQueryDependencies) {}

  async execute(query: GetSpeciesQuery): Promise<GetSpeciesQueryResult> {
    const { filter } = query.payload;
    const species = await this.dependencies.starWarsClient.getSpecies(filter);

    return new GetSpeciesQueryResult({ items: species });
  }
}
