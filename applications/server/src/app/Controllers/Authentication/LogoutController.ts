import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class LogoutController {
  public async handle(ctx: HttpContextContract) {
    ctx.auth.use('api').logout();
    ctx.response.respond('SUCCESS');
  }
}
