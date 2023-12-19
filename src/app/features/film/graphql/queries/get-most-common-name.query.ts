import { QueryContext } from "../../../../../graphql/resolvers";
import { GetMostCommonNameQuery } from "../../queries/get-most-common-name";

export const getMostCommonNameQuery = async (parent: any, args: any, context: QueryContext) => {
  const { result } = await context.queryBus.execute(new GetMostCommonNameQuery(args));
  return result;
};