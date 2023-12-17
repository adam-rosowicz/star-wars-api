import { AwilixContainer, Lifetime, asClass, asFunction } from "awilix";
import { filmRouting } from "../app/features/film/routing";
import { speciesRouting } from "../app/features/species/routing";
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
    // ROUTING_SETUP
  });

  return container;
}
