import express from "express";

export interface RoutingDependencies {
  filmRouting: express.Router;
  // ROUTES_INTERFACE
}

export const createRouter = ({
  filmRouting,
  // ROUTES_DEPENDENCIES
}: RoutingDependencies) => {
  const router = express.Router();

  router.use("/film", filmRouting);
  // ROUTES_CONFIG
  return router;
};
