import { QueryHandler } from "@tshio/query-bus";
import { GET_SPECIES_QUERY_TYPE, GetSpeciesQuery, GetSpeciesQueryResult } from "../queries/get-species";
import { ResourcesType, StarWarsApi, StarWarsSpecie } from "../../../../shared/integrations/starwars-api/starwars-api";

interface GetSpeciesQueryDependencies {
  starWarsApi: StarWarsApi;
}

export default class GetSpeciesQueryHandler implements QueryHandler<GetSpeciesQuery, GetSpeciesQueryResult> {
  public queryType: string = GET_SPECIES_QUERY_TYPE;

  constructor(private dependencies: GetSpeciesQueryDependencies) {}

  async execute(query: GetSpeciesQuery): Promise<GetSpeciesQueryResult> {
    const { filter, page } = query.payload;

    const species = await this.dependencies.starWarsApi.getResources<StarWarsSpecie>(
      ResourcesType.Species,
      filter,
      page,
    );

    const resultSpecies = species.map((specie) => {
      return {
        filmsUrl: specie.films,
        ...specie,
      };
    });

    return new GetSpeciesQueryResult({ items: resultSpecies, total: resultSpecies.length });
  }
}
