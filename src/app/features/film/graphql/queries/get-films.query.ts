import { QueryContext } from "../../../../../graphql/resolvers";
import { GetFilmsQuery } from "../../queries/get-films";

export const getFilmsQuery = async (_parent: any, args: any, context: QueryContext) => {
  const { result } = await context.queryBus.execute(new GetFilmsQuery(args));
  return result;
};
