import { Query } from "@tshio/query-bus";

export const GET_PLANETS_QUERY_TYPE = "planet/GET_PLANETS";

export interface GetPlanetsQueryPayload {
  filter: string;
}

export class GetPlanetsQuery implements Query<GetPlanetsQueryPayload> {
  public type: string = GET_PLANETS_QUERY_TYPE;

  constructor(public payload: GetPlanetsQueryPayload) {}
}
