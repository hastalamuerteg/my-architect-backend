import { StatusCodeEnum } from './types/StatusCodeEnum';

interface IBaseError {
  statusCode: StatusCodeEnum;
  message: string;
  code?: string;
}

class BaseError extends Error {
  public readonly statusCode: StatusCodeEnum;
  public readonly code: string;

  constructor({
    statusCode, message, code,
  }: IBaseError) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    this.statusCode = statusCode;
    this.code = code;
    Error.captureStackTrace(this);
  }
}

export { BaseError };
