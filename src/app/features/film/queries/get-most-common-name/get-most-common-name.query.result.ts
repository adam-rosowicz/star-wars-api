import { QueryResult } from "@tshio/query-bus";

interface GetMostCommonNamesResult {
  names: string[];
}

export class GetMostCommonNameQueryResult implements QueryResult<any> {
  constructor(public result: GetMostCommonNamesResult) {}
}
