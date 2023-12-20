import express from "express";
import helmet from "helmet";
import cors from "cors";
import Keyv from "keyv";
import responseCachePlugin from "@apollo/server-plugin-response-cache";
import { KeyvAdapter } from "@apollo/utils.keyvadapter";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import http from "http";
import { CommandBus } from "@tshio/command-bus";
import { QueryBus } from "@tshio/query-bus";
import pkg from "body-parser";
import { MiddlewareType } from "../shared/middleware-type/middleware.type";
import { NotFoundError } from "../errors/not-found.error";
import { AppConfig } from "../config/app";

export interface AppDependencies {
  errorHandler: MiddlewareType;
  graphQLSchema: string;
  commandBus: CommandBus;
  queryBus: QueryBus<any>;
  resolvers: any;
  appConfig: AppConfig;
}

async function createApp({ errorHandler, graphQLSchema, commandBus, queryBus, resolvers, appConfig }: AppDependencies) {
  const typeDefs = graphQLSchema;

  const app = express();
  const httpServer = http.createServer(app);
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      responseCachePlugin({ cache: new KeyvAdapter(new Keyv(appConfig.redisUrl)) }),
    ],
  });
  await apolloServer.start();

  const { json } = pkg;

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(apolloServer, {
      context: async () => ({
        commandBus,
        queryBus,
      }),
    }),
  );

  app.use(cors());
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          scriptSrc: ["'self'", "https: 'unsafe-inline'"],
        },
      },
    }),
  );

  app.use(express.json());

  app.use("*", (req, res, next) => next(new NotFoundError("Page not found")));
  app.use(errorHandler);

  return app;
}

export { createApp };
