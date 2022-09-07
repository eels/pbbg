import AuthenticationException from 'App/Exceptions/AuthenticationException';
import type { AuthContract, GuardsListKeys } from '@ioc:Adonis/Addons/Auth';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import type { Next } from 'types/middleware';

export default class AuthMiddleware {
  protected async authenticate(auth: AuthContract, guards: GuardsListKeys[]) {
    for (const guard of guards) {
      if (await auth.use(guard).check()) {
        return true;
      }
    }

    throw new AuthenticationException();
  }

  public async handle(ctx: HttpContextContract, next: Next, guards: GuardsListKeys[]) {
    await this.authenticate(ctx.auth, guards.length ? guards : [ctx.auth.name]);
    await next();
  }
}
