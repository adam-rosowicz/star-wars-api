import { StarWarsFilm } from "../../../../../shared/integrations/starwars-api/starwars-api";
import { QueryContext } from "../../../../../graphql/resolvers";
import { GetFilmsQuery } from "../../queries/get-films";
import { GetUniqueWordsQuery } from "../../queries/get-unique-words";

export const getUniqueWordsQuery = async (_parent: any, args: any, context: QueryContext) => {
  const films = await context.queryBus.execute(new GetFilmsQuery({} as any));
  const openingCrawls = films.result.items.map((film: StarWarsFilm) => film.opening_crawl);

  const { result } = await context.queryBus.execute(new GetUniqueWordsQuery({ openingCrawls }));

  return result;
};
