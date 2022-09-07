import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class NotAllowedController {
  public handle(ctx: HttpContextContract) {
    ctx.response.respond('ERROR', { message: 'method not allowed' });
  }
}
