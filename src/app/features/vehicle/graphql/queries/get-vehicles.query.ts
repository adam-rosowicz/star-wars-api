import { QueryContext } from "../../../../../graphql/resolvers";
import { GetVehiclesQuery } from "../../queries/get-vehicles";

export const getVehiclesQuery = async (_parent: any, args: any, context: QueryContext) => {
  const { result } = await context.queryBus.execute(new GetVehiclesQuery(args));
  return result;
};
