import { Query } from "@tshio/query-bus";

export const GET_UNIQUE_WORDS_QUERY_TYPE = "film/GET_UNIQUE_WORDS";

export interface GetUniqueWordsQueryPayload {
  openingCrawls: string[];
}

export class GetUniqueWordsQuery implements Query<GetUniqueWordsQueryPayload> {
  public type: string = GET_UNIQUE_WORDS_QUERY_TYPE;

  constructor(public payload: GetUniqueWordsQueryPayload) {}
}
