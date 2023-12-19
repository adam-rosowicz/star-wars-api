import { QueryContext } from "../../../../../graphql/resolvers";
import { GetVehicleQuery } from "../../queries/get-vehicle";

export const getVehiclesByIdsQuery = async (parent: any, args: any, context: QueryContext) => {
  let result = [];

  if (parent.vehiclesUrl) {
    result = await Promise.all(
      parent.vehiclesUrl.map(async (url: string) => {
        const match = url.match(/\/(\d+)\/$/);
        const vehicleUrl = match ? match[1] : null;
        if (!vehicleUrl) {
          return null;
        }
        return context.queryBus.execute(new GetVehicleQuery({ id: vehicleUrl }));
      }),
    );
  }

  return result.map((item) => item.result);
};
