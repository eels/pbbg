import ForbiddenError from '@/http/exceptions/forbidden';
import { CSRF_COOKIE_NAME, CSRF_HEADER_NAME } from '@/http/config/constants';
import { Controller } from '@/http/types/http';
import { exceptions } from '@/http/utilities/response';
import { getCookie } from '@/http/utilities/cookie';
import { verifyCSRFToken } from '@/http/utilities/csrf';
import type { Context, Next } from 'hono';

export default class CSRFTokenGuard extends Controller {
  public async handle(context: Context, next: Next) {
    const { API_CSRF_SECRET, NODE_ENV } = process.env;
    const methods = ['CONNECT', 'DELETE', 'PATCH', 'POST', 'PUT', 'TRACE'];
    const method = context.req.method.toUpperCase();

    if (!methods.includes(method) || NODE_ENV !== 'production') {
      return await next();
    }

    if (!API_CSRF_SECRET) {
      throw new Error('csrf secret not configured');
    }

    const header = context.req.header(CSRF_HEADER_NAME);
    const cookie = await getCookie(context, CSRF_COOKIE_NAME);
    const isValidRequest = typeof header === 'string' && typeof cookie === 'string';

    if (!isValidRequest || !(await verifyCSRFToken(header, cookie))) {
      throw new ForbiddenError(exceptions.FORBIDDEN);
    }

    await next();
  }
}
