import { QueryContext } from "../../../../../graphql/resolvers";
import { GetPlanetQuery } from "../../queries/get-planet";

export const getPlanetQuery = async (parent: any, args: any, context: QueryContext) => {
  const { result } = await context.queryBus.execute(new GetPlanetQuery(args));
  return result;
};
