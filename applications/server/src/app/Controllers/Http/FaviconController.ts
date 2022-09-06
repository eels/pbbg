import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class FaviconController {
  public handle(ctx: HttpContextContract) {
    ctx.response.safeStatus(204);
  }
}
