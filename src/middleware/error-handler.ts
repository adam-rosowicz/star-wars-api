import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { Logger } from "@tshio/logger";
import { AppError } from "../errors/app.error";
import { HttpError } from "../errors/http.error";
import { Translation } from "../shared/translation/translation";

export const errorHandler =
  ({ logger, restrictFromProduction }: { logger: Logger; restrictFromProduction: Function }) =>
  (err: Error, req: Request, res: Response, _next: NextFunction) => {
    logger.error(err.toString());

    if (err instanceof HttpError) {
      return res.status(err.status).json({
        error: new Translation(err.message),
        stack: restrictFromProduction(err.stack),
      });
    }

    if (err instanceof AppError) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: new Translation(err.message),
        stack: restrictFromProduction(err.stack),
      });
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: new Translation("error.unknown"),
      stack: restrictFromProduction(err.stack),
    });
  };
