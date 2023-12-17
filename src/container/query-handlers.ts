import { AwilixContainer, asClass } from "awilix";
import { asArray } from "@tshio/awilix-resolver";

import GetFilmsQueryHandler from "../app/features/film/query-handlers/get-films.query.handler";
import GetSpeciesQueryHandler from "../app/features/species/query-handlers/get-species.query.handler";
import GetVehiclesQueryHandler from "../app/features/vehicle/query-handlers/get-vehicles.query.handler";
// HANDLERS_IMPORTS

export async function registerQueryHandlers(container: AwilixContainer) {
  container.register({
    queryHandlers: asArray<any>([
      asClass(GetFilmsQueryHandler),
      asClass(GetSpeciesQueryHandler),
      asClass(GetVehiclesQueryHandler),
      // QUERY_HANDLERS_SETUP
    ]),
  });

  return container;
}
