import { QueryContext } from "../../../../../graphql/resolvers";
import { GetVehicleQuery } from "../../queries/get-vehicle";

export const getVehicleQuery = async (_parent: any, args: any, context: QueryContext) => {
  const { result } = await context.queryBus.execute(new GetVehicleQuery(args));
  return result;
};
