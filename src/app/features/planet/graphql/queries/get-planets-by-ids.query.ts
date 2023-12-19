import { Planet } from "../../../../../graphql/types";
import { QueryContext } from "../../../../../graphql/resolvers";
import { GetPlanetQuery } from "../../queries/get-planet";

export const getPlanetsByIdsQuery = async (parent: any, args: any, context: QueryContext) => {
  let result = [];

  if (parent.planetsUrl) {
    result = await Promise.all(
      parent.planetsUrl.map(async (url: string) => {
        const match = url.match(/\/(\d+)\/$/);
        const planetId = match ? match[1] : null;
        if (!planetId) {
          return null;
        }
        return context.queryBus.execute(new GetPlanetQuery({ id: planetId }));
      }),
    );
  }

  return result.map((item) => item.result) as Planet[];
};
