import { AwilixContainer, asValue, asClass } from "awilix";
import { QueryBus } from "@tshio/query-bus";
import { CommandBus } from "@tshio/command-bus";
import { createLogger, restrictFromProduction } from "@tshio/logger";
import { AppConfig } from "../config/app";
import { CustomRedisClient, cacheClient } from "../tools/cache-client";
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
    queryBus: asClass(QueryBus).classic().singleton(),
    commandBus: asClass(CommandBus).classic().singleton(),
    redisClient: asClass(CustomRedisClient),
  });

  return container;
}
