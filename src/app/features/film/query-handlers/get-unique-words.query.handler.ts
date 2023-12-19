import { QueryHandler } from "@tshio/query-bus";
import {
  GET_UNIQUE_WORDS_QUERY_TYPE,
  GetUniqueWordsQuery,
  GetUniqueWordsQueryResult,
} from "../queries/get-unique-words";
import { WordsService } from "../../../../shared/services/words.service";

interface GetUniqueWordsQueryHandlerDependencies {
  wordsService: WordsService;
}

export default class GetUniqueWordsQueryHandler
  implements QueryHandler<GetUniqueWordsQuery, GetUniqueWordsQueryResult>
{
  public queryType: string = GET_UNIQUE_WORDS_QUERY_TYPE;

  constructor(private dependencies: GetUniqueWordsQueryHandlerDependencies) {}

  async execute(query: GetUniqueWordsQuery): Promise<GetUniqueWordsQueryResult> {
    const { openingCrawls } = query.payload;
    const { wordsService } = this.dependencies;

    const countedWords = wordsService.getUniqueWordsWithCountFromTexts(openingCrawls);

    const result = Object.entries(countedWords)
      .map(([word, count]) => ({
        word,
        count,
      }))
      .sort((a, b) => b.count - a.count);

    return new GetUniqueWordsQueryResult({ items: result, total: result.length });
  }
}
