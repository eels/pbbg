import AuthenticationError from '@pbbg/http/lib/exceptions/authentication';
import { AUTH_COOKIE_NAME } from '@pbbg/http/lib/config/constants';
import { Controller } from '@pbbg/http/lib/types/http';
import { decodeJWT } from '@/api/utilities/jwt';
import { exceptions } from '@pbbg/http/lib/utilities/response';
import { getCookie } from '@pbbg/http/lib/utilities/cookie';
import { pleaseTryAsync } from '@pbbg/utilities/lib/try';
import type { Context } from 'hono';

export default class Session extends Controller {
  public async handle(context: Context) {
    const cookie = await getCookie(context, AUTH_COOKIE_NAME);
    const [error, session] = await pleaseTryAsync(() => decodeJWT(cookie || ''));

    if (typeof cookie !== 'string' || error) {
      throw new AuthenticationError(exceptions.UNAUTHENTICATED);
    }

    return context.send({
      data: session,
      status: 'SUCCESS',
    });
  }
}
