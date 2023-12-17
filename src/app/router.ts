import express from "express";

export interface RoutingDependencies {
  filmRouting: express.Router;
  speciesRouting: express.Router;
  // ROUTES_INTERFACE
}

export const createRouter = ({
  filmRouting,
  speciesRouting,
  // ROUTES_DEPENDENCIES
}: RoutingDependencies) => {
  const router = express.Router();

  router.use("/film", filmRouting);
  router.use("/species", speciesRouting);
  // ROUTES_CONFIG
  return router;
};
