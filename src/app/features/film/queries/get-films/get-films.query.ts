import { Query } from "@tshio/query-bus";

export const GET_FILMS_QUERY_TYPE = "film/GET_FILMS";

export interface GetFilmsQueryPayload {
  filter: string;
}

export class GetFilmsQuery implements Query<GetFilmsQueryPayload> {
  public type: string = GET_FILMS_QUERY_TYPE;

  constructor(public payload: GetFilmsQueryPayload) {}
}
