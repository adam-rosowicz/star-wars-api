import express from "express";

export interface RoutingDependencies {
  filmRouting: express.Router;
  speciesRouting: express.Router;
  vehicleRouting: express.Router;
  starshipRouting: express.Router;
  // ROUTES_INTERFACE
}

export const createRouter = ({
  filmRouting,
  speciesRouting,
  vehicleRouting,
  starshipRouting,
  // ROUTES_DEPENDENCIES
}: RoutingDependencies) => {
  const router = express.Router();

  router.use("/film", filmRouting);
  router.use("/species", speciesRouting);
  router.use("/vehicle", vehicleRouting);
  router.use("/starship", starshipRouting);
  // ROUTES_CONFIG
  return router;
};
