import AuthenticationException from 'App/Exceptions/AuthenticationException';
import ThrottledException from 'App/Exceptions/ThrottledException';
import { Limiter } from '@adonisjs/limiter/build/services';
import { useTryAsync } from 'no-try';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import type { RuntimeConfig } from '@adonisjs/limiter/build/src/contracts';

export default class LoginController {
  private get throttleConfig(): RuntimeConfig {
    return {
      blockDuration: '30 mins',
      duration: '15 mins',
      requests: 10,
    };
  }

  public async handle(ctx: HttpContextContract) {
    const { email, password } = ctx.request.body();
    const throttleKey = `login_${email}_${ctx.request.ip()}`;
    const limiter = Limiter.use(this.throttleConfig);

    if (await limiter.isBlocked(throttleKey)) {
      throw new ThrottledException();
    }

    const [error] = await useTryAsync(() => {
      return ctx.auth.use('api').attempt(email, password);
    });

    if (error) {
      await limiter.increment(throttleKey);
      throw new AuthenticationException();
    }

    await limiter.delete(throttleKey);
    ctx.response.respond('SUCCESS');
  }
}
