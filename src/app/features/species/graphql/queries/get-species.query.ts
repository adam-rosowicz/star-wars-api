import { QueryContext } from "../../../../../graphql/resolvers";
import { GetSpeciesQuery } from "../../queries/get-species";

export const getSpeciesQuery = async (_parent: any, args: any, context: QueryContext, info: any) => {
  const { result } = await context.queryBus.execute(new GetSpeciesQuery(args));
  info.cacheControl.setCacheHint({ maxAge: 500 });
  return result;
};
