import { Controller } from '@pbbg/http/lib/types/http';
import type { Context, Next } from 'hono';

// import AuthenticationError from '@pbbg/http/lib/exceptions/authentication';
// import { getCurrentUser } from '@/api/utilities/session';

export default class AuthenticationGuard extends Controller {
  public async handle(_: Context, next: Next) {
    // const user = await getCurrentUser(request, response);

    // if (!user) {
    //   throw new AuthenticationError('access denied');
    // }

    await next();
  }
}
