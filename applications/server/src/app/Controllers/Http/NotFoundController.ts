import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class NotFoundController {
  public handle(ctx: HttpContextContract) {
    ctx.response.send({ hello: 'error' });
    ctx.response.safeStatus(404);
  }
}
