import { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";
import { MAX_ALLOWED_ALARMS_PER_USER } from "../settings";

export class ErrorResponse extends Error {
  statusCode: number;

  constructor(error: { message: string; statusCode: number }) {
    super(error.message);
    this.statusCode = error.statusCode;
    Error.captureStackTrace(this);
  }
}

export const errorMessages = {
  USER_NOT_FOUND: {
    message: "The requested user could not be found!",
    statusCode: 404,
  },
  MISSING_PARAMETER: {
    message: "The expected parameter for the requested data source is missing!",
    statusCode: 400,
  },
  ALREADY_EXIST: {
    message: "The requested data source already exist!",
    statusCode: 400,
  },
  MISSING_CREDENTIALS: {
    message:
      "The expected credentials for the requested data source is missing!",
    statusCode: 400,
  },
  AUTHENTICATION_FAILED: {
    message: "The authentication for the requested data source failed!",
    statusCode: 401,
  },
  CLIENT_ALREADY_EXISTS: {
    message: "The requested client already exists!",
    statusCode: 400,
  },
  UNAUTHORIZED: {
    message: "The requested data source is unauthorized!",
    statusCode: 401,
  },
  INVALID_CREDENTIALS: {
    message: "The provided credentials are invalid.",
    statusCode: 401,
  },
  INVALID_TOKEN: {
    message: "The provided token is invalid.",
    statusCode: 401,
  },
  INVALID_REQUEST: { message: "The request is invalid.", statusCode: 400 },
  INVALID_DATA: { message: "The provided data is invalid.", statusCode: 400 },
  INVALID_OPERATION: {
    message: "The operation is invalid.",
    statusCode: 400,
  },
  DATABASE_FAILED: {
    message: "The database operation is failed.",
    statusCode: 500,
  },
  STORE_NOT_FOUND: {
    message: "The requested store could not be found!",
    statusCode: 404,
  },
  MENU_NOT_FOUND: {
    message: "The requested menu could not be found!",
    statusCode: 404,
  },
  CATEGORY_NOT_FOUND: {
    message: "The requested category could not be found!",
    statusCode: 404,
  },
  ALARM_NOT_ADDED: {
    message: "The requested alarm could not be added!",
    statusCode: 400,
  },
  USER_NOT_CREATED: {
    message: "The requested user could not be created!",
    statusCode: 400,
  },
  ALARM_NOT_FOUND: {
    message: "The requested alarm could not be found!",
    statusCode: 404,
  },
  USERS_NOT_FOUND: {
    message: "The requested users could not be found!",
    statusCode: 404,
  },
  ALARM_LIMIT_EXCEEDED: {
    message: `The alarm limit is exceeded! You can only add ${MAX_ALLOWED_ALARMS_PER_USER} alarms.`,
    statusCode: 400,
  },
};

export function errorHandler(
  err: ErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(err.statusCode || 500);
  res.json({ message: err.message, statusCode: err.statusCode });
}
