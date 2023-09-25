import { AUTH_COOKIE_NAME } from '@pbbg/http/lib/config/constants';
import { Controller } from '@pbbg/http/lib/types/http';
import { delCookie } from '@pbbg/http/lib/utilities/cookie';
import type { Context } from 'hono';

export default class SignOut extends Controller {
  public async handle(context: Context) {
    await delCookie(context, AUTH_COOKIE_NAME);

    return context.send({
      data: {},
      status: 'SUCCESS',
    });
  }
}
