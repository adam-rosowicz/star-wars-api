import { AwilixContainer, asClass } from "awilix";
import { StarWarsApi } from "../shared/integrations/starwars-api";
import { HttpProvider } from "../shared/integrations/http-provider";

export async function registerIntegrations(container: AwilixContainer) {
  container.register({
    starWarsApi: asClass(StarWarsApi),
    httpProvider: asClass(HttpProvider),
  });

  return container;
}
