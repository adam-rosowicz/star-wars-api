import { AwilixContainer, asClass } from "awilix";
import { StarWarsClient } from "../shared/clients/star-wars.client";

export async function registerClients(container: AwilixContainer) {
  container.register({
    starWarsClient: asClass(StarWarsClient),
  });

  return container;
}
