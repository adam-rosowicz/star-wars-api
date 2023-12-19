import { Specie } from "../../../../../graphql/types";
import { QueryContext } from "../../../../../graphql/resolvers";
import { GetSpecieQuery } from "../../queries/get-specie";

export const getSpeciesByIdsQuery = async (parent: any, args: any, context: QueryContext) => {
  let result = [];

  if (parent.speciesUrl) {
    result = await Promise.all(
      parent.speciesUrl.map(async (url: string) => {
        const match = url.match(/\/(\d+)\/$/);
        const specieId = match ? match[1] : null;
        if (!specieId) {
          return null;
        }
        return context.queryBus.execute(new GetSpecieQuery({ id: specieId }));
      }),
    );
  }

  return result.map((item) => item.result) as Specie[];
};
