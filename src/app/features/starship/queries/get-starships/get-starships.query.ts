import { Query } from "@tshio/query-bus";

export const GET_STARSHIPS_QUERY_TYPE = "starship/GET_STARSHIPS";

export interface GetStarshipsQueryPayload {
  filter: string;
}

export class GetStarshipsQuery implements Query<GetStarshipsQueryPayload> {
  public type: string = GET_STARSHIPS_QUERY_TYPE;

  constructor(public payload: GetStarshipsQueryPayload) {}
}
