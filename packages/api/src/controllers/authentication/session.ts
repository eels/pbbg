import AuthenticationError from '@pbbg/http/exceptions/authentication';
import { AUTH_COOKIE_NAME } from '@pbbg/http/config/constants';
import { Controller } from '@pbbg/http/types/http';
import { decodeJWT } from '@/api/utilities/jwt';
import { exceptions } from '@pbbg/http/utilities/response';
import { getCookie } from '@pbbg/http/utilities/cookie';
import { pleaseTryAsync } from '@pbbg/utilities/try';
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
