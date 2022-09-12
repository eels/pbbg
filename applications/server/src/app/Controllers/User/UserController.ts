import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class UserController {
  public async handle(ctx: HttpContextContract) {
    ctx.response.respond('SUCCESS', { data: ctx.auth.user });
  }
}
