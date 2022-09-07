import AuthenticationException from 'App/Exceptions/AuthenticationException';
import type { AuthContract, GuardsListKeys } from '@ioc:Adonis/Addons/Auth';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import type { Next } from 'types/middleware';

export default class AuthMiddleware {
  protected async authenticate(auth: AuthContract, guards: GuardsListKeys[]) {
    for (const guard of guards) {
      if (await auth.use(guard).check()) {
        auth.defaultGuard = guard;

        return true;
      }
    }

    throw new AuthenticationException('unauthorized', 'UNAUTHORISED');
  }

  public async handle(ctx: HttpContextContract, next: Next, customGuards: GuardsListKeys[]) {
    const guards = customGuards.length ? customGuards : [ctx.auth.name];

    await this.authenticate(ctx.auth, guards);
    await next();
  }
}
