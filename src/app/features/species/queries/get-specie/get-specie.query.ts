import { Query } from "@tshio/query-bus";

export const GET_SPECIE_QUERY_TYPE = "species/GET_SPECIE";

export interface GetSpecieQueryPayload {
  id: string;
}

export class GetSpecieQuery implements Query<GetSpecieQueryPayload> {
  public type: string = GET_SPECIE_QUERY_TYPE;

  constructor(public payload: GetSpecieQueryPayload) {}
}
