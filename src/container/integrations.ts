import { AwilixContainer, asClass } from "awilix";
import { StarWarsApi } from "../shared/integrations/starwars-api/starwars-api";
import { HttpProvider } from "../shared/integrations/http-provider/htttp-provider";

export async function registerIntegrations(container: AwilixContainer) {
  container.register({
    starWarsApi: asClass(StarWarsApi).singleton(),
    httpProvider: asClass(HttpProvider),
  });

  return container;
}
