import { AwilixContainer, asValue, asClass, asFunction } from "awilix";
import { QueryBus } from "@tshio/query-bus";
import { CommandBus } from "@tshio/command-bus";
import { EventDispatcher } from "@tshio/event-dispatcher";
import { createLogger, restrictFromProduction } from "@tshio/logger";
import { AppConfig } from "../config/app";
import { cacheClient } from "../tools/cache-client";
import { createRouter } from "../app/router";
import { starWarsApiConfig } from "../config/star-wars-api";

export async function registerCommonDependencies(appConfig: AppConfig, container: AwilixContainer) {
  await cacheClient.connect();

  container.register({
    restrictFromProduction: asValue(restrictFromProduction(appConfig.env)),
    port: asValue(appConfig.port),
    logger: asValue(createLogger(process.env, ["accessToken", "refreshToken"])),
    cacheClient: asValue(cacheClient),
    appConfig: asValue(appConfig),
    starWarsApiConfig: asValue(starWarsApiConfig),
    router: asFunction(createRouter).singleton(),
    queryBus: asClass(QueryBus).classic().singleton(),
    commandBus: asClass(CommandBus).classic().singleton(),
    eventDispatcher: asClass(EventDispatcher)
      .classic()
      .singleton()
      .inject(() => ({ throwOnFailure: false })),
  });

  return container;
}
