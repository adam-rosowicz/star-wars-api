import { AwilixContainer, asClass } from "awilix";
import { WordsService } from "../shared/services/words.service";

export async function registerServices(container: AwilixContainer) {
  container.register({
    wordsService: asClass(WordsService),
  });

  return container;
}
