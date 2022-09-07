import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import type { Next } from 'types/middleware';

export default class SilentAuthMiddleware {
  public async handle(ctx: HttpContextContract, next: Next) {
    await ctx.auth.check();
    await next();
  }
}
