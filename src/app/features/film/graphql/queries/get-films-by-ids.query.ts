import { QueryContext } from "../../../../../graphql/resolvers";
import { GetFilmQuery } from "../../queries/get-film";

export const getFilmsByIdsQuery = async (parent: any, args: any, context: QueryContext) => {
  let result = [];

  if (parent.filmsUrl) {
    result = await Promise.all(
      parent.filmsUrl.map(async (url: string) => {
        const match = url.match(/\/(\d+)\/$/);
        const filmId = match ? match[1] : null;
        if (!filmId) {
          return null;
        }
        return context.queryBus.execute(new GetFilmQuery({ id: filmId }));
      }),
    );
  }

  return result.map((item) => item.result);
};
