import { AwilixContainer } from "awilix";
import { asArray } from "@tshio/awilix-resolver";

export async function registerCommandHandlers(container: AwilixContainer) {
  container.register({
    commandHandlers: asArray<any>([]),
  });

  return container;
}
