import { QueryHandler } from "@tshio/query-bus";
import { Logger } from "@tshio/logger";
import {
  GET_MOST_COMMON_NAME_QUERY_TYPE,
  GetMostCommonNameQuery,
  GetMostCommonNameQueryResult,
} from "../queries/get-most-common-name";
import { ResourcesType, StarWarsFilm, StarWarsPerson } from "../../../../shared/types/starwars.types";
import { WordsService } from "../../../../shared/services/words.service";
import { CustomRedisClient } from "../../../../tools/cache-client";
import { COUNTED_UNIQUE_WORDS } from "../../../../shared/utils/cache.utils";
import { StarWarsApi } from "../../../../shared/integrations/starwars-api/starwars-api";

interface GetMostCommonNameQueryHandlerDenendencies {
  starWarsApi: StarWarsApi;
  wordsService: WordsService;
  redisClient: CustomRedisClient;
  logger: Logger;
}

export default class GetMostCommonNameQueryHandler
  implements QueryHandler<GetMostCommonNameQuery, GetMostCommonNameQueryResult>
{
  public queryType: string = GET_MOST_COMMON_NAME_QUERY_TYPE;

  constructor(private dependencies: GetMostCommonNameQueryHandlerDenendencies) {}

  async execute(): Promise<GetMostCommonNameQueryResult> {
    const { starWarsApi, wordsService, redisClient, logger } = this.dependencies;

    logger.info("Query GetMostCommonName executed");

    const personFirstNames = (await starWarsApi.getResources<StarWarsPerson>(ResourcesType.People)).map((person) =>
      person.name.split(" ")[0].toLowerCase(),
    );

    const redis = await redisClient.connect();

    const cachedUniqueWords = await redis.get(COUNTED_UNIQUE_WORDS);
    let countedUniqueWords: { word: string; count: number }[];

    if (cachedUniqueWords) {
      countedUniqueWords = JSON.parse(cachedUniqueWords);
    } else {
      const openingCrawls = (await starWarsApi.getResources<StarWarsFilm>(ResourcesType.Films)).map(
        (film) => film.opening_crawl,
      );

      const words = wordsService.getUniqueWordsWithCountFromTexts(openingCrawls);
      countedUniqueWords = Object.entries(words).map(([word, count]) => ({
        word,
        count,
      }));
    }

    const namesWithMaxCount = wordsService
      .getWordsMostOccuredInGivenList(personFirstNames, countedUniqueWords)
      .map((name) => `${name.word.charAt(0).toUpperCase()}${name.word.slice(1)}`);

    return new GetMostCommonNameQueryResult({ names: namesWithMaxCount });
  }
}
