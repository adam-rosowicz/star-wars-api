import { Query } from "@tshio/query-bus";

export const GET_SPECIES_QUERY_TYPE = "species/GET_SPECIES";

export interface GetSpeciesQueryPayload {
  filter: string;
}

export class GetSpeciesQuery implements Query<GetSpeciesQueryPayload> {
  public type: string = GET_SPECIES_QUERY_TYPE;

  constructor(public payload: GetSpeciesQueryPayload) {}
}
