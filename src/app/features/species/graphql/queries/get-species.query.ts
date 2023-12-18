import { QueryContext } from "../../../../../graphql/resolvers";
import { GetSpeciesQuery } from "../../queries/get-species";

export const getSpeciesQuery = async (_parent: any, args: any, context: QueryContext) => {
  const { result } = await context.queryBus.execute(new GetSpeciesQuery(args));
  return result;
};
