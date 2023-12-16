import express from "express";

export interface RoutingDependencies {
  usersRouting: express.Router;
  filmRouting: express.Router;
  // ROUTES_INTERFACE
}

export const createRouter = ({
  usersRouting,
  filmRouting,
  // ROUTES_DEPENDENCIES
}: RoutingDependencies) => {
  const router = express.Router();

  router.use("/example", usersRouting);
  router.use("/film", filmRouting);
  // ROUTES_CONFIG
  return router;
};
