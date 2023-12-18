import { QueryContext } from "../../../../../graphql/resolvers";
import { GetFilmQuery } from "../../queries/get-film";

export const getFilmQuery = async (parent: any, args: any, context: QueryContext) => {
  const { result } = await context.queryBus.execute(new GetFilmQuery(args));
  return result;
};