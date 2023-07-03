import { Controller } from '@pbbg/http/lib/types/http';
import type { NextFunction, Request, Response } from 'express';

export default class AuthenticationGuard extends Controller {
  public async handle(_: Request, __: Response, next: NextFunction) {
    next();
  }
}
