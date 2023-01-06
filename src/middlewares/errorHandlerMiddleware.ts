import {
  Request, Response, NextFunction,
} from 'express';

import { BaseError } from '@errors/BaseError';
import { PrismaDatabaseError } from '@errors/PrismaDatabaseError';
import { PrismaClientCodeErrorsMessage } from '@errors/types/PrismaClientCodeErrorsMessage';

async function errorHandlerMiddleware(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  if (error instanceof BaseError) {
    return response.status(error.statusCode).json({ message: error.message, code: error.code });
  }

  if (error instanceof PrismaDatabaseError) {
    return response.status(error.statusCode).json({
      code: error.code,
      message: PrismaClientCodeErrorsMessage[error.code],
      meta: error.meta,
    });
  }

  next(error);
  return response.status(500).json({ status: 'Error', message: error.message ?? 'Internal Server Error' });
}

export { errorHandlerMiddleware };
