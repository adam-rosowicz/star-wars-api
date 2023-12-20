import { QueryContext } from "../../../../../graphql/resolvers";
import { GetStarshipQuery } from "../../queries/get-starship";

export const getStarshipQuery = async (parent: any, args: any, context: QueryContext) => {
  const { result } = await context.queryBus.execute(new GetStarshipQuery(args));
  return result;
};
