import AuthenticationError from '@pbbg/http/lib/exceptions/authentication';
import { Controller } from '@pbbg/http/lib/types/http';
import type { NextFunction, Request, Response } from 'express';

export default class AuthenticationGuard extends Controller {
  public async handle(request: Request, __: Response, next: NextFunction) {
    const auth = request.headers.authorization;
    const [, token] = auth?.split(' ') ?? [];

    if (!token || token !== process.env.APP_QUERY_SECRET) {
      throw new AuthenticationError('access denied');
    }

    next();
  }
}
