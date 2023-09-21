import AuthenticationError from '@pbbg/http/lib/exceptions/authentication';
import { Controller } from '@pbbg/http/lib/types/http';
import type { Context, Next } from 'hono';

export default class AuthenticationGuard extends Controller {
  public async handle(context: Context, next: Next) {
    const auth = context.req.header().authorization;
    const [, token] = auth?.split(' ') ?? [];

    if (!token || token !== process.env.APP_QUERY_SECRET) {
      throw new AuthenticationError('access denied');
    }

    await next();
  }
}
