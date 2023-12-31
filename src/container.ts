import { asFunction, asValue, AwilixContainer, createContainer as createAwilixContainer, InjectionMode } from "awilix";
import http from "http";
import { DataSource } from "typeorm";
import { createApp } from "./app/app";
import { AppConfig, appConfigFactory } from "./config/app";

import { registerCommonDependencies } from "./container/common";
import { loadEnvs } from "./config/env";
import { registerMiddlewares } from "./container/middlewares";
import { registerQueryHandlers } from "./container/query-handlers";
import { registerCommandHandlers } from "./container/command-handlers";
import { registerGraphQLDependencies } from "./container/graphql";
import { registerIntegrations } from "./container/integrations";
import { registerServices } from "./container/services";

loadEnvs();

export interface ContainerDependencies {
  dbDataSource?: DataSource;
  appConfig?: AppConfig;
}

export async function createContainer(dependencies?: ContainerDependencies): Promise<AwilixContainer> {
  const appConfig = dependencies?.appConfig ? dependencies.appConfig : appConfigFactory(process.env);

  const container: AwilixContainer = createAwilixContainer({
    injectionMode: InjectionMode.PROXY,
  });

  await registerCommonDependencies(appConfig, container);
  await registerMiddlewares(container);
  await registerQueryHandlers(container);
  await registerCommandHandlers(container);
  await registerGraphQLDependencies(container);
  await registerIntegrations(container)
  await registerServices(container)

  container.register({
    app: asFunction(createApp).singleton(),
  });

  const { app } = container.cradle;
 
  container.register({
    server: asValue(http.createServer(await app)),
  });

  return container;
}