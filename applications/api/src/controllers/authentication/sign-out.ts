import { AUTH_COOKIE_NAME } from '@pbbg/http/config/constants';
import { Controller } from '@pbbg/http/types/http';
import { delCookie } from '@pbbg/http/utilities/cookie';
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
