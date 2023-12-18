import { Query } from "@tshio/query-bus";

export const GET_STARSHIP_QUERY_TYPE = "starship/GET_STARSHIP";

export interface GetStarshipQueryPayload {
  id: string;
}

export class GetStarshipQuery implements Query<GetStarshipQueryPayload> {
  public type: string = GET_STARSHIP_QUERY_TYPE;

  constructor(public payload: GetStarshipQueryPayload) {}
}
