import { Query } from "@tshio/query-bus";

export const GET_FILM_QUERY_TYPE = "film/GET_FILM";

export interface GetFilmQueryPayload {
  id: string;
}

export class GetFilmQuery implements Query<GetFilmQueryPayload> {
  public type: string = GET_FILM_QUERY_TYPE;

  constructor(public payload: GetFilmQueryPayload) {}
}
