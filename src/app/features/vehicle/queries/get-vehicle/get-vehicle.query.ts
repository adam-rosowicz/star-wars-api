import { Query } from "@tshio/query-bus";

export const GET_VEHICLE_QUERY_TYPE = "vehicle/GET_VEHICLE";

export interface GetVehicleQueryPayload {
  id: string;
}

export class GetVehicleQuery implements Query<GetVehicleQueryPayload> {
  public type: string = GET_VEHICLE_QUERY_TYPE;

  constructor(public payload: GetVehicleQueryPayload) {}
}
