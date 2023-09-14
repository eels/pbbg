import type { Exception } from '@pbbg/http/lib/types/exception';
import type { NextFunction, Request, Response } from 'express';

export default class ErrorHandler {
  public async handle(error: Exception, _: Request, response: Response, __: NextFunction) {
    response.respond({
      code: error.code,
      message: error.message,
      status: 'ERROR',
    });
  }
}
