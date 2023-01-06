import { Prisma } from '@prisma/client';

import { StatusCodeEnum } from './types/StatusCodeEnum';

interface IDatabasePrismaError {
  message: string;
  statusCode: StatusCodeEnum;
  code: string;
  clientVersion?: string;
  meta?: object;
}

class PrismaDatabaseError extends Prisma.PrismaClientKnownRequestError {
  public readonly statusCode: StatusCodeEnum;

  constructor({
    message, statusCode, code, clientVersion, meta,
  }: IDatabasePrismaError) {
    super(message, code, clientVersion, meta);

    Object.setPrototypeOf(this, new.target.prototype);
    this.message = message;
    this.code = code;
    this.clientVersion = clientVersion;
    this.meta = meta;
    this.statusCode = statusCode;

    Error.captureStackTrace(this);
  }
}

export { PrismaDatabaseError };
