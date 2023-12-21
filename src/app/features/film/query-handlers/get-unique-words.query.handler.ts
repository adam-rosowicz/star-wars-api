import { QueryHandler } from "@tshio/query-bus";
import { Logger } from "@tshio/logger";
import {
  GET_UNIQUE_WORDS_QUERY_TYPE,
  GetUniqueWordsQuery,
  GetUniqueWordsQueryResult,
} from "../queries/get-unique-words";
import { WordsService } from "../../../../shared/services/words.service";
import { CustomRedisClient } from "../../../../tools/cache-client";
import { CACHE_TIME_TO_LIVE, COUNTED_UNIQUE_WORDS } from "../../../../shared/utils/cache.utils";

interface GetUniqueWordsQueryHandlerDependencies {
  wordsService: WordsService;
  redisClient: CustomRedisClient;
  logger: Logger;
}

export default class GetUniqueWordsQueryHandler
  implements QueryHandler<GetUniqueWordsQuery, GetUniqueWordsQueryResult>
{
  public queryType: string = GET_UNIQUE_WORDS_QUERY_TYPE;

  constructor(private dependencies: GetUniqueWordsQueryHandlerDependencies) {}

  async execute(query: GetUniqueWordsQuery): Promise<GetUniqueWordsQueryResult> {
    const { openingCrawls } = query.payload;
    const { wordsService, redisClient, logger } = this.dependencies;

    logger.info("Query GetUniqueWords executed");

    const countedWords = wordsService.getUniqueWordsWithCountFromTexts(openingCrawls);

    const result = Object.entries(countedWords)
      .map(([word, count]) => ({
        word,
        count,
      }))
      .sort((a, b) => b.count - a.count);

    const client = await redisClient.connect();

    client.set(COUNTED_UNIQUE_WORDS, JSON.stringify(result), { EX: CACHE_TIME_TO_LIVE });

    return new GetUniqueWordsQueryResult({ items: result, total: result.length });
  }
}
