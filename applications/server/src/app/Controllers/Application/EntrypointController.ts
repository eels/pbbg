import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class EntrypointController {
  public handle(ctx: HttpContextContract) {
    ctx.response.respond('SUCCESS');
  }
}
