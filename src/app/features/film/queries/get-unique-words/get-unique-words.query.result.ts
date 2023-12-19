import { QueryResult } from "@tshio/query-bus";

interface GetUniqueWordsResult {
  items: {
    word: string;
    count: number;
  }[];
  total: number;
}

export class GetUniqueWordsQueryResult implements QueryResult<any> {
  constructor(public result: GetUniqueWordsResult) {}
}
