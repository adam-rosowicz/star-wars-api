import { Query } from "@tshio/query-bus";

export const GET_VEHICLES_QUERY_TYPE = "vehicle/GET_VEHICLES";

export interface GetVehiclesQueryPayload {
  filter: string;
}

export class GetVehiclesQuery implements Query<GetVehiclesQueryPayload> {
  public type: string = GET_VEHICLES_QUERY_TYPE;

  constructor(public payload: GetVehiclesQueryPayload) {}
}
