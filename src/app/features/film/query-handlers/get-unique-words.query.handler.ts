import { QueryHandler } from "@tshio/query-bus";
import {
  GET_UNIQUE_WORDS_QUERY_TYPE,
  GetUniqueWordsQuery,
  GetUniqueWordsQueryResult,
} from "../queries/get-unique-words";
import { WordsService } from "../../../../shared/services/words.service";
import { CustomRedisClient } from "../../../../tools/cache-client";

export const COUNTED_UNIQUE_WORDS = "countedUniqueWords";

interface GetUniqueWordsQueryHandlerDependencies {
  wordsService: WordsService;
  redisClient: CustomRedisClient;
}

export default class GetUniqueWordsQueryHandler
  implements QueryHandler<GetUniqueWordsQuery, GetUniqueWordsQueryResult>
{
  public queryType: string = GET_UNIQUE_WORDS_QUERY_TYPE;

  constructor(private dependencies: GetUniqueWordsQueryHandlerDependencies) {}

  async execute(query: GetUniqueWordsQuery): Promise<GetUniqueWordsQueryResult> {
    const { openingCrawls } = query.payload;
    const { wordsService, redisClient } = this.dependencies;

    const countedWords = wordsService.getUniqueWordsWithCountFromTexts(openingCrawls);

    const result = Object.entries(countedWords)
      .map(([word, count]) => ({
        word,
        count,
      }))
      .sort((a, b) => b.count - a.count);

    const client = await redisClient.connect();

    client.set(COUNTED_UNIQUE_WORDS, JSON.stringify(result), { EX: 10 });

    return new GetUniqueWordsQueryResult({ items: result, total: result.length });
  }
}
