import { QueryContext } from "../../../../../graphql/resolvers";
import { GetSpecieQuery } from "../../queries/get-specie";

export const getSpecieQuery = async (parent: any, args: any, context: QueryContext) => {
  const { result } = await context.queryBus.execute(new GetSpecieQuery(args));
  return result;
};
