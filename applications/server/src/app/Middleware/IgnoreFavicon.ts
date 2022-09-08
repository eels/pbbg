import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import type { Next } from 'types/middleware';

export default class IgnoreFaviconMiddleware {
  public async handle(ctx: HttpContextContract, next: Next) {
    if (ctx.request.url() === '/favicon.ico') {
      ctx.response.safeStatus(204);
    } else {
      await next();
    }
  }
}
