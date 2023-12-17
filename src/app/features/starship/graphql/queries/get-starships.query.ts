import { QueryContext } from "../../../../../graphql/resolvers";
import { GetStarshipsQuery } from "../../queries/get-starships";

export const getStarshipsQuery = async (parent: any, args: any, context: QueryContext) => {
  const { result } = await context.queryBus.execute(new GetStarshipsQuery(args));
  return result;
};