import AuthenticationError from '@pbbg/http/lib/exceptions/authentication';
import { Controller } from '@pbbg/http/lib/types/http';
import { getCurrentUser } from '@/api/utilities/session';
import type { NextFunction, Request, Response } from 'express';

export default class AuthenticationGuard extends Controller {
  public async handle(request: Request, response: Response, next: NextFunction) {
    const user = await getCurrentUser(request, response);

    if (!user) {
      throw new AuthenticationError('access denied');
    }

    next();
  }
}
