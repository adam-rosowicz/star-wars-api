import { QueryHandler } from "@tshio/query-bus";
import { GET_SPECIE_QUERY_TYPE, GetSpecieQuery, GetSpecieQueryResult } from "../queries/get-specie";
import { ResourcesType, StarWarsApi, StarWarsSpecie } from "../../../../shared/integrations/starwars-api";

interface GetSpecieQueryDependencies {
  starWarsApi: StarWarsApi;
}
export default class GetSpecieQueryHandler implements QueryHandler<GetSpecieQuery, GetSpecieQueryResult> {
  public queryType: string = GET_SPECIE_QUERY_TYPE;

  constructor(private dependencies: GetSpecieQueryDependencies) {}

  async execute(query: GetSpecieQuery): Promise<GetSpecieQueryResult> {
    const { id } = query.payload;

    const specie = await this.dependencies.starWarsApi.getResource<StarWarsSpecie>(ResourcesType.Species, id);

    return new GetSpecieQueryResult(specie);
  }
}
