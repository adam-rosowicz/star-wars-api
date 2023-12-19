import { Query } from "@tshio/query-bus";

export const GET_MOST_COMMON_NAME_QUERY_TYPE = "film/GET_MOST_COMMON_NAME";

export interface GetMostCommonNameQueryPayload {}

export class GetMostCommonNameQuery implements Query<GetMostCommonNameQueryPayload> {
  public type: string = GET_MOST_COMMON_NAME_QUERY_TYPE;

  constructor(public payload: GetMostCommonNameQueryPayload) {}
}
