import ForbiddenError from '@/http/exceptions/forbidden';
import { CSRF_COOKIE_NAME } from '@/http/config/constants';
import { Controller } from '@/http/types/http';
import { createCSRFToken, extractCSRFPartsFromCookie } from '@/http/utilities/csrf';
import { exceptions } from '@/http/utilities/response';
import { getCookie, setSessionCookie } from '@/http/utilities/cookie';
import type { Context } from 'hono';

export default class CSRFHandler extends Controller {
  public static handle() {
    return {
      csrf: async (context: Context) => {
        const cookie = await getCookie(context, CSRF_COOKIE_NAME);

        if (typeof cookie !== 'string') {
          throw new ForbiddenError(exceptions.FORBIDDEN);
        }

        const [token] = extractCSRFPartsFromCookie(cookie);

        return context.text(token);
      },
      init: async (context: Context) => {
        await setSessionCookie(context, CSRF_COOKIE_NAME, (await createCSRFToken()).cookie);

        return context.send({
          data: {},
          status: 'SUCCESS',
        });
      },
    };
  }
}
