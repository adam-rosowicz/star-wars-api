import { QueryContext } from "../../../../../graphql/resolvers";
import { GetPlanetsQuery } from "../../queries/get-planets";

export const getPlanetsQuery = async (parent: any, args: any, context: QueryContext) => {
  const { result } = await context.queryBus.execute(new GetPlanetsQuery(args));
  return result;
};
