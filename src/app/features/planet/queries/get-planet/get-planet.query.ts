import { Query } from "@tshio/query-bus";

export const GET_PLANET_QUERY_TYPE = "planet/GET_PLANET";

export interface GetPlanetQueryPayload {
  id: string;
}

export class GetPlanetQuery implements Query<GetPlanetQueryPayload> {
  public type: string = GET_PLANET_QUERY_TYPE;

  constructor(public payload: GetPlanetQueryPayload) {}
}
