import { QueryContext } from "../../../../../graphql/resolvers";
import { GetStarshipQuery } from "../../queries/get-starship";

export const getStarshipsByIdsQuery = async (parent: any, args: any, context: QueryContext) => {
  let result = [];

  if (parent.starshipsUrl) {
    result = await Promise.all(
      parent.starshipsUrl.map(async (url: string) => {
        const match = url.match(/\/(\d+)\/$/);
        const starshipUrl = match ? match[1] : null;
        if (!starshipUrl) {
          return null;
        }
        return context.queryBus.execute(new GetStarshipQuery({ id: starshipUrl }));
      }),
    );
  }

  return result.map((item) => item.result);
};
