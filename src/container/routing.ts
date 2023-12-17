import { AwilixContainer, Lifetime, asClass, asFunction } from "awilix";
import { filmRouting } from "../app/features/film/routing";
import { speciesRouting } from "../app/features/species/routing";
import { vehicleRouting } from "../app/features/vehicle/routing";
import { starshipRouting } from "../app/features/starship/routing";
import { planetRouting } from "../app/features/planet/routing";
// ROUTING_IMPORTS

export async function registerRouting(container: AwilixContainer) {
  container.loadModules(["src/app/**/*.action.js"], {
    formatName: "camelCase",
    resolverOptions: {
      lifetime: Lifetime.SCOPED,
      register: asClass,
    },
  });

  container.register({
    filmRouting: asFunction(filmRouting),
    speciesRouting: asFunction(speciesRouting),
    vehicleRouting: asFunction(vehicleRouting),
    starshipRouting: asFunction(starshipRouting),
    planetRouting: asFunction(planetRouting),
    // ROUTING_SETUP
  });

  return container;
}
