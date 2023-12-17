import express from "express";

export interface RoutingDependencies {
  filmRouting: express.Router;
  speciesRouting: express.Router;
  vehicleRouting: express.Router;
  starshipRouting: express.Router;
  planetRouting: express.Router;
  // ROUTES_INTERFACE
}

export const createRouter = ({
  filmRouting,
  speciesRouting,
  vehicleRouting,
  starshipRouting,
  planetRouting,
  // ROUTES_DEPENDENCIES
}: RoutingDependencies) => {
  const router = express.Router();

  router.use("/film", filmRouting);
  router.use("/species", speciesRouting);
  router.use("/vehicle", vehicleRouting);
  router.use("/starship", starshipRouting);
  router.use("/planet", planetRouting);
  // ROUTES_CONFIG
  return router;
};
