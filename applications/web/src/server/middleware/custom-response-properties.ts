import { Controller } from '@/web/types/http';
import { response as responseFactory } from '@/web/server/utilities/response';
import type { NextFunction, Request, Response } from 'express';

export default class CustomResponseProperties extends Controller {
  public async handle(_: Request, response: Response, next: NextFunction) {
    response.respond = responseFactory(response);
    next();
  }
}
